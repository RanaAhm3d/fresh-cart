"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "../Loading/Spinner";

interface RemoveDialogProps {
  text?: string;
  icon: React.ReactNode;
  contentIcon: React.ReactNode;
  title: string;
  action: () => void;
  content: string;
  isPending?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButton?: string;
  confirmButton?: string;
}

export default function RemoveDialog({
  icon,
  title,
  content,
  contentIcon,
  isPending,
  action,
  open,
  setOpen,
  text,
  cancelButton = "Cancel",
  confirmButton = "Remove",
}: RemoveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-1">
        {icon} <span>{text}</span>
      </DialogTrigger>
      <DialogContent
        style={{ width: "100%", maxWidth: "448px" }}
        showCloseButton={false}
        className="p-10"
      >
        <DialogHeader className="hidden">
          <DialogTitle>Remove Item?</DialogTitle>
          <DialogDescription>Remove</DialogDescription>
        </DialogHeader>
        <div className="text-center py-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            {contentIcon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{content}</p>
        </div>
        <div className="flex items-center justify-center  gap-3 ">
          <DialogClose asChild>
            <button
              type="button"
              className=" bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              {cancelButton}
            </button>
          </DialogClose>
          <button
            onClick={action}
            type="button"
            disabled={isPending}
            className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner className="size-5 text-white" />
                {confirmButton === "Remove" ? "Removing..." : "Clearing..."}
              </div>
            ) : (
              confirmButton
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
