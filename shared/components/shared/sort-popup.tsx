"use client";

import React, { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

const SORT_OPTIONS = [
  { label: "Спочатку популярні", value: "popular" },
  { label: "Спочатку недорогі", value: "cheap" },
  { label: "Спочатку дорогі", value: "expensive" },
];

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);

  const handleSelect = (option: (typeof SORT_OPTIONS)[0]) => {
    setSelected(option);
    // здесь можно вызвать callback для сортировки списка
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
            className
          )}
        >
          <ArrowUpDown className="w-4 h-4" />
          <b>Сортування: </b>
          <b className="text-primary"> {selected.label}</b>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[240px]">
        <ul>
          {SORT_OPTIONS.map((option) => (
            <li
              key={option.value}
              className={cn(
                "hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md",
                selected.value === option.value && "bg-primary/10"
              )}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
