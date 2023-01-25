import Image from "next/image";
import React from "react";

function SearchList({ sub, onClick }) {
  return (
    <li
      onClick={onClick}
      className="flex items-center h-auto gap-2 px-4 py-2 cursor-pointer hover:bg-gray-300"
    >
      <Image
        className="rounded-full"
        src={sub.imageUrl}
        height={15}
        width={15}
      />
      <div>
        <p className="text-sm font-bold">{sub.name}</p>
        <p className="text-sm text-gray-400">{sub.title}</p>
      </div>
    </li>
  );
}

export default SearchList;
