import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../actions/actions";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import Product from "./Product";

function Products() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage; 
  const totalProducts = useSelector((state) => state.filteredProducts);
  const totalPages = Math.ceil(totalProducts.length / productsPerPage);
  const showProducts = useSelector((state) => state.filteredProducts ? state.filteredProducts.slice(indexOfFirstPost, indexOfLastPost) : false);

  const previousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  if (currentPage > totalPages) previousPage();

  const clearHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(clearState());
  };
  
  if (!showProducts) {
  return (
    <div className="mt-20">
      <h1 className="container">Error, please add a Product</h1>

      <div className="container">
        <Link to="/home" style={{ textDecoration: "none" }} onClick={clearHome}>
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-10">Go Back</button>
        </Link>
      </div>
    </div>
  );
} else if (showProducts.length) {
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Products</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
              showProducts && showProducts.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id}>
                  <Product
                  name={p.name}
                  description={p.description}
                  image={p.image}
                  price={p.price}
                  key={p.id}
                  />
                </Link>
              ))
            }
          </div>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="min-w-full flex justify-center">
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={previousPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                
                <p
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {currentPage} / {totalPages}
                </p>

                <button
                  onClick={nextPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Products;