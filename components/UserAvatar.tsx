import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserAvatar = ({
  name,
  image,
  classname,
}: {
  name?: string | null;
  image?: string | null;
  classname?: string;
}) => {
  return (
    <Avatar className={cn("bg-white text-black", classname)}>
      {image && (
        <Image
          src={image || ""}
          alt={name || "User name"}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
      <AvatarFallback
        delayMs={2000}
        className="dark:bg-white bg-gray-200 dark:text-black text-lg"
      >
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
