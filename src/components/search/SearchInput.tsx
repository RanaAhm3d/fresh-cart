"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";

type FormValues = { search: string };

export default function SearchInput() {
  const router = useRouter();
  const { control, watch } = useForm<FormValues>({
    defaultValues: {},
  });
  const search = watch("search");

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) params.set("keyword", value);
    else params.delete("keyword");

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/search");
  };

  return (
    <>
      <form className="max-w-2xl">
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <Field className="w-full">
              <div className="relative">
                <Input
                  {...field}
                  type="search"
                  placeholder="Search for products..."
                  onChange={(e) => {
                    field.onChange(e);
                    handleSearch(e.target.value);
                  }}
                  className="pl-12 pr-4 py-3 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                />
                <IoSearch className="absolute size-5 left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </Field>
          )}
        />
      </form>

      {search && (
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for &quot;{search}&quot;
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            We found products for you
          </p>
        </div>
      )}
    </>
  );
}
