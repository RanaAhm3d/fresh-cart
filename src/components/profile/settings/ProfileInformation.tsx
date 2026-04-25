"use client";
import { RiUserFill } from "react-icons/ri";
import { FaFloppyDisk } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  UserInfoPayloadType,
  userInfoSchema,
  defaultValues,
} from "@/schema/userInfo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { UpdateUserInformation } from "@/services/user.service";
import Spinner from "@/components/shared/Loading/Spinner";
import { UserResponse } from "@/interfaces/user.interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileInformation({ user }: { user: UserResponse }) {
  const [response, setResponse] = useState<{
    status?: string;
    message?: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { update } = useSession();
  const { handleSubmit, control, reset } = useForm<UserInfoPayloadType>({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(userInfoSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  function onSubmit(formValues: UserInfoPayloadType) {
    startTransition(async () => {
      const response = await UpdateUserInformation(formValues);
      if (response.message === "success") {
        setResponse({
          status: "success",
          message: "Profile updated successfully",
        });
        await update({
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
        });
        router.refresh();
      } else {
        setResponse({
          status: "error",
          message: response.message,
        });
      }
    });
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
            <RiUserFill className="text-primary-600 size-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Profile Information</h3>
            <p className="text-sm text-gray-500">
              Update your personal details
            </p>
          </div>
        </div>
        {response?.message && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium ${response?.status === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
          >
            {response?.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Enter your name"
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Phone Number */}
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
                    placeholder="01xxxxxxxxx"
                    type="tel"
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="pt-4">
            <button
              disabled={isPending}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
            >
              {isPending ? (
                <>
                  <Spinner className="size-5 text-white" />
                  Saving...
                </>
              ) : (
                <>
                  <FaFloppyDisk />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="p-6 sm:p-8 bg-gray-50">
        <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">User ID</span>
            <span className="font-mono text-gray-700">{user?._id || "-"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Role</span>
            <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
              {user?.role || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
