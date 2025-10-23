"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex flex-col md:flex-row md:items-center md:justify-between py-4 md:py-8 gap-4">
        {/* Ліва Частина */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={35} height={35} />
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl uppercase font-black">
                  Майстер Піца
                </h1>
                <p className="text-xs text-gray-400 leading-3">
                  Смак, що надихає
                </p>
              </div>
            </div>
          </Link>

          {/* Правая часть — для мобилки показываем справа от лого */}
          <div className="flex items-center gap-2 md:hidden">
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div>
        </div>

        {/* Поиск — под логотипом на мобиле */}
        {hasSearch && (
          <div className="w-full md:flex-1 md:mx-10 order-3 md:order-none">
            <SearchInput />
          </div>
        )}

        {/* Права Частина (для десктопа) */}
        <div className="hidden md:flex items-center gap-3">
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
