const initialState = {
    allProducts: [],
    filteredProducts: [],
    productById: [],
    productCategories: [],
    addedProduct: false
};
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                addedProduct: action.payload,
            };
                                    
        case "CLEAR_PRODUCT_BY_ID":
            return {
                ...state,
                productById: [],
            };

        case "CLEAR_STATE":
            return {
                ...state,
                filteredProducts: state.allProducts,
                productNotFound: false
            };

        case "FILTER_BY_CATEGORY":
            const allProducts = state.allProducts;

            const categoryFiltered = allProducts.filter(p => {
                if (p.categories) {
                    const category = p.categories.map(p => p.name);
                    return category.includes(action.payload);
                }

                if (p.category) {
                    return p.category.includes(action.payload);
                }

                return null;
            })

            if (categoryFiltered.length) {
                return {
                    ...state,
                    filteredProducts: categoryFiltered,
                };
            } else {
                return {
                    ...state,
                    filteredProducts: false,
                };
            };

        case "FILTER_BY_CREATOR":
            const filteredCreator = state.allProducts.filter((p) => {
                return p.created.toString() === action.payload;
            });

            if (filteredCreator.length) {
                return {
                    ...state,
                    filteredProducts: filteredCreator
                };
            } else {
                return {
                    ...state,
                    productDB: false,
                    filteredProducts: false
                };
            };

        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                allProducts: action.payload,
                filteredProducts: action.payload,
            };

        case "GET_PRODUCT_BY_ID":
            return {
                ...state,
                productById: action.payload,
            };

        case "GET_PRODUCT_BY_NAME":
                return {
                    ...state,
                    filteredProducts: action.payload
                };

        case "GET_PRODUCT_CATEGORIES":
            return {
                ...state,
                productCategories: [...action.payload],
            };

        case "ORDER_ASCENDING":
            return {
                ...state,
                filteredProducts: state.filteredProducts.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                }),
            };

        case "ORDER_DESCENDING":
            return {
                ...state,
                filteredProducts: state.filteredProducts.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                }),
            };

        case "ORDER_PRICE_ASCENDING":
            return {
                ...state,
                filteredProducts: state.filteredProducts.sort((a, b) => {
                    if (Number(a.price) > Number(b.price)) return -1;
                    if (Number(a.price) < Number(b.price)) return 1;
                    return 0;
                }),
            };

        case "ORDER_PRICE_DESCENDING":
            return {
                ...state,
                filteredProducts: state.filteredProducts.sort((a, b) => {
                    if (Number(a.price) < Number(b.price)) return -1;
                    if (Number(a.price) > Number(b.price)) return 1;
                    return 0;
                }),
            };

        case "DELETE_PRODUCT":
            return {
                ...state
            };

        case "UPDATE_PRODUCT":
            return {
                ...state
            };

        default: return state;
    };
};

export default rootReducer;