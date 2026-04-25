"use client";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { Field } from "../ui/field";
import { useRouter } from "next/navigation";
import { getProducts } from "@/actions/product.action";
import { useTransition } from "react";
import Spinner from "../shared/Loading/Spinner";

interface SearchFormValues {
  keyword: string;
}

export default function NavSerachInput({ aside }: { aside?: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm<SearchFormValues>({
    defaultValues: {
      keyword: "",
    },
  });

  function onSubmit({ keyword }: SearchFormValues) {
    startTransition(async () => {
      if (!keyword) return;
      const response = await getProducts({ keyword });
      if (response) {
        router.push(`/search?keyword=${keyword}`);
      }
    });
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={aside ? "flex-1 mx-3" : `hidden lg:flex flex-1 max-w-2xl`}
    >
      <div className="relative w-full">
        <Controller
          name="keyword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full ">
              <Input
                id={field.name}
                aria-invalid={fieldState.invalid}
                {...field}
                placeholder="Search for products, brands and more..."
                className={
                  aside
                    ? "w-full px-4 h-11 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-sm"
                    : `w-full px-5 h-11 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all text-sm`
                }
              />
            </Field>
          )}
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? <Spinner className="size-5" /> : <IoSearchOutline />}
        </button>
      </div>
    </form>
  );
}
