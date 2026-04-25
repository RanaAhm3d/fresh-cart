interface UpperCardProps {
  data: {
    icon: React.ReactNode;
    title: string;
    paragraph: string;
  };
}

export default function UpperCard({ data }: UpperCardProps) {
  return (
    <div
      className={`bg-linear-to-r ${data.title.includes("Privacy") ? "from-primary-50 to-primary-100/50 border-primary-200 " : "from-amber-50 to-amber-100/50 border-amber-200"}  border rounded-3xl p-6 sm:p-8 mb-12 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-2xl ${data.title.includes("Privacy") ? "bg-primary-500 shadow-primary-500/20" : "bg-amber-500 shadow-amber-500/25"}  flex items-center justify-center shrink-0 shadow-lg `}
        >
          {data.icon}
        </div>
        <div className="flex flex-col">
          <h2
            className={`text-lg font-bold ${data.title.includes("Privacy") ? "text-primary-900" : "text-amber-900"}  mb-2`}
          >
            {data.title}
          </h2>
          <p
            className={` ${data.title.includes("Privacy") ? "text-primary-800" : "text-amber-800"} leading-relaxed`}
          >
            {data.paragraph}
          </p>
        </div>
      </div>
    </div>
  );
}
