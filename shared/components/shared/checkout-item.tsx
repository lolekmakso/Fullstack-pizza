"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-4 sm:gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
        <CartItemDetails.Price value={price} />
        <div className="flex items-center gap-3">
          <CartItemDetails.CountButton
            onClick={onClickCountButton}
            value={quantity}
          />
          <button type="button" onClick={onClickRemove}>
            <X
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
