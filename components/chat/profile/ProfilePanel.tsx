"use client";

import { PanelHeader } from "@/components/ui/PanelHeader";
import { CircleUser, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface ProfilePanelProps {
  onBackClick: () => void;
}

const NAV_ITEMS = [
  {
    icon: <CircleUser className="h-5 w-5" />,
    label: "Avatar",
    href: "/profile/avatar",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Settings",
    href: "/profile/settings",
  },
];

export const ProfilePanel = ({ onBackClick }: ProfilePanelProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-2">
      <PanelHeader onBackClick={onBackClick} title="Profile" />
      <div className="mx-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 text-sm hover:bg-white/5 transition-colors duration-75 ${pathname === item.href ? "bg-white/5" : ""}`}
          >
            <div className="shrink-0 mb-1">{item.icon}</div>

            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
