import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import searchDataApi from "../api/searchDataApi";

const Search = () => {
  const [search, setSearch] = useState("");

  function handleInput(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log(search);
    // Api call with the search text
    searchDataApi(search);

    setSearch("");
  }

  return (
    <div className="flex justify-start">
      <form className="flex " onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          className="py-3 px-5 rounded-tl-full rounded-bl-full bg-slate-800 text-slate-100 outline-none focus:outline-none"
          placeholder="Search for a city"
          onChange={handleInput}
          value={search}
        />
        <button
          type="submit"
          className="rounded-tr-full rounded-br-full bg-slate-800 text-slate-100 "
        >
          <FiSearch
            size={40}
            style={{
              padding: "10px",
            }}
          />
        </button>
      </form>
    </div>
  );
};

export default Search;
