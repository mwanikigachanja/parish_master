import requests
import json
from django.conf import settings

MPESA_API_URL = "https://sandbox.safaricom.co.ke/mpesa/..."  # update with actual URL
CONSUMER_KEY = settings.MPESA_CONSUMER_KEY
CONSUMER_SECRET = settings.MPESA_CONSUMER_SECRET

def get_mpesa_access_token():
    response = requests.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", 
        auth=(CONSUMER_KEY, CONSUMER_SECRET)
    )
    return response.json().get('access_token')

def initiate_payment(amount, phone_number, account_reference, transaction_desc):
    access_token = get_mpesa_access_token()
    headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": settings.MPESA_PASSWORD,  # Typically a base64 encoded value
        "Timestamp": "20250205120000",  # In production, dynamically generate
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": settings.MPESA_CALLBACK_URL,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc,
    }
    response = requests.post(MPESA_API_URL, headers=headers, data=json.dumps(payload))
    return response.json()
