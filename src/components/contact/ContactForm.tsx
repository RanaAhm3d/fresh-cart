import { Headset } from "lucide-react";
import Link from "next/link";
import { BsFillQuestionCircleFill, BsSendFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Field, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupInput } from "../ui/input-group";

export default function ContactForm() {
  return (
    <section className="lg:col-span-2">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
            <Headset className="text-primary-600" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900">
              Send us a Message
            </h2>
            <p className="text-gray-500 text-sm">
              Fill out the form and we&apos;ll get back to you
            </p>
          </div>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field className="w-full ">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <InputGroup className="px-4 h-12 ">
                <InputGroupInput
                  type="name"
                  name="name"
                  placeholder="John Doe"
                  className="focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </InputGroup>
            </Field>
            <Field className="w-full ">
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <InputGroup className="px-4 h-12 ">
                <InputGroupInput
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </InputGroup>
            </Field>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-primary-600/20"
          >
            <BsSendFill className="text-white" />
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-6 bg-primary-50 rounded-2xl p-6 border border-primary-100">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <BsFillQuestionCircleFill className="text-primary-600" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 mb-1">
              Looking for quick answers?
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Check out our Help Center for frequently asked questions about
              orders, shipping, returns, and more
            </p>
            <Link
              href="/help"
              className="text-primary-600 font-medium text-sm hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Visit Help Center
              <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
