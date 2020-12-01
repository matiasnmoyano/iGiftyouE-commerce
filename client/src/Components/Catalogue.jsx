import React, { useState, useEffect, Suspense } from "react";
import "./Catalogue.css";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard.jsx";
import SearchBar from "./SearchBar.jsx";
import ButtonPlusCategory from "./ButtonPlusCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PageNext from "./PageNext/PageNext.jsx";
import Spinner from "./Spinner";
import {
  getAllProducts,
  getAllCategories,
  getProductsOfCategory,
  getCategoriesOfProduct,
  searchByKeyword,
  deleteProduct,
  updateProduct,
  addCategoryToProduct,
  removeCategoryFromProduct,
} from "../Redux/actions.js";

export default function Catalogue({ checkIfCartIsEmpty }) {
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { allProducts, allCategories } = state;

  //STATES OF PAGINATION
  const [paginaActual, setpaginaActual] = useState(1);
  const [productosPorPagina] = useState(8);
  //traemos lista de productos en base a la categoría que seleccionó el usuario (en estado)
  const renderProducts = () => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  };

  const userActive = JSON.parse(localStorage.getItem("User"));
  if (userActive === null) {
    var userRol = undefined;
  } else {
    var userRol = userActive.rol;
  }
  const reloadPage = () => {
    if (allCategories.length === 0) dispatch(getAllCategories());
    if (category === "") {
      //Si no hay ninguna categoria seleccionada mostrame todos los productos
      dispatch(getAllProducts());
    } else {
      dispatch(getProductsOfCategory(category));
    }
  };

  useEffect(() => {
    reloadPage();
  }, [category]);

  //si hay una categoría seleccionada, buscá los productos asociados al nombre de esta categoría [category]);

  const handleCategory = (e) => {
    setpaginaActual(1);
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(searchByKeyword(searchInput));
  }, [searchInput]);

  const mapProducts = (product) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        allCategories={allCategories}
        deleteProduct={(id) => {
          dispatch(deleteProduct(id)).then(() => reloadPage());
        }}
        updateProduct={(id, data) =>
          dispatch(updateProduct(id, data)).then(() => reloadPage())
        }
        checkIfCartIsEmpty={checkIfCartIsEmpty}
      />
    );
  };
  // RECORTARMOS CANTIDAD DE PRODUCTOS A MOSTRAR
  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
  const productosActuales = allProducts.slice(
    indexPrimerProducto,
    indexUltimoProducto
  );

  // RESET PAGINA ACTUAL
  const nextPage = (num) => setpaginaActual(num);

  // RENDER
  return (
    <Suspense fallback={<Spinner></Spinner>}>
      <div>
        <div>
          <div className="global">
            <div className="category-list">
              <div className="search">
                <div className="searchBar">
                  <SearchBar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                  />
                </div>
                <button
                  className="btn my-2 my-sm-0 text-dark btn-search"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div></div>
              <div className="vertical-menu">
                {
                  <button
                    onClick={() => {
                      setCategory("");
                    }}
                    className="category_item"
                    value="todos"
                  >
                    Todos
                  </button>
                  //botón que muestra la categorías "todos"
                }
                {allCategories &&
                  allCategories.map(({ name, id }) => (
                    <button
                      onClick={handleCategory}
                      className="category_item"
                      key={id}
                      value={name}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </button>
                  ))}
                {userRol === "Admin" && <ButtonPlusCategory />}
              </div>
            </div>
            <div className="products-list">
              {productosActuales.map(mapProducts)}
            </div>
            <div>
              {productosActuales.length === 0 &&
                "No se encontraron productos en esta categoría"}
            </div>
          </div>
        </div>
        <PageNext
          productosPorPagina={productosPorPagina}
          totalProduct={allProducts.length}
          clicked={nextPage}
        />
      </div>
    </Suspense>
  );
}
