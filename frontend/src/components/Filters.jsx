import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories, orderProduct, filterByCategory, filterByCreator, clearState, getAllProducts } from "../actions/actions";

import SearchBar from './SearchBar';
import Refresh from "./Refresh";

import "./styles/Filters.css";

function Filters() {
    const dispatch = useDispatch();
    const category = useSelector((state) => state.productCategories);

    const [selectType, setSelectType] = useState("");
    const [selectCreator, setSelectCreator] = useState("");
    const [selectOrder, setSelectOrder] = useState("");

    useEffect(() => {
        dispatch(getProductCategories());
    }, [dispatch]);

    const order = (e) => {
        setSelectOrder(e.target.value);
        dispatch(orderProduct(e.target.value));
    };

    const filterType = (e) => {
        setSelectType(e.target.value);
        dispatch(filterByCategory(e.target.value));
    };

    const filterCreator = (e) => {
        setSelectCreator(e.target.value);
        dispatch(filterByCreator(e.target.value));
    };

    const filtersRefresh1 = () => {
        setSelectCreator("");
        setSelectOrder("");
    };

    const disabledOption1 = () => {
        document.getElementById("orderByAlphabetical").options[0].setAttribute("disabled", "");
        document.getElementById("orderByPrice").options[0].removeAttribute("disabled");
    };

    const disabledOption2 = () => {
        document.getElementById("orderByPrice").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
    };

    const disabledOption3 = () => {
        document.getElementById("filterByCategory").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
        document.getElementById("orderByPrice").options[0].removeAttribute("disabled");
    };

    const disabledOption4 = () => {
        document.getElementById("filterBySource").options[0].setAttribute("disabled", "");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
        document.getElementById("orderByPrice").options[0].removeAttribute("disabled");
    };

    const refresh = () => {
        setSelectType("");
        setSelectCreator("");
        setSelectOrder("");
        document.getElementById("orderByAlphabetical").options[0].removeAttribute("disabled");
        document.getElementById("orderByPrice").options[0].removeAttribute("disabled");
        document.getElementById("filterByCategory").options[0].removeAttribute("disabled");
        document.getElementById("filterBySource").options[0].removeAttribute("disabled");
        dispatch(clearState());
        dispatch(getAllProducts());
    };

    return (
        <div className="bigContainer mt-10">
            <SearchBar/>
            <div onClick={refresh}><Refresh/></div>

            <div className="container">
                <div className="filters">
                    <p>Order by</p>
                    <select id="orderByAlphabetical" onChange={order} value={selectOrder} onClick={disabledOption1}>
                        <option value="alph">Alphabetical</option>
                        <option value="asc">Ascending (A-Z)</option>
                        <option value="desc">Descending (Z-A)</option>
                    </select>

                    <select id="orderByPrice" onChange={order} value={selectOrder} onClick={disabledOption2}>
                        <option value="price">Price</option>
                        <option value="less">Less (-)</option>
                        <option value="more">More (+)</option>
                    </select>
                </div>

                <div className="filters">
                    <p>Filter by</p>
                    <select id="filterByCategory" onChange={filterType} value={selectType} onClick={filtersRefresh1 && disabledOption3}>
                        <option>Category</option>
                        <option value="category">All Categories</option>
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

                    <select id="filterBySource" onChange={filterCreator} value={selectCreator} onClick={disabledOption4}>
                        <option>Source</option>
                        <option value="all">All</option>
                        <option value="false">Products Api</option>
                        <option value="true">Products Added</option>
                    </select>
                </div>
            </div>
        </div>
    );
};


export default Filters;