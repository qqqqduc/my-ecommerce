import React from "react";
import "./FilterAndSearch.scss";
import FilterCategory from "../FilterAndSearch/FilterCategory/FilterCategory";
import Search from "../FilterAndSearch/Search/Search";
import FilterQuality from "../FilterAndSearch/FilterQuality/FilterQuality";

function FilterAndSearch() {
  return (
    <div className="filter">
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-2 p-0">
          <FilterCategory />
        </div>
        <div className="col-8 px-4">
          <Search />
        </div>
        <div className="col-2 p-0">
          <FilterQuality />
        </div>
      </div>
    </div>
  </div>
  );
}

export default FilterAndSearch;
