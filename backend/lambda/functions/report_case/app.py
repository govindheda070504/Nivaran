import os
import uuid
import base64
import boto3
import json

s3 = boto3.client('s3')
rekognition = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')
BUCKET_NAME ="nivaran-animal-images2"
TABLE_NAME = "NivaranCases"

def lambda_handler(event, context):
    try:
        body = event.get('body')
        if event.get('isBase64Encoded'):
            body = base64.b64decode(body).decode('utf-8')
        data = json.loads(body)
        image_data = base64.b64decode(data['image_base64'])
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
        animal_labels = [l for l in labels if l.lower() in ['cat', 'dog', 'animal', 'mammal', 'bird']]  # Expand for your use case

        if not animal_labels:
            status = 'invalid_image'
            message = 'No animal detected. Please upload a valid animal image.'
        else:
            status = 'pending_review'
            message = 'Animal detected.'
            # Optionally, check for "injury" or "wound" labels, or use custom model for injury detection.

        # Save to DynamoDB
        table = dynamodb.Table(TABLE_NAME)
        table.put_item(Item={
            'case_id': case_id,
            's3_key': s3_key,
            'labels': labels,
            'status': status,
            'message': message
        })

        return {
            'statusCode': 200,
            'body': json.dumps({
                'case_id': case_id,
                'status': status,
                'message': message,
                'labels': labels
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }