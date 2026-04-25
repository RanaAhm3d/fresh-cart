interface ContactInfoCards {
  contactInfo: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href?: string;
    link?: string;
  };
}

export default function ContactInfoCards({ contactInfo }: ContactInfoCards) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
          {contactInfo?.icon}
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-1">
            {contactInfo?.title}
          </h3>
          <p
            className={`text-gray-500 text-sm mb-2 ${contactInfo?.description?.includes("New") && "w-37.5"} `}
          >
            {contactInfo?.description}
          </p>
          <a
            href={contactInfo?.href}
            className="text-primary-600 font-medium hover:underline"
          >
            {contactInfo?.link}
          </a>
        </div>
      </div>
    </section>
  );
}
