import crypto from "crypto";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-temapltes/order-success";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data, signature } = await req.json();

    // Перевіряємо підпис від LiqPay
    const expectedSignature = crypto
      .createHash("sha1")
      .update(process.env.LIQPAY_PRIVATE_KEY + data + process.env.LIQPAY_PRIVATE_KEY)
      .digest("base64");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Неправильний підпис" }, { status: 400 });
    }

    // Розшифровуємо дані
    const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf8"));

    const orderId = Number(decodedData.order_id);
    const status = decodedData.status; // success, failure, sandbox, etc.

    const order = await prisma.order.findFirst({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Замовлення не знайдено" }, { status: 404 });
    }

    // Оновлюємо статус замовлення
    const isSucceeded = status === "success" || status === "sandbox";

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    // Відправляємо лист при успішній оплаті
    if (isSucceeded) {
      const items = JSON.parse(order.items as string) as CartItemDTO[];

      await sendEmail(
        order.email,
        `Майстер Піца / Ваше замовлення #${order.id} успішно оплачено 🎉`,
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[LiqPay Callback Error]", error);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
