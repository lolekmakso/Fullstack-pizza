import { Prisma } from '@prisma/client';
import { categories, _ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  price,
  pizzaType,
  size,
}: {
    productId: number;
    price: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price,
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User Test',
        email: 'user@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin Admin',
        email: 'admin@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепероні Фреш',
      imageUrl:
        '/assets/pizzas/pizza-1.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сирна',
      imageUrl:
        '/assets/pizzas/pizza-2.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чорізо Фреш',
      imageUrl:
        '/assets/pizzas/pizza-3.webp',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Карбонара',
      imageUrl:
        '/assets/pizzas/pizza-4.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Жульєн',
      imageUrl:
        '/assets/pizzas/pizza-5.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: 'Песто',
      imageUrl:
        '/assets/pizzas/pizza-6.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: 'Гавайська',
      imageUrl:
        '/assets/pizzas/pizza-7.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: 'Маргарита',
      imageUrl:
        '/assets/pizzas/pizza-8.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: 'Чотири сезони',
      imageUrl:
        '/assets/pizzas/pizza-9.avif',
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Піца "Пепероні Фреш"
      generateProductItem({ productId: pizza1.id, price: 219, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, price: 269, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, price: 329, pizzaType: 2, size: 40 }),

      // Піца "Сирна"
      generateProductItem({ productId: pizza2.id, price: 199, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, price: 249, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, price: 299, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, price: 219, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, price: 269, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, price: 319, pizzaType: 2, size: 40 }),

      // Піца "Чорізо Фреш"
      generateProductItem({ productId: pizza3.id, price: 249, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, price: 299, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, price: 349, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza4.id, price: 229, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza4.id, price: 279, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza4.id, price: 329, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza5.id, price: 219, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza5.id, price: 269, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza5.id, price: 319, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza6.id, price: 199, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza6.id, price: 249, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza6.id, price: 299, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza6.id, price: 219, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza6.id, price: 269, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, price: 319, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza7.id, price: 289, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, price: 329, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, price: 369, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza8.id, price: 299, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza8.id, price: 339, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, price: 379, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza9.id, price: 199, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza9.id, price: 249, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza9.id, price: 299, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza9.id, price: 219, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza9.id, price: 269, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, price: 319, pizzaType: 2, size: 40 }),

      // Інші продукти
      generateProductItem({ productId: 1, price: 89 }),
      generateProductItem({ productId: 2, price: 129 }),
      generateProductItem({ productId: 3, price: 129 }),
      generateProductItem({ productId: 4, price: 299 }),
      generateProductItem({ productId: 5, price: 159 }),
      generateProductItem({ productId: 6, price: 159 }),
      generateProductItem({ productId: 7, price: 109 }),
      generateProductItem({ productId: 8, price: 139 }),
      generateProductItem({ productId: 9, price: 89 }),
      generateProductItem({ productId: 10, price: 89 }),
      generateProductItem({ productId: 11, price: 89 }),
      generateProductItem({ productId: 12, price: 99 }),
      generateProductItem({ productId: 13, price: 79 }),
      generateProductItem({ productId: 14, price: 79 }),
      generateProductItem({ productId: 15, price: 109 }),
      generateProductItem({ productId: 16, price: 89 }),
      generateProductItem({ productId: 17, price: 99 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
