import AuthForms from "@/components/auth/authForms/AuthForms";
import ResetingBanner from "@/components/auth/ResetingBanner";

export default function forgetPassword() {
  return (
    <section className="container py-16 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <ResetingBanner />
        </div>
        <AuthForms />
      </div>
    </section>
  );
}
