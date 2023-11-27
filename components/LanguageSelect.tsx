"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LanguageSupported,
  LanguageSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LanguageSelect = () => {
  const [language, setLanguage, getLanguage, getNotsupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguage,
      state.getNotsupportedLanguages,
    ]);

  const subscription = useSubscriptionStore((state) => state.subscription);
  //   const isPro =
  //     subscription?.role === "pro" && subscription.status === "active";
  const isPro = subscription?.role === null && subscription.status === "active";

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguageSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[158px] text-black dark:text-white">
            <SelectValue
              placeholder={LanguageSupportedMap[language]}
              className=""
            />
          </SelectTrigger>

          <SelectContent>
            {subscription === undefined ? (
              <LoadingSpinner />
            ) : (
              <>
                {getLanguage(isPro).map((language) => (
                  <SelectItem key={language} value={language}>
                    {LanguageSupportedMap[language]}
                  </SelectItem>
                ))}

                {getNotsupportedLanguages(isPro).map((language) => (
                  <Link href={"/register"} key={language} prefetch={false}>
                    <SelectItem
                      key={language}
                      value={language}
                      disabled
                      className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                    >
                      {LanguageSupportedMap[language]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default LanguageSelect;
