import boto3
import math
import os
import json
from decimal import Decimal


dynamodb = boto3.resource('dynamodb')
CASES_TABLE = "nivaran-cases-table"
NGOS_TABLE = "ngos-table"

def haversine(lat1, lon1, lat2, lon2):
    # Haversine distance in km
    R = 6371
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return 2*R*math.asin(math.sqrt(a))

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # If it's an integer, cast as int
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)
        return super(DecimalEncoder, self).default(obj)
    

def lambda_handler(event, context):
    # Get ngo_id from query params
    ngo_id = event.get("queryStringParameters", {}).get("ngo_id")
    if not ngo_id:
        return {"statusCode": 400, "body": "ngo_id required as query param"}

    ngos_table = dynamodb.Table(NGOS_TABLE)
    ngo = ngos_table.get_item(Key={"ngo_id": ngo_id}).get("Item")
    if not ngo:
        return {"statusCode": 404, "body": "NGO not found"}

    ngo_lat, ngo_lon, radius = ngo["latitude"], ngo["longitude"], ngo["service_radius_km"]

    cases_table = dynamodb.Table(CASES_TABLE)
    cases = cases_table.scan().get("Items", [])

    nearby_cases = []
    for case in cases:
        if not ("latitude" in case and "longitude" in case):
            continue
        dist = haversine(ngo_lat, ngo_lon, case["latitude"], case["longitude"])
        if dist <= radius:
            nearby_cases.append(case)

    return {
    "statusCode": 200,
    "body": json.dumps(nearby_cases, cls=DecimalEncoder)
}