import ProfileInformation from "@/components/profile/settings/ProfileInformation";
import ProfileAside from "@/components/profile/ProfileAside";
import SettingsHeader from "@/components/profile/settings/SettingsHeader";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import Loading from "@/components/shared/Loading/Loading";
import { Suspense } from "react";
import { FaUser } from "react-icons/fa6";
import ProfilePassword from "@/components/profile/settings/ProfilePassword";
import { getUserInfo } from "@/services/user.service";
import { UserResponse } from "@/interfaces/user.interface";

export default async function ProfileSettings() {
  const { data: user }: { data: UserResponse } = await getUserInfo();
  return (
    <>
      <HeroSection
        title="My Account"
        text="My Account"
        description="Manage your addresses and account settings"
        icon={<FaUser size={26} />}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <ProfileAside />
          <main className="flex-1">
            <div className="space-y-6">
              <SettingsHeader />
              <Suspense fallback={<Loading text="profile" />}>
                <ProfileInformation user={user} />
                <ProfilePassword />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
