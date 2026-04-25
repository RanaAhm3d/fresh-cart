import Spinner from "../shared/Loading/Spinner";

export default function AuthButton({
  type,
  icon,
  isPending,
}: {
  type: string;
  icon?: React.ReactNode;
  isPending?: boolean;
}) {
  return (
    <button
      disabled={isPending}
      type="submit"
      className="w-full bg-primary-600 flex items-center justify-center gap-2 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <Spinner className="size-5 text-white" />
          {type}...
        </>
      ) : (
        <>
          {icon}
         {type}
        </>
      )}
    </button>
  );
}
