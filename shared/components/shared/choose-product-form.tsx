import { cn } from "@/shared/lib/utils";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма вибору ПРОДУКТУ
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading,
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10"
      )}
    >
      {/* Картинка сверху на мобильных */}
      <div className="w-full flex justify-center lg:flex-1 order-1 lg:order-1">
        <img
          src={imageUrl}
          alt={name}
          className="transition-all z-10 duration-300 w-full max-w-[350px] h-auto lg:h-[350px] object-contain"
        />
      </div>

      {/* Блок с информацией */}
      <div className="w-full lg:w-[490px] bg-[#f7f6f5] p-5 sm:p-7 flex-shrink-0 order-2 lg:order-2">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-2 sm:mb-1 text-center lg:text-left"
        />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-6 sm:px-10 text-base rounded-[18px] w-full mt-6 sm:mt-10"
        >
          Додати до кошика за {price} ₴
        </Button>
      </div>
    </div>
  );
};
