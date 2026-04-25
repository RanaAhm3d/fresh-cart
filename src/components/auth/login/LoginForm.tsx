"use client";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { FaFacebook, FaGoogle, FaLock } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { RiStarFill } from "react-icons/ri";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useTransition } from "react";
import Eye from "@/components/shared/icons/Eye";
import EyeSlash from "@/components/shared/icons/EyeSlash";
import AuthButton from "../AuthButton";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  defaultValues,
  LoginPayloadType,
} from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import { Input } from "@/components/ui/input";
import notify from "@/hooks/useNotification";

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const password = useTogglePassword();
  const { handleSubmit, control } = useForm<LoginPayloadType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  function onSubmit(formValues: LoginPayloadType) {
    startTransition(async () => {
      const response = await signIn("credentials", {
        ...formValues,
        redirect: false,
      });
      if (response?.ok) {
        notify("Login successful!", "success");
        router.push("/");
      } else {
        notify(response?.error, "error");
      }
    });
  }

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-primary-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">
          Sign in to continue your fresh shopping experience
        </p>
      </div>
      <div className="space-y-3 mb-6 *:w-full *:flex *:items-center *:justify-center *:gap-3 *:py-3 *:px-4 *:border-2 *:border-gray-200 *:rounded-xl *:hover:border-primary-300 *:hover:bg-primary-50 *:transition-all *:duration-200 *:font-medium *:text-gray-700">
        <button type="button">
          <FaGoogle className="text-red-500" size={20} />
          <span>Continue with Google</span>
        </button>
        <button type="button">
          <FaFacebook className="text-blue-600" size={20} />
          <span>Continue with Facebook</span>
        </button>
      </div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-full ">
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="px-4 h-12 pl-14 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <MailIcon className="absolute top-1/2 left-6 -translate-y-1/2 size-4 text-gray-400 me-1" />
                </div>
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
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Link
                    className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
                    href="/forget-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={password.inputType}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Enter your password"
                    className="px-4 h-12 pl-14 focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-100 transition-all"
                  />
                  <FaLock className="absolute top-1/2 left-6 -translate-y-1/2 size-4 text-gray-400 me-1" />
                  <button
                    type="button"
                    className="absolute top-1/2 right-6 -translate-y-1/2 size-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={password.toggle}
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
        </FieldGroup>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              type="checkbox"
              name="rememberMe"
            />
            <span className="ml-3 text-sm text-gray-700">
              Keep me signed in
            </span>
          </label>
        </div>
        <AuthButton type="Sign In" isPending={isPending} />
      </form>
      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-600">
          New to FreshCart?
          <Link
            className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            href="/register"
          >
            Create an account
          </Link>
        </p>
      </div>
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500 *:flex *:items-center *:gap-1">
        <div>
          <FaLock />
          SSL Secured
        </div>
        <div>
          <HiUserGroup />
          50K+ Users
        </div>
        <div>
          <RiStarFill />
          4.9 Rating
        </div>
      </div>
    </section>
  );
}
