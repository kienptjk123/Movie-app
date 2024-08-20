import React from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="pt-16">
      <div className="container mx-auto ">
        <h2>Search Page</h2>
      </div>
    </div>
  );
};

export default SearchPage;
