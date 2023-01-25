import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { axiosConnect } from "../../config/axios";
import { useSearch } from "../../context/search";
import { Sub } from "../../utils/typeDefs";
import SearchList from "../resources/searchList";

function Search() {
  const [name, setName] = useState("");
  const { subs, setSubs } = useSearch();

  const [timer, setTimer] = useState(null);

  const searchHandler = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await axiosConnect.get(`/sub/search/${name}`);
          setSubs(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }, 500)
    );
  };

  useEffect(() => {
    if (name.trim() === "") {
      setSubs([]);
      return;
    }
    searchHandler();
  }, [name]);

  const router = useRouter();

  const handleSearchItemClick = (subName: string) => {
    const path = "/r/" + subName;
    router.push(path);
    setName("");
  };

  return (
    <div className="relative flex items-center bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
      <i className="pl-3 text-gray-500 fas fa-search"></i>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Search"
        className="w-full px-2 py-1 pr-3 bg-transparent rounded focus:outline-none"
      />
      {subs && (
        <ul
          className="absolute left-0 right-0 overflow-hidden bg-white rounded-b"
          style={{ top: "100%" }}
        >
          {subs?.map((sub: Sub) => (
            <SearchList
              key={sub.name}
              onClick={() => handleSearchItemClick(sub.name)}
              sub={sub}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
