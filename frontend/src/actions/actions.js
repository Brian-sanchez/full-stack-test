import axios from "axios";

export function getAllProducts() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/products`);
      dispatch({ type: "GET_ALL_PRODUCTS", payload: response.data });
    } catch (error) {
      console.log("Get all products:", error);
    }
  };
};

export function getProductCategories() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/category");
      dispatch({ type: "GET_PRODUCT_CATEGORIES", payload: response.data });
    } catch (error) {
      console.log("Get product categories:", error);
    }
  };
};

export function getProductByName(name) {
  return async function (dispatch) {
    try {
        const json = await axios.get("http://localhost:3001/products?name=" + name);
        return dispatch({
            type: "GET_PRODUCT_BY_NAME",
            payload: json.data
        }); 
    } catch (error) {
      alert("Product not found with that name :(");
    }; 
  };
};

export function productNotFoundReset() {
  return {
    type: "POKE_NOT_FOUND_RESET"
  };
};

export function getProductById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      dispatch({ type: "GET_PRODUCT_BY_ID", payload: response.data });
    } catch (error) {
      alert("No existe product con ese ID");
      dispatch({ type: "GET_PRODUCT_BY_ID", payload: null });
    }
  };
};

export function clearProductById() {
  return {
    type: "CLEAR_PRODUCT_BY_ID",
  };
};

export function clearState() {
  return {
    type: "CLEAR_STATE",
  };
};

export function addProduct(product) {
  return async function (dispatch) {
    try {
      dispatch({ type: "ADD_PRODUCT", payload: true });
      const response = await axios.post("http://localhost:3001/products", product);
      console.log(response)
    } catch (error) {
      console.log(error);
      dispatch({ type: "ADD_PRODUCT", payload: false });
    }
  };
};

export function filterByCategory(type) {
  return {
    type: "FILTER_BY_CATEGORY",
    payload: type,
  };
};

export function filterByCreator(payload) {
  return {
    type: "FILTER_BY_CREATOR",
    payload: payload,
  };
};

export function orderProduct(type) {
  if (type === "asc") {
    return {
      type: "ORDER_ASCENDING",
    };
  };

  if (type === "desc") {
    return {
      type: "ORDER_DESCENDING",
    };
  };

  if (type === "less") {
    return {
      type: "ORDER_PRICE_DESCENDING",
    };
  };

  if (type === "more") {
    return {
      type: "ORDER_PRICE_ASCENDING",
    };
  };
};

export function deleteProduct(id) {
  return async function () {
    await axios.delete(`http://localhost:3001/products/delete/${id}`);
    return {
      type: "DELETE_PRODUCT",
      payload: "product deleted",
    };
  };
};

export function editProduct(product, id) {
  return async function () {
    const updated = await axios.put(`http://localhost:3001/products/edit/${id}`, product);
    return {
      type: "UPDATE_PRODUCT",
      payload: updated,
    };
  };
};