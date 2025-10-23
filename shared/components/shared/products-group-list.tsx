"use client";

import React from "react";
import { useIntersection } from "react-use";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div
        className={cn(
          "grid gap-[50px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
          listClassName
        )}
      >
        {items.map((product) => {
          const firstItem = product.items?.[0];
          if (!firstItem) return null;

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={firstItem.price}
              ingredients={product.ingredients}
            />
          );
        })}
      </div>
    </div>
  );
};
