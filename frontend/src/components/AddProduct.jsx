import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductCategories, addProduct, getAllProducts } from "../actions/actions";

import Footer from './Footer';
import NavBar from './NavBar';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useSelector((state) => state.productCategories);

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    price: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    if (!input.name || !input.description || !input.image || !input.price) return alert("You must complete the form");
    
    e.preventDefault();
    dispatch(addProduct(input));
    setInput({
      name: "",
      image: "",
      category: [],
      description: "",
      price: "",
    });

    alert("Your product was added!");
    navigate("/home");
    dispatch(getAllProducts());
  };

  return (
    <div>
      <NavBar/>
        <div className="block mt-10" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Product Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={input.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Image
                        </label>

                        <input
                          type="url"
                          name="image"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={input.image}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Category
                        </label>

                        <select
                          name="category"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={handleInputChange}
                          value={input.category}
                        >
                          <option value="category">Select Category</option>
                            {
                                category && category
                                .sort((a, b) => {
                                    if (a.name < b.name) return -1;
                                    if (a.name > b.name) return 1;
                                    return 0;
                                })

                                .map((type) => {
                                    return (
                                        <option value={type.name} key={type.id}>
                                            {type.name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>

                        <input
                          type="text"
                          name="description"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={input.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Price
                        </label>

                        <input
                          type="number"
                          name="price"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={input.price}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default CreateProduct