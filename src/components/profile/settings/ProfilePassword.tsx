"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserPassword } from "@/services/user.service";
import { toast } from "sonner";
import { FaLock } from "react-icons/fa";
import {
  UserPasswordPayloadType,
  userPasswordSchema,
  defaultValues,
} from "@/schema/userPassword.shema";
import EyeSlash from "@/components/shared/icons/EyeSlash";
import Eye from "@/components/shared/icons/Eye";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import { useState, useTransition } from "react";
import Spinner from "@/components/shared/Loading/Spinner";
import { Input } from "@/components/ui/input";

export default function ProfilePassword() {
  const [response, setResponse] = useState<{
    status?: string;
    message?: string;
  } | null>(null);
  const currentPassword = useTogglePassword();
  const newPassword = useTogglePassword();
  const confirmPassword = useTogglePassword();
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control, reset } = useForm<UserPasswordPayloadType>({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(userPasswordSchema),
  });

  function onSubmit(formValues: UserPasswordPayloadType) {
    startTransition(async () => {
      const response = await UpdateUserPassword(formValues);
      if (response.message === "success") {
        setResponse({
          status: "success",
          message: "Password changed successfully",
        });
        reset();
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
      <div className="p-6 sm:p-8 ">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
            <FaLock className="text-amber-600 size-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">
              Update your account password
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
            {/* Current Password */}
            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={currentPassword.inputType}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      placeholder="Enter your current password"
                      className="px-4 h-12  focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-6 -translate-y-1/2 size-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={currentPassword.toggle}
                    >
                      {currentPassword.show ? <EyeSlash /> : <Eye />}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* New Password */}
            <Controller
              name="password"
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
                      placeholder="Enter your new password"
                      className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all "
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-6 -translate-y-1/2 size-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
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
            {/* Confirm New Password */}
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full ">
                  <FieldLabel htmlFor={field.name}>
                    Confirm New Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      type={confirmPassword.inputType}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      placeholder="Confirm your new password"
                      className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all "
                    />
                    <button
                      type="button"
                      className=" absolute top-1/2 right-6 -translate-y-1/2 size-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
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
          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25"
            >
              {isPending ? (
                <>
                  <Spinner className="size-5 text-white" />
                  Changing...
                </>
              ) : (
                <>
                  <FaLock />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
