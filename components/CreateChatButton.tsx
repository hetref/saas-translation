"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";

const CreateChatButton = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const { toast } = useToast();

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Hold on while we create a new chat for you!",
      duration: 3000,
    });

    const noOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.status === "active";

    if (!isPro && noOfChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description: "Please upgrade to pro plan to create more chats.",
        variant: "destructive",
        duration: 3000,
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Chat created Successfully...",
          description: "Your chat has been created successfully!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`chat/${chatId}`);
      })
      .catch((error) => {
        console.log(error);

        toast({
          title: "ERROR...",
          description: "Something went wrong!",
          variant: "destructive",
          duration: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton;
