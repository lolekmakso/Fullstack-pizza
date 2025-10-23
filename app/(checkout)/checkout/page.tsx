"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { useCart } from "@/shared/hooks/use-cart";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  // Перенаправление если корзина пуста
  React.useEffect(() => {
    if (!loading && items.length === 0) {
      router.push("/");
      toast.error("Ваш кошик порожній", { icon: "🛒" });
    }
  }, [items, loading, router]);

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success("Замовлення успішно оформлено! 📝 Перехід до оплати...", {
        icon: "✅",
      });
      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не вдалося створити замовлення", {
        icon: "❌",
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <Container className="mt-10">
      <Title
        text="Оформлення замовлення"
        className="font-extrabold mb-8 text-[36px] text-center sm:text-left"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-6 lg:gap-10 flex-1">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>
            {/* Правая часть */}
            <div className="w-full lg:w-[450px] flex-shrink-0">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
