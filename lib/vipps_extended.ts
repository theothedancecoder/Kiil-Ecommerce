import fetch from 'node-fetch';

const VIPPS_API_BASE_URL = 'https://apitest.vipps.no'; // Vipps test environment base URL

interface VippsAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

class VippsClientExtended {
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

  private getCommonHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Ocp-Apim-Subscription-Key': this.subscriptionKeyPrimary,
      'Content-Type': 'application/json',
      'Merchant-Serial-Number': process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '',
      'Vipps-System-Name': 'kiil-ecommerce',
      'Vipps-System-Version': '1.0.0',
      'Vipps-System-Plugin-Name': 'kiil-ecommerce-plugin',
      'Vipps-System-Plugin-Version': '1.0.0',
    };
  }

  public async initiatePayment(paymentRequest: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.authenticate();

    const paymentUrl = `${VIPPS_API_BASE_URL}/ecomm/v2/payments`;

    const response = await fetch(paymentUrl, {
      method: 'POST',
      headers: this.getCommonHeaders(),
      body: JSON.stringify(paymentRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps payment initiation failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  // Checkout API v3 - Initiate session
  public async initiateCheckoutSession(sessionRequest: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.authenticate();

    const url = `${VIPPS_API_BASE_URL}/checkout/v3/session`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getCommonHeaders(),
      body: JSON.stringify(sessionRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps initiate checkout session failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  // Checkout API v3 - Get session details by reference
  public async getCheckoutSession(reference: string): Promise<Record<string, unknown>> {
    await this.authenticate();

    const url = `${VIPPS_API_BASE_URL}/checkout/v3/session/${encodeURIComponent(reference)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getCommonHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps get checkout session failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  // ePayment API v1 - Get payment details
  public async getPaymentDetails(reference: string): Promise<Record<string, unknown>> {
    await this.authenticate();

    const url = `${VIPPS_API_BASE_URL}/epayment/v1/${encodeURIComponent(reference)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getCommonHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps get payment details failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  // ePayment API v1 - Cancel payment
  public async cancelPayment(reference: string): Promise<Record<string, unknown>> {
    await this.authenticate();

    const url = `${VIPPS_API_BASE_URL}/epayment/v1/${encodeURIComponent(reference)}cancel`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getCommonHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps cancel payment failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  // ePayment API v1 - Capture payment (full or partial)
  public async capturePayment(reference: string, captureRequest: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.authenticate();

    const url = `${VIPPS_API_BASE_URL}/epayment/v1/${encodeURIComponent(reference)}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getCommonHeaders(),
      body: JSON.stringify(captureRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps capture payment failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }

  // ePayment API v1 - Refund payment (full or partial)
  public async refundPayment(reference: string, refundRequest: Record<string, unknown>): Promise<Record<string, unknown>> {
    await this.authenticate();

    const url = `${VIPPS_API_BASE_URL}/epayment/v1/${encodeURIComponent(reference)}refund`;

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getCommonHeaders(),
      body: JSON.stringify(refundRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vipps refund payment failed: ${response.status} ${errorText}`);
    }

    return await response.json();
  }
}

export default VippsClientExtended;
