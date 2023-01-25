import React from "react";
import SVG from "../../utils/logo";

function Logo() {
  return (
    <div className="flex items-center justify-center h-full gap-1">
      <SVG />
      <span className="hidden text-2xl font-semibold lg:block">
        read<span className="text-red-600">i</span>t
      </span>
    </div>
  );
}

export default Logo;
