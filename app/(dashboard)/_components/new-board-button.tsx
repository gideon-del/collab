import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";
interface NewBoadButtonProps {
  orgId: string;
  disabled?: boolean;
}
const NewBoardButton: React.FC<NewBoadButtonProps> = ({ orgId, disabled }) => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const handleClick = async () => {
    try {
      const res = await mutate({
        title: "Untitled",
        orgId: orgId,
      });
      toast.success("Board created");
      //   TODO: Redirect to board page
    } catch (error) {
      toast.error("Failed to create board");
    }
  };
  return (
    <button
      disabled={disabled || pending}
      onClick={handleClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (disabled || pending) &&
          "opacity-75 hover:bg-blue-800 cursor-not-allowed"
      )}
    >
      <div></div>
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
};

export default NewBoardButton;
