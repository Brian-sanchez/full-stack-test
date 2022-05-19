import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProduct, getProductCategories, getAllProducts} from "../actions/actions";

import Footer from './Footer';
import NavBar from './NavBar';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.productCategories);
  const product = useSelector(state => state.productById);
  
  const [input, setInput] = useState({
    name : `${product.name}`,
    image: `${product.image}`,
    category: `${product.category}`, 
    description: `${product.description}`,
    price: `${product.price}`,
  });

  const handleInputChange = (e) => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {    
    e.preventDefault();
    dispatch(editProduct(input, product.id));
    alert("Your product was edited!");
    e.target.reset();
    dispatch(getAllProducts());
    navigate("/home");
  };

  useEffect(() => {
    dispatch(getProductCategories());

  }, [dispatch]);

  return (
    <div>
        <NavBar/>
        <div className="hidden sm:block mt-10" aria-hidden="true">
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
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Product Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => handleInputChange(e)}
                          value={input.name}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Image
                        </label>

                        <input
                          type="url"
                          name="image"
                          className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => handleInputChange(e)}                        
                          value={input.image}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>

                        <select
                          name="category"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          onChange={(e) => handleInputChange(e)}
                          value={input.category}
                        >
                          {
                            categories && categories
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
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>

                        <input
                          type="text"
                          name="description"
                          className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => handleInputChange(e)}
                          value={input.description}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>

                        <input
                          type="number"
                          name="price"
                          className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          onChange={(e) => handleInputChange(e)}
                          value={input.price}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                    >
                      Edit Product
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
  );
};

export default EditProduct;