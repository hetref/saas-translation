"use client";

import React, { createRef, useEffect } from "react";
import { Message, sortedMessagesRef } from "@/lib/converters/Message";
import { useLanguageStore } from "@/store/store";
import { Session } from "next-auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MessageCircleIcon } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import UserAvatar from "./UserAvatar";

const ChatMessages = ({
  chatId,
  initialMessages,
  session,
}: {
  chatId: string;
  initialMessages: Message[];
  session: Session | null;
}) => {
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages,
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="flex-1 p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col justify-center items-center p-28 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
          <MessageCircleIcon className="h-10 w-10" />

          <h2>
            <span className="font-bold">Invite a friend</span> &{" "}
            <span className="font-bold">
              Send your first message in ANY language
            </span>
          </h2>
          <p>The AI will auto-detect & translate the language for you.</p>
        </div>
      )}

      {messages?.map((message) => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div className="flex my-2 items-end" key={message.id}>
            <div
              className={`flex flex-col relative space-y-2 p-4 w-fit line-clamp-1 mx-2 rounded-lg ${
                isSender
                  ? "ml-auto bg-violet-600 text-white rounded-br-none"
                  : "bg-gray-100 dark:text-gray-100 dark:bg-slate-700 rounded-bl-none"
              }`}
            >
              <p
                className={`text-xs italic font-extralight line-clamp-1 ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message.user.name.split(" ")[0]}
              </p>

              <div className="flex space-x-2">
                <p>{message.translated?.[language] || message.input}</p>
                {!message.translated && <LoadingSpinner />}
              </div>
            </div>

            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              classname={`${!isSender && "-order-1"}`}
            />
          </div>
        );
      })}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
