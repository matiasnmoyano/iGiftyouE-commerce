import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ searchInput, setSearchInput }) {
  return (
    <form className="form-inline my-2 my-lg-0">
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
    </form>
  );
}
