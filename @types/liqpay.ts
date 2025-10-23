export interface LiqPayOrder {
  version: number;
  public_key: string;
  action: "pay";
  amount: number | string;
  currency: "UAH";
  description: string;
  order_id: string;
  result_url: string;
  server_url: string;
}

export interface LiqPayPaymentResponse {
  data: string;       // base64 JSON данных
  signature: string;  // подпись SHA1
}
