"use client";
import { forgetPassword } from "@/actions/auth.action";
import Spinner from "@/components/shared/Loading/Spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import notify from "@/hooks/useNotification";
import {
  ForgetPasswordPayloadType,
  forgetPasswordSchema,
  defaultValues,
} from "@/schema/forgetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaKey } from "react-icons/fa";
import { FaArrowLeftLong, FaEnvelope, FaLock } from "react-icons/fa6";

export default function ForgetPasswordForm({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm<ForgetPasswordPayloadType>({
    defaultValues,
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onSubmit",
  });

  function onSubmit(email: ForgetPasswordPayloadType) {
    startTransition(async () => {
      const response = await forgetPassword(email);

      if (response.statusMsg === "success") {
        notify(response.message, "success");
        onSuccess(email.email);
      } else {
        notify(response.message, "error");
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
          Forgot Password?
        </h1>
        <p className="text-gray-600">
          No worries, we&apos;ll send you a reset code
        </p>
      </div>
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ring-4 ring-primary-100">
            <FaEnvelope />
          </div>
          <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
            <FaKey />
          </div>
          <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
            <FaLock />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full ">
              <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder="Enter your email address"
                  autoComplete="off"
                  className="px-4 h-12 pl-13 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                />
                <MailIcon className="absolute size-4 top-1/2 -translate-y-1/2 left-6 text-gray-400 me-1" />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-3 bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Spinner className="size-5 text-white" />
              Sending Code...
            </>
          ) : (
            "Send Reset Code"
          )}
        </button>
        <div className="text-center">
          <Link
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            href="/login"
          >
            <FaArrowLeftLong />
            Back to Sign In
          </Link>
        </div>
      </form>
      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-600">
          Remember your password?{" "}
          <Link
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            href="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
