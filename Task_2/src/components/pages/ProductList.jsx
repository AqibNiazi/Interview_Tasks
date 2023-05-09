import React from "react";
import { useState, useEffect } from "react";
import { useFetchProducts } from "../api/useFetchProducts";
import ReactPaginate from "react-paginate";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("nameAsc");
  let itemsPerPage = 5;
  const { data, isLoading, error } = useFetchProducts(
    "https://fakestoreapi.com/products"
  );
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, isRefresh]);
  console.log(data);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  const handlesetSortOption = (e) => {
    setSortOption(e.target.value);
    if (e.target.value === "nameAsc") {
      let b = currentItems.sort((a, b) => a.title.localeCompare(b.title));
      setCurrentItems(b);
      setIsRefresh(!isRefresh);
    }
    if (e.target.value === "nameDesc") {
      let b = currentItems.sort((a, b) => b.title.localeCompare(a.title));
      setCurrentItems(b);
      setIsRefresh(!isRefresh);
    }
    if (e.target.value === "priceAsc") {
      let b = currentItems.sort((a, b) => a.price - b.price);
      setCurrentItems(b);
      setIsRefresh(!isRefresh);
    }
    if (e.target.value === "priceDesc") {
      let b = currentItems.sort((a, b) => b.price - a.price);
      setCurrentItems(b);
      setIsRefresh(!isRefresh);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentItems(currentItems.filter((el) => el?.category === searchTerm));
    setSearchTerm("");
  };

  //   // Filter by name or price range
  //   const filtered = products.filter(
  //     (product) =>
  //       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //       product.price >= minPrice &&
  //       product.price <= maxPrice
  //   );

  //   // Sort by name or price
  //   const sorted = filtered.sort((a, b) => {
  //     if (sortOption === "nameAsc") {
  //       return a.name.localeCompare(b.name);
  //     } else if (sortOption === "nameDesc") {
  //       return b.name.localeCompare(a.name);
  //     } else if (sortOption === "priceAsc") {
  //       return a.price - b.price;
  //     } else {
  //       return b.price - a.price;
  //     }
  //   });

  //   // setFilteredProducts(sorted);
  // }, [products, searchTerm, minPrice, maxPrice, sortOption]);

  // // Pagination
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = filteredProducts.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  // const pageNumbers = [];
  // for (
  //   let i = 1;
  //   i <= Math.ceil(filteredProducts.length / productsPerPage);
  //   i++
  // ) {
  //   pageNumbers.push(i);
  // }

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // }
  return (
    <div className="p-6">
      <h1 className="flex justify-center text-xl font-bold p-3">
        Product List
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mx-4 gap-5 ">
        <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
           
          />
          <button
            type="submit"
            onClick={handleSearch}
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
        <select
          value={sortOption}
          onChange={handlesetSortOption}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option value="nameAsc">Sort by name (A-Z)</option>
          <option value="nameDesc">Sort by name (Z-A)</option>
          <option value="priceAsc">Sort by price (low to high)</option>
          <option value="priceDesc">Sort by price (high to low)</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {currentItems.map((product) => {
          return (
            <div
              className="grid grid-cols-1  grid-flow-row-dense mx-4 my-4 rounded-md shadow-sm shadow-zinc-500 overflow-hidden max-h-88 pb-3"
              key={product.id}
            >
              <div className="mx-auto mt-4 max-w-md">
                <img
                  src={product.image}
                  alt="product Images"
                  className="max-h-44 object-contain"
                />
              </div>
              <h2 className="px-4 font-bold">{product.title}</h2>
              <p className="px-4">{product.category}</p>
              <h3 className="px-4 font-semibold">${product.price}</h3>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousClassName="page-num "
        activeLinkClassName="active"
        nextClassName="next"

      />
    </div>
  );
};
export default ProductList;
