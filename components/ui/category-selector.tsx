"use client";

import { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "./button";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "./command";
import { cn } from "@/lib/utils"; // Ensure you import your cn utility

interface CategorySelectorProps {
  categories: ALL_CATEGORIES_QUERYResult;
}

export function CategorySelectorComponent({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  // Reset value when navigating back to home
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === "/") {
        setValue("");
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded"
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white rounded shadow-md border z-50" sideOffset={4}>
        <Command>
          <div className="flex items-center space-x-2 px-2 py-1">
            <CommandInput
              placeholder="Search..."
              className="h-7 text-sm px-2 flex-grow"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const selectedCategory = categories.find((c) =>
                    c.title
                      ?.toLowerCase()
                      .includes(e.currentTarget.value.toLowerCase())
                  );
                  if (selectedCategory?.slug?.current) {
                    setValue(selectedCategory._id);
                    router.push(`/categories/${selectedCategory.slug.current}`);
                    setOpen(false);
                  }
                }
              }}
            />
            <div className="flex flex-col items-center text-xs text-muted-foreground cursor-pointer select-none ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18" />
              </svg>
              <span>Stores</span>
            </div>
          </div>
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title || ""}
                  onSelect={() => {
                    const newValue = value === category._id ? "" : category._id;
                    setValue(newValue);
                    if (category.slug?.current) {
                      router.push(`/categories/${category.slug.current}`);
                    }
                    setOpen(false);
                  }}
                  className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                >
                  <span className="flex-1">{category.title}</span>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
