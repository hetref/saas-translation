"use client";

import { useState } from "react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAdminId from "@/hooks/useAdminId";

const DeleteChatButton = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId({ chatId });

  const handleDelete = async () => {
    toast({
      title: "Deleting Chat",
      description: "Please wait while we delete the chat...",
    });

    console.log("Deleting :: ", chatId);

    await fetch("/api/chat/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId }),
    })
      .then((res) => {
        toast({
          title: "Success",
          description: "Chat deleted successfully!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.replace("/chat");
      })
      .catch((err) => {
        console.log(err);

        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
          duration: 2000,
        });
      })
      .finally(() => setOpen(false));
  };

  return (
    session?.user.id === adminId && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DeleteChatButton;
