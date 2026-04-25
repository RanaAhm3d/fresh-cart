import RegisterBanner from "@/components/auth/register/RegisterBanner";
import RegisterForm from "@/components/auth/register/RegisterForm";

export default function Register() {
  return (
    <section className="py-10">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        <div className="hidden lg:block">
          <RegisterBanner />
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
