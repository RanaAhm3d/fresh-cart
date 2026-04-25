import { getUserAddresses } from "@/actions/address.action";
import AddressesContent from "@/components/profile/addresses/AddressesContent";
import AddressesHeader from "@/components/profile/addresses/AddressesHeader";
import EmptyAddresses from "@/components/profile/addresses/EmptyAddresses";
import ProfileAside from "@/components/profile/ProfileAside";
import HeroSection from "@/components/shared/HeroSection/HeroSection";
import AddressesLoading from "@/components/shared/Loading/AddressesLoading";
import { Address } from "@/interfaces/addresses.interface";
import { Suspense } from "react";
import { FaUser } from "react-icons/fa6";

export default async function ProfileAddresses() {
  const { data: addresses }: { data: Address[] } = await getUserAddresses();
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
            <AddressesHeader />

            {!addresses && <EmptyAddresses />}

            <Suspense fallback={<AddressesLoading />}>
              {addresses && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses?.map((address) => (
                    <AddressesContent key={address._id} address={address} />
                  ))}
                </div>
              )}
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
