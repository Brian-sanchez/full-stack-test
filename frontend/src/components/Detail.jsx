import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, clearProductById, deleteProduct, getAllProducts, clearState } from "../actions/actions";

import Footer from './Footer';
import NavBar from './NavBar';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productByID = useSelector((state) => state.productById);
  let { id } = useParams();

  const handleClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productByID.id))
    alert("Your product was deleted");
    navigate("/home");
    dispatch(clearState());
    dispatch(getAllProducts());
  }

  useEffect(() => {
    dispatch(clearProductById());
    dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavBar/>
      {
        (Object.keys(productByID).length > 0) ?
        <div className="pt-6">
          {
            productByID.id.length > 4 ?
            <div className="sm:flex mt-10"> 
              <div className="max-h-2xl mx-auto sm:px-6 lg:max-w-2xl lg:px-8">
                <div className="aspect-h-4 rounded-lg overflow-hidden lg:block">
                  <img
                    src={productByID.image}
                    alt={productByID.image}
                    className="h-full object-center lg:h-full"
                  />
                </div>
              </div>
  
              <div className="max-w-2xl mx-auto pt-10 pb-16 px-10 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{productByID.name}</h1>
                </div>
      
                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                      <p className="text-base text-gray-900">{productByID.description}</p>
                    </div>
                  </div>
                </div>
      
                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <p className="text-3xl text-gray-900">${productByID.price}</p>
      
                  <form className="mt-20 ">
                    <Link to="/editproduct">
                      <button
                        className="mt-10 w-full bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Edit
                      </button>
                    </Link>
      
                    <button
                      className="mt-10 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={(e) => handleClickDelete(e)}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          :
          <div className="sm:flex mt-10">
            <div className="mt-6 max-h-2xl mx-auto sm:px-6 lg:max-w-2xl lg:px-8">
              <div className="aspect-h-4 rounded-lg overflow-hidden lg:block">
                <img
                  src={productByID.image}
                  alt={productByID.image}
                  className="h-full object-center lg:h-full"
                />
              </div>
            </div>

            <div className="mx-auto pt-20 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{productByID.name}</h1>
              </div>

              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{productByID.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl text-gray-900">${productByID.price}</p>
              </div>
            </div>
          </div>
        }
        </div>
        : 
        <div>Loading...</div>
      }
      <Footer/>
    </div>
  );
};

export default Detail;