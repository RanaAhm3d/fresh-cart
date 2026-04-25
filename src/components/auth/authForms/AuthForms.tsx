"use client";

import { useState } from "react";
import ForgetPasswordForm from "../forgetPassword/ForgetPasswordForm";
import VerifyCodeForm from "../verifyCode/VerifyCodeForm";
import ResetPasswordForm from "../resetPasswordForm/ResetPasswordForm";
import SuccessForm from "../successForm/SuccessForm";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <>
      {step === 1 && (
        <ForgetPasswordForm
          onSuccess={(userEmail) => {
            setEmail(userEmail);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <VerifyCodeForm
          email={email}
          onSuccess={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <ResetPasswordForm email={email} onSuccess={() => setStep(4)} />
      )}

      {step === 4 && <SuccessForm />}
    </>
  );
}
