import fetch from 'node-fetch';

const VIPPS_API_BASE_URL = 'https://apitest.vipps.no'; // Vipps test environment base URL

interface VippsAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

class VippsClient {
  private clientId: string;
  private clientSecret: string;
  private subscriptionKeyPrimary: string;
  private subscriptionKeySecondary: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(clientId: string, clientSecret: string, subscriptionKeyPrimary: string, subscriptionKeySecondary: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.subscriptionKeyPrimary = subscriptionKeyPrimary;
    this.subscriptionKeySecondary = subscriptionKeySecondary;
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      // Token still valid
      return;
    }

    const authUrl = `${VIPPS_API_BASE_URL}/access-management-1.0/access/oauth2/token`;
    const body = new URLSearchParams();
    body.append('client_id', this.clientId);
    body.append('client_secret', this.clientSecret);
    body.append('grant_type', 'client_credentials');
    body.append('scope', 'payment:read payment:write');

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': this.subscriptionKeyPrimary,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '',
        'Vipps-System-Name': 'kiil-ecommerce',
        'Vipps-System-Version': '1.0.0',
        'Vipps-System-Plugin-Name': 'kiil-ecommerce-plugin',
        'Vipps-System-Plugin-Version': '1.0.0',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Vipps authentication failed: ${response.statusText}`);
    }

    const data: VippsAuthResponse = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000; // Refresh 1 min before expiry
  }

  public async initiatePayment(paymentRequest: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.authenticate();

    const paymentUrl = `${VIPPS_API_BASE_URL}/ecomm/v2/payments`;

    const response = await fetch(paymentUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Ocp-Apim-Subscription-Key': this.subscriptionKeyPrimary,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps payment initiation failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }
}

export default VippsClient;
