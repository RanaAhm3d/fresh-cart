import LoginBanner from "@/components/auth/login/LoginBanner";
import LoginForm from "@/components/auth/login/LoginForm";

export default function Login() {
  return (
    <section className="container py-16 mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <LoginBanner />
        </div>
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
