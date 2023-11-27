import { authOptions } from "@/auth";
import DarkModeTggle from "./DarkModeTggle";
import Logo from "./Logo";
import UseButton from "./UserButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelect from "./LanguageSelect";

const Header = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Language Select */}
          <LanguageSelect />

          {/* Sessions */}
          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessageSquareIcon className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}

          {/* DarkModeToggle */}
          <DarkModeTggle />

          {/* Use Button */}
          <UseButton session={session} />
        </div>
      </nav>

      <UpgradeBanner />
    </header>
  );
};

export default Header;
