import os
import uuid
import base64
import boto3
import json
from decimal import Decimal

s3 = boto3.client('s3', region_name='ap-south-1')
rekognition = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')
BUCKET_NAME = "nivaran-animal-image"
TABLE_NAME = "nivaran-cases-table"

def lambda_handler(event, context):
    try:
        body = event.get('body')
        if event.get('isBase64Encoded'):
            body = base64.b64decode(body).decode('utf-8')
        data = json.loads(body)
        image_data = base64.b64decode(data['image_base64'])
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        case_id = str(uuid.uuid4())

        # Upload image to S3
        s3_key = f"{case_id}.jpg"
        s3.put_object(Bucket=BUCKET_NAME, Key=s3_key, Body=image_data, ContentType='image/jpeg')

        # Analyze image with Rekognition
        rekog_resp = rekognition.detect_labels(
            Image={'S3Object': {'Bucket': BUCKET_NAME, 'Name': s3_key}},
            MaxLabels=10,
            MinConfidence=80
        )

        # Filter for animals only
        labels = [label['Name'] for label in rekog_resp['Labels']]
        animal_labels = [l for l in labels if l.lower() in ['cat', 'dog', 'cow', 'animal', 'mammal', 'bird']]

        if not animal_labels:
            status = 'invalid_image'
            message = 'No animal detected. Please upload a valid animal image.'
        else:
            status = 'pending_review'
            message = 'Animal detected.'

        # Save to DynamoDB
        table = dynamodb.Table(TABLE_NAME)
        item = {
            'case_id': case_id,
            's3_key': s3_key,
            'labels': labels,
            'status': status,
            'message': message
        }
        # Add location if provided
        if latitude is not None and longitude is not None:
            item['latitude'] = Decimal(str(latitude))
            item['longitude'] = Decimal(str(longitude))

        table.put_item(Item=item)

        return {
            'statusCode': 200,
            'body': json.dumps({
                'case_id': case_id,
                'status': status,
                'message': message,
                'labels': labels,
                'latitude':latitude,
                'longitude':longitude
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }