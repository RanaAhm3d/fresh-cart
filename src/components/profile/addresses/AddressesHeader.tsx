"use client";
import { FaPlus } from "react-icons/fa6";
import AddressesDialog from "./AddressesDialog";

export default function AddressesHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your saved delivery addresses
        </p>
      </div>

      <AddressesDialog
        text={
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer">
            <FaPlus />
            Add Adress
          </div>
        }
      />
    </div>
  );
}
