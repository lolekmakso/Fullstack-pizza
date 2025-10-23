'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components';
import { VerificationUserTemplate } from '@/shared/components/shared/email-temapltes/verification-user';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Токен кошика не знайдено');
    }

    /* Знаходимо корзину за токеном */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Якщо корзина не знайдена — помилка */
    if (!userCart) {
      throw new Error('Кошик не знайдено');
    }

    /* Якщо корзина пуста — помилка */
    if (userCart?.totalAmount === 0) {
      throw new Error('Кошик порожній');
    }

    /* Створюємо замовлення */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаємо корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата замовлення #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Дані для оплати не знайдено');
    }

    // Зберігаємо дані платежу, якщо потрібно
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentId: order.id.toString(), // LiqPay не повертає id, записуємо власний order.id
      },
    });

    // Формуємо URL для оплати
    const paymentUrl = `https://www.liqpay.ua/api/3/checkout?data=${encodeURIComponent(
      paymentData.data
    )}&signature=${paymentData.signature}`;

    await sendEmail(
      data.email,
      `Master Pizza / Оплатіть замовлення #${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentUrl,
      }),
    );

    return paymentUrl;

  } catch (err) {
    console.log('[CreateOrder] Server error', err);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Користувача не знайдено');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Пошта не підтверджена');
      }

      throw new Error('Користувач вже існує');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Master Pizza / 📝 Підтвердження реєстрації',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
