import crypto from "crypto";
import axios from "axios";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

/**
 * Створює оплату через LiqPay
 * Повертає { data, signature } для форми оплати
 */
export async function createPayment(details: Props) {
  const public_key = process.env.LIQPAY_PUBLIC_KEY!;
  const private_key = process.env.LIQPAY_PRIVATE_KEY!;

  // формуємо об’єкт для LiqPay API
  const order = {
    version: 3,
    public_key,
    action: "pay",
    amount: details.amount,
    currency: "UAH",
    description: details.description,
    order_id: details.orderId.toString(),
    result_url: process.env.LIQPAY_RETURN_URL || "http://localhost:3000/",
    server_url: process.env.LIQPAY_CALLBACK_URL || "http://localhost:3000/?paid",
  };

  // base64 кодуємо дані
  const data = Buffer.from(JSON.stringify(order)).toString("base64");

  // створюємо підпис
  const signature = crypto
    .createHash("sha1")
    .update(private_key + data + private_key)
    .digest("base64");

  // можна за бажанням перевірити з’єднання з API (необов’язково)
  // await axios.post('https://www.liqpay.ua/api/request', { data, signature });

  return { data, signature };
}
