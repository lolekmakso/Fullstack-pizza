"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { Input, Textarea } from "../../ui";
import { AddressInput } from "../address-input";
import { FormInput, FormTextarea } from "../form";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адреса доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Введіть адресу..."
        />

        {/* <AddressInput /> */}

        <FormTextarea
          className="text-base"
          placeholder="Коментар до замовлення"
          rows={5}
          name="comment"
        />
      </div>
    </WhiteBlock>
  );
};
