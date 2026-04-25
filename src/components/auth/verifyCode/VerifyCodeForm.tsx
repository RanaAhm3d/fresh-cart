"use client";
import { forgetPassword, verifyCode } from "@/actions/auth.action";
import Spinner from "@/components/shared/Loading/Spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import notify from "@/hooks/useNotification";
import {
  VerifyCodePayloadType,
  verifyCodeSchema,
  defaultValues,
} from "@/schema/verifyCode.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaShieldAlt } from "react-icons/fa";
import { FaArrowLeftLong, FaCheck, FaKey, FaLock } from "react-icons/fa6";

export default function VerifyCodeForm({
  email,
  onSuccess,
  onBack,
}: {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm<VerifyCodePayloadType>({
    defaultValues,
    resolver: zodResolver(verifyCodeSchema),
    mode: "onSubmit",
  });

  function handleResetCode() {
    startTransition(async () => {
      const response = await forgetPassword({ email });
      if (response.status === "success") {
        notify(response.message, "success");
      } else {
        notify(response.message, "error");
      }
    });
  }

  function onSubmit(resetCode: VerifyCodePayloadType) {
    startTransition(async () => {
      const response = await verifyCode(resetCode);
      if (response.status === "Success") {
        notify(response.message || "Verification successful", "success");
        onSuccess();
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
          Check Your Email
        </h1>
        <p className="text-gray-600">Enter the 6-digit code sent to {email}</p>
      </div>
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white">
            <FaCheck />
          </div>
          <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-primary-600"></div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ring-4 ring-primary-100">
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
          name="resetCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="w-full ">
              <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
              <div className="relative ">
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  className="w-full px-4 h-12 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all text-center text-2xl! tracking-[0.5em] font-mono placeholder:text-2xl! placeholder:rounded-2xl "
                  placeholder="••••••"
                  maxLength={6}
                  autoComplete="off"
                />
                <FaShieldAlt className="absolute size-4 top-1/2 left-6 -translate-y-1/2 text-gray-400 me-10" />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResetCode}
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Resend Code
            </button>
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-3 bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Spinner className="size-5 text-white" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors"
          >
            <FaArrowLeftLong />
            Change email address
          </button>
        </div>
      </form>
    </div>
  );
}
