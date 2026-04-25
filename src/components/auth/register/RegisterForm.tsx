"use client";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import AuthButton from "../AuthButton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import EyeSlash from "@/components/shared/icons/EyeSlash";
import Eye from "@/components/shared/icons/Eye";
import {
  defaultValues,
  RegisterPayloadType,
  registerSchema,
} from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { registerHandler } from "@/actions/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import notify from "@/hooks/useNotification";

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const password = useTogglePassword();
  const confirmPassword = useTogglePassword();
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  function onSubmit(formData: RegisterPayloadType) {
    startTransition(async () => {
      const response = await registerHandler(formData);
      if (response.message === "success") {
        notify("Account created successfully!", "success");
        router.push("/login");
      } else {
        notify(response.message, "error");
      }
    });
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg px-6 py-10">
      <h2 className="text-center text-3xl font-semibold mb-2">
        Create Your Account
      </h2>
      <p className="text-center">Start your fresh journey with us today</p>
      <div className="flex gap-2 *:grow my-10 *:px-4 *:py-2 *:bg-transparent *:border *:border-gray-300 *:hover:bg-gray-100 *:flex *:justify-center *:items-center *:gap-1 *:rounded-lg *:cursor-pointer *:disabled:opacity-50 *:disabled:cursor-not-allowed">
        <button type="button" aria-label="Sign up with Google">
          <FaGoogle className="text-red-500 mb-0.5" size={18} />
          <span>Google</span>
        </button>
        <button type="button" aria-label="Sign up with Facebook">
          <FaFacebook className="text-blue-600 mb-0.5" size={18} />
          <span>Facebook</span>
        </button>
      </div>
      <div className="relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4">
        <span className="sr-only">or</span>
      </div>
      <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder="Ali"
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
                <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder="ali@example.com"
                  autoComplete="off"
                  className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <div className="relative ">
                  <Input
                    type={password.inputType}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="create a strong password"
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <button
                    type="button"
                    className="absolute size-4 top-1/2 right-6 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => password.toggle()}
                  >
                    {password.show ? <EyeSlash /> : <Eye />}
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
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>Confirm Password*</FieldLabel>
                <div className="relative ">
                  <Input
                    type={confirmPassword.inputType}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="confirm your password"
                    className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <button
                    type="button"
                    className="absolute size-4 top-1/2 right-6 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => confirmPassword.toggle()}
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
          {/* Phone Number */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                  placeholder="+1 234 567 8900"
                  type="tel"
                  className="px-4 h-12 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="checkbox"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="    w-5 h-5 rounded border border-gray-300 data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-colors"
                  />
                  <Label htmlFor={field.name} className="text-gray-700">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary-600 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    *
                  </Label>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />
        </FieldGroup>
        <AuthButton
          type="Create My Account"
          icon={<FaUserPlus className="mb-0.5" />}
          isPending={isPending}
        />
      </form>
      <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
        Already have an account?{" "}
        <Link
          className="text-primary-600 hover:underline font-medium"
          href="/login"
        >
          Sign In
        </Link>
      </p>
    </section>
  );
}
