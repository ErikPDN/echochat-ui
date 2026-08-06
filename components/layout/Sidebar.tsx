"use client";

import { useState } from "react";

import { MessageCircle, MessageSquarePlus } from "lucide-react";
import { SearchBar } from "../ui/SearchBar";

export const Sidebar = () => {
  return (
    <aside className="w-96 border-r border-card-border bg-card flex flex-col shrink-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary">
            <MessageCircle className="h-4 w-4 text-white" strokeWidth={2.2} />
          </div>

          <span className="text-lg font-semibold">Pulse</span>
        </div>

        <button
          onClick={() => {}}
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
        >
          <MessageSquarePlus className="h-4 w-4 text-white" />
        </button>
      </div>

      <SearchBar />
    </aside>
  );
};
