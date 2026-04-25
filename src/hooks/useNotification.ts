import { toast } from "react-toastify";

const notify = (
  msg: string | null | undefined,
  type: "warn" | "success" | "error",
) => {
  if (type === "warn") toast.warn(msg);
  else if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
};

export default notify;
