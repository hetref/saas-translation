"use client";

import { useSubscriptionStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const UpgradeBanner = () => {
  const subscription = useSubscriptionStore((state) => state.subscription);
  // const isPro = subscription?.role === "pro";
  const isPro = subscription?.role === null;
  const router = useRouter();

  console.log(subscription);

  if (subscription === null || isPro) return null;

  return (
    <Button
      onClick={() => router.push("/register")}
      className="w-full rounded-none bg-gradient-to-r from-[#7775d6] to-[#e935c1] text-center text-white px-5 py-2 hover:from-[#7775d6] hover:to-[#e935c1] hover:shadow-md hover:opacity-75 transition-all"
    >
      Upgrade to Pro to unlock all features!
    </Button>
  );
};

export default UpgradeBanner;
