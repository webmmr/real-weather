import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  console.log(search);

  return (
    <div className="flex justify-center">
      <form className="flex " onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          className="py-3 px-5 rounded-tl-full rounded-bl-full bg-slate-100 opacity-95"
          placeholder="Search for a city"
          value={search}
        />
        <button
          type="submit"
          className="rounded-tr-full rounded-br-full bg-slate-200 opacity-95"
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
