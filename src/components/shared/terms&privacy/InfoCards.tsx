interface InfoCardsProps {
  num: number;
  data: {
    icon: React.ReactNode;
    title: string;
    content?: string[];
    paragraph?: string;
    email?: string;
  };
}

export default function InfoCards({ data, num }: InfoCardsProps) {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary-100 transition-all duration-300 group cursor-pointer">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary-100 to-primary-50 flex items-center justify-center shrink-0 group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-300">
          {data.icon}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
            article {num + 1}
          </span>
          <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>
        </div>
      </div>
      {data.content && (
        <div className="space-y-3">
          {data?.content?.map((content, index) => (
            <div
              className="flex items-start gap-3 text-gray-600 leading-relaxed"
              key={index}
            >
              <span className="text-xs font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                {num + 1}.{index + 1}
              </span>
              <p className="text-sm">{content}</p>
            </div>
          ))}
        </div>
      )}
      {data.paragraph && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {data.paragraph}{" "}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="text-primary-600 hover:underline hover:text-primary-700 font-semibold"
            >
              {data.email}
            </a>
          )}
        </p>
      )}
    </section>
  );
}
