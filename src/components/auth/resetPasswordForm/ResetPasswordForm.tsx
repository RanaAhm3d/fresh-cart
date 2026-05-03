"use client";

import { resetPassword } from "@/actions/auth.action";
import Eye from "@/components/shared/icons/Eye";
import EyeSlash from "@/components/shared/icons/EyeSlash";
import Spinner from "@/components/shared/Loading/Spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import notify from "@/hooks/useNotification";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import {
  resetPasswordSchema,
  defaultValues,
  ResetPasswordPayloadType,
} from "@/schema/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaLock } from "react-icons/fa6";

export type ResetPasswordRequest = ResetPasswordPayloadType & {
  email: string;
};

export default function ResetPasswordForm({
  email,
  onSuccess,
}: {
  email: string;
  onSuccess: () => void;
}) {
  const newPassword = useTogglePassword();
  const confirmPassword = useTogglePassword();
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm<ResetPasswordPayloadType>({
    defaultValues,
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  function onSubmit(formValues: ResetPasswordPayloadType) {
    startTransition(async () => {
      const payload: ResetPasswordRequest = {
        ...formValues,
        email,
      };
      const response = await resetPassword(payload);
      if (response.token ) {
        notify(response.message || "Password reset successfully!", "success");
        onSuccess();
      } else {
        notify(response.message || "Failed to reset password", "error");
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-primary-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Password
        </h1>
        <p className="text-gray-600">
          Your new password must be different from previous passwords
        </p>
      </div>
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white">
            <FaCheck />
          </div>
          <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-primary-600"></div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white">
            <FaCheck />
          </div>
          <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-primary-600"></div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ring-4 ring-primary-100">
            <FaLock />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          {/* New Password */}
          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>

                <div className="relative">
                  <Input
                    type={newPassword.inputType}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Enter new password"
                    className="px-4 h-12 pl-13 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <FaLock className=" absolute top-1/2 -translate-y-1/2 left-6 size-4 text-gray-400 me-1" />
                  <button
                    type="button"
                    className="size-4 absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={newPassword.toggle}
                  >
                    {newPassword.show ? <EyeSlash /> : <Eye />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <div className="relative">
                  <Input
                    type={confirmPassword.inputType}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Confirm new password"
                    className="px-4 h-12 pl-13 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <FaLock className="size-4 absolute top-1/2 -translate-y-1/2 left-6 text-gray-400 me-1" />
                  <button
                    type="button"
                    className="size-4 absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={confirmPassword.toggle}
                  >
                    {confirmPassword.show ? <EyeSlash /> : <Eye />}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Spinner className="size-5 text-white" />
              Reset Password...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
