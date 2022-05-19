import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "../actions/actions";
import { BiSearchAlt2 } from 'react-icons/bi';

import "./styles/SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    //Validaciones
    if (search.length === 0) {
      e.preventDefault();
      alert("Nothing was written");      
    } else if (search.match(/[|\\/~^:.,;?!&%$@*+_-]/)) {
      e.preventDefault();
      alert("Don't write special characters");
    } else if (search > 0) {
      e.preventDefault();
      alert("Don't write numbers");
    } else {
      e.preventDefault();
      dispatch(getProductByName(search));
      setSearch("");
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          value={search}
          placeholder="Search Product"
          className="searchTerm"
          onChange={handleChange}
        />
        
        <button onClick={handleSubmit} className="searchButton"><BiSearchAlt2/></button>
      </div>
    </div>
  );
};

export default SearchBar;