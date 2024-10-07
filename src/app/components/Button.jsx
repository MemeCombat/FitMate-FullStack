"use client";

import { cn } from "../../lib/utils";

export default function Button({ className, children, onClick, label }) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={cn(
        "flex text-black font-bold cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-6 py-2 text-sm shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none",
        className
      )}
    >
      {children}
      {label}
    </button>
  );
}
