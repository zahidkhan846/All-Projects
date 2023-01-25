import React from "react";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-3xl font-bold text-red-400">404 | Page not found</p>
      <Link href="/">GO BACK</Link>
    </div>
  );
}
