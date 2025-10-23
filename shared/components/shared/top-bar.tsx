import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-2 shadow-lg shadow-black/5 z-10 sm:py-5",
        className
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Категории со скроллом */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <Categories items={categories} />
        </div>

        {/* Сортировка — видна только на больших экранах */}
        <div className="hidden md:block">
          <SortPopup />
        </div>
      </Container>
    </div>
  );
};
