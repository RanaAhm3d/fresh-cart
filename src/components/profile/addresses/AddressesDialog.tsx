"use client";
import { addUserAddress, updateUserAddress } from "@/actions/address.action";
import Spinner from "@/components/shared/Loading/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import notify from "@/hooks/useNotification";
import { Address } from "@/interfaces/addresses.interface";
import {
  AddressesPayloadType,
  addressesSchema,
  defaultValues,
} from "@/schema/Addresses.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export default function AddressesDialog({
  text,
  address,
}: {
  text: React.ReactNode;
  address?: Address;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<AddressesPayloadType>({
    defaultValues,
    resolver: zodResolver(addressesSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (address) {
      reset({
        name: address.name,
        details: address.details,
        phone: address.phone,
        city: address.city,
      });
    } else {
      reset(defaultValues);
    }
  }, [address, reset]);

  function onSubmit(formValues: AddressesPayloadType) {
    startTransition(async () => {
      if (address) {
        const response = await updateUserAddress(address._id, formValues);
        if (response.status === "success") {
          notify(response.message, "success");
          reset();
          setOpen(false);
          router.refresh();
        } else {
          notify(response.message || "Failed to update address", "error");
        }
      } else {
        const response = await addUserAddress(formValues);
        if (response.status === "success") {
          notify("Address added successfully!", "success");
          reset();
          setOpen(false);
          router.refresh();
        } else {
          notify(response.message || "Failed to add address", "error");
        }
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{text}</DialogTrigger>
      <DialogContent
        style={{ width: "100%", maxWidth: "448px" }}
        className="p-6"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {address ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            {/*Address Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <FieldLabel htmlFor={field.name}>Address Name</FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="e.g. Home,Office"
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="details"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <FieldLabel htmlFor={field.name}>Full Address</FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Street, building, apartment..."
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full ">
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full ">
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      placeholder="Cairo"
                      className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
          <div className="flex items-center gap-3 pt-4">
            <DialogClose
              asChild
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
            >
              <Button type="button" variant={"ghost"} className="h-12">
                Cancel
              </Button>
            </DialogClose>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-3 px-6 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-5 text-white" />
                  {address ? "Updating..." : "Adding..."}
                </div>
              ) : address ? (
                "Update Address"
              ) : (
                "Add Address"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
