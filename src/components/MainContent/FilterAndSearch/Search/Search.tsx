import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import _ from "lodash";
import {
  getCategories,
  getProductsByCategory,
} from "@/redux/actions/productsAction";
import "./Search.scss";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const categories = useSelector((state: any) => state.Product.categories);
  const dispatch: any = useDispatch();
  const router = useRouter();

  const handleSearch = () => {
    if (inputValue) {
      const resultSearch = categories.find((category: string) =>
        category.includes(inputValue)
      );
      setSearchValue(resultSearch);
      router.push(`/category/${resultSearch}`);
    }
  };

  useEffect(() => {
    dispatch(getCategories(searchValue));
  }, []);

  return (
    <div className="search-pane">
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        className="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="btn btn-primary px-4 p-0 custom-btn"
        onClick={() => handleSearch()}
      >
        <span>
          <BsSearch />
        </span>
      </button>
    </div>
  );
}

export default Search;
