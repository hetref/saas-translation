import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMembersBadge from "@/components/ChatMembersBadge";
import ChatMessages from "@/components/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatsPage = async ({ params: { chatId } }: Props) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission");

  return (
    <>
      {/* AdminControls</> */}
      <AdminControls chatId={chatId} />

      {/* ChatMembersBadge */}
      <ChatMembersBadge chatId={chatId} />

      {/* ChatMessages */}
      <ChatMessages
        chatId={chatId}
        session={session}
        initialMessages={initialMessages}
      />

      {/* ChatInput */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatsPage;
