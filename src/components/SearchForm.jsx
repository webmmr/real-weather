import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchTerm("");
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className=" text-gray-400 focus-within:text-slate-300 border border-slate-500 pr-2  rounded-full"
    >
      <div className="flex flex-row justify-start items-center">
        <input
          type="search"
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none placeholder-slate-500 text-base text-white px-3 py-2"
        />
        <FiSearch className="w-5 h-5 ml-4" />
      </div>
    </form>
  );
};

export default Searchbar;
