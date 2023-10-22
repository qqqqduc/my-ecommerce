import React from "react";
import "./FilterQuality.scss";

function FilterQuality() {
  return (
    <select className="filter--quality">
      <option value="new">Hàng mới về</option>
      <option value="old">Cũ nhất</option>
      <option value="fast">Bán chạy nhất</option>
      <option value="price-down">Giá: Cao - Thấp</option>
      <option value="price-up">Giá: Thấp - Cao</option>
    </select>
  );
}

export default FilterQuality;