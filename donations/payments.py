# donations/mpesa.py
import requests
import json

MPESA_API_URL = "https://sandbox.safaricom.co.ke/mpesa/..."
CONSUMER_KEY = "your_consumer_key"
CONSUMER_SECRET = "your_consumer_secret"
# Use environment variables in production

def get_mpesa_access_token():
    response = requests.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", 
                            auth=(CONSUMER_KEY, CONSUMER_SECRET))
    access_token = response.json()['access_token']
    return access_token

def initiate_payment(amount, phone_number, account_reference, transaction_desc):
    access_token = get_mpesa_access_token()
    headers = {"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}
    payload = {
        # MPESA-specific payload fields go here (e.g., BusinessShortCode, Password, Timestamp, TransactionType, etc.)
        "Amount": amount,
        "PhoneNumber": phone_number,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc,
        # etc.
    }
    response = requests.post(MPESA_API_URL, headers=headers, data=json.dumps(payload))
    return response.json()
