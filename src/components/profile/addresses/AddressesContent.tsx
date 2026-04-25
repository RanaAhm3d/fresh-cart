"use client";
import { deleteUserAddress } from "@/actions/address.action";
import RemoveDialog from "@/components/shared/Dialog/RemoveDialog";
import notify from "@/hooks/useNotification";
import { Address } from "@/interfaces/addresses.interface";
import { useState, useTransition } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { FaCity, FaLocationDot, FaPhone } from "react-icons/fa6";
import AddressesDialog from "./AddressesDialog";
import { useRouter } from "next/navigation";

export default function AddressesContent({ address }: { address: Address }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  function handleRemove() {
    startTransition(async () => {
      const response = await deleteUserAddress(address._id);
      if (response.status === "success") {
        notify(response.message, "success");
        setOpen(false);
        router.refresh();
      } else {
        notify(response.message, "error");
      }
    });
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
            <FaLocationDot className="text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {address.details}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FaPhone />
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <FaCity />
                {address.city}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AddressesDialog
            address={address}
            text={
              <div
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Edit address"
              >
                <FaPen />
              </div>
            }
          />
          <div
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50"
            title="Delete address"
          >
            <RemoveDialog
              title={"Remove Address?"}
              content={"Are you sure you want to remove this address?"}
              contentIcon={<FaLocationDot className="size-7 text-red-500" />}
              icon={<FaTrash />}
              action={handleRemove}
              isPending={isPending}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
