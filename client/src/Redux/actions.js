import Axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES_OF_PRODUCT,
  GET_PRODUCTS_OF_CATEGORY,
  GET_PRODUCT,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_USER,
  UPDATE_PRODUCT,
  UPDATE_CATEGORY,
  SEARCH_BY_KEYWORD,
  ADD_CATEGORY_TO_PRODUCT,
  ADD_CATEGORY_TO_PRODUCT_BY_NAME,
  REMOVE_CATEGORY_FROM_PRODUCT,
  NEW_USERS,
  GET_ALL_USERS,
  GET_ONLY_USER,
  ADD_ITEM_TO_GUEST_CART,
  REMOVE_ITEM_FROM_GUEST_CART,
  USERS,
  GET_ALL_ORDERS,
  GET_USER_ORDERS,
  ADD_ITEM_TO_CART,
  GET_ALL_ITEMS_TO_CART,
  DELETE_ITEM_FROM_CART,
  MODIFY_QUANTITY_ITEM,
  CREATE_REVIEW,
  GET_REVIEWS_OF_PRODUCT,
  PROMOTE_USER,
  RESET_PASSWORD,
  EMPTY_CART,
  DELETE_REVIEW,
  GET_ALL_QUESTION,
  GET_PRODUCT_OF_ANSWER,
} from "./constants.js";

//trae todos los productos
export function getAllProducts() {
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/products/`)
      .then((res) => {
        dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
      })

      .catch((error) => console.log(error));
  };
}

//trae todas las categorías
export function getAllCategories() {
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/products/api/category/`)
      .then((res) => {
        dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
}

//trae las categorías asociadas a un producto en particular
export function getCategoriesOfProduct(nombreProducto) {
  return function (dispatch) {
    return Axios.get(
      `${process.env.REACT_APP_API_URL}/products/categoriesof/${nombreProducto}`
    )
      .then((res) => {
        dispatch({
          type: GET_CATEGORIES_OF_PRODUCT,
          payload: res.data[0].categories,
        });
      })
      .catch((error) => console.log(error));
  };
}

//trae los productos asociados a una categoría en particular

export function getProductsOfCategory(nombreCategoria) {
  return function (dispatch) {
    return Axios.get(
      `${process.env.REACT_APP_API_URL}/products/category/${nombreCategoria}`
    )
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS_OF_CATEGORY,
          payload: res.data[0].products,
        });
      })
      .catch((error) => console.log(error));
  };
}

//trae los datos de un producto en particular ("ver más")
export function getProduct(id, notDispatch) {
  if (notDispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/products/` + id)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/products/` + id)
      .then((res) => {
        dispatch({ type: GET_PRODUCT, payload: res.data });
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

//crea categoría
export function createCategory(data) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/products/category`,
      data
    )
      .then((payload) => {
        dispatch({ type: CREATE_CATEGORY, payload });
      })
      .catch((err) => alert(`${err}`));
  };
}

//modifica categoría
export function modifyCategory(id, data) {
  return function (dispatch) {
    return Axios.put(
      `${process.env.REACT_APP_API_URL}/products/category/` + id,
      data
    )
      .then((payload) => {
        dispatch({ type: UPDATE_CATEGORY, payload });
      })
      .catch((error) => console.log(error));
  };
}
//borra categoría
export function deleteCategory(id) {
  return function (dispatch) {
    return Axios.delete(
      `${process.env.REACT_APP_API_URL}/products/category/` + id
    )
      .then((payload) => {
        dispatch({ type: DELETE_CATEGORY, payload });
      })
      .catch((error) => console.log(error));
  };
}

//crea nuevo producto
export function createProduct(data) {
  return function (dispatch) {
    return Axios.post(`${process.env.REACT_APP_API_URL}/products`, data)
      .then((payload) => {
        dispatch({ type: CREATE_PRODUCT, payload });
      })
      .catch((err) => alert(`${err}`));
  };
}

//borra producto
export function deleteProduct(id) {
  return function (dispatch) {
    return Axios.delete(`${process.env.REACT_APP_API_URL}/products/` + id)
      .then((payload) => {
        dispatch({ type: DELETE_PRODUCT, payload });
      })
      .catch((error) => console.log(error));
  };
}

//modifica( producto)
export function updateProduct(id, data) {
  return function (dispatch) {
    return Axios.put(`${process.env.REACT_APP_API_URL}/products/` + id, data)
      .then((payload) => {
        dispatch({ type: UPDATE_PRODUCT, payload });
      })
      .catch((error) => console.log(error));
  };
}

//trae los resultados de una búsqueda por substring (search bar)

export function searchByKeyword(searchInput) {
  return function (dispatch) {
    return Axios.get(
      process.env.REACT_APP_API_URL + "/products/search?search=" + searchInput
    )
      .then((res) => {
        dispatch({ type: SEARCH_BY_KEYWORD, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

//agrega asociación entre producto y categoría

export function addCategoryToProduct(productID, categoryID) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/products/${productID}/category/${categoryID}`
    ).then((payload) => {
      dispatch({ type: ADD_CATEGORY_TO_PRODUCT, payload });
    });
  };
}

export function addCategoryToProductByName(productName, categoryID) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/products/${productName}/addcategory/${categoryID}`
    ).then((payload) => {
      dispatch({ type: ADD_CATEGORY_TO_PRODUCT_BY_NAME, payload });
    });
  };
}

//borra asociación entre producto y categoría
export function removeCategoryFromProduct(productID, categoryID) {
  return function (dispatch) {
    return Axios.delete(
      `${process.env.REACT_APP_API_URL}/products/${productID}/category/${categoryID}`
    )
      .then((payload) => {
        dispatch({ type: REMOVE_CATEGORY_FROM_PRODUCT, payload });
      })
      .catch((err) => alert(`${err}`));
  };
}
// GET All USERS (FIND ALL USERS)
export function getAllUsers() {
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/users/`, {
      withCredentials: true,
    })
      .then((payload) => {
        dispatch({ type: GET_ALL_USERS, payload: payload.data });
      })
      .catch((err) => alert(`${err}`));
  };
}
// GET ONLY USER
export function getOnlyUser(id) {
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      withCredentials: true,
    })
      .then((payload) => {
        dispatch({ type: GET_ONLY_USER, payload: payload.data });
      })
      .catch((err) => alert(`${err}`));
  };
}
// POST A USER (CREATE NEW USER)
export function createNewUser(data) {
  return function (dispatch) {
    return Axios.post(`${process.env.REACT_APP_API_URL}/users`, data)
      .then((payload) => {
        dispatch({ type: NEW_USERS, payload });
        dispatch(getAllUsers());
      })
      .catch((err) => alert(`${err}`));
  };
}
//borra user
export function deleteUser(id) {
  return function (dispatch) {
    return Axios.delete(`${process.env.REACT_APP_API_URL}/users/` + id, {
      withCredentials: true,
    })
      .then((payload) => {
        dispatch({ type: DELETE_USER, payload });
        dispatch(getAllUsers());
      })
      .catch((error) => alert(`${error}`));
  };
}

// export function createUser(data) {
// 	return function (dispatch) {
// 		return Axios.post(`${process.env.REACT_APP_API_URL}users`, data)
// 			.then((payload) => {
// 				dispatch({ type: USERS, payload });
// 				dispatch(getAllUsers());
// 			})
// 			.catch((err) => alert(`${err}`));
// 	};
// }

/* export function reloadCategoriesOfProduct() {
  return function (dispatch) {
    dispatch({ type: RELOAD_CATEGORIES_OF_PRODUCT });
  };
}
 */

// ---------------CARRITO---------------------

export function getAllOrders(status) {
  return function (dispatch) {
    return Axios.get(
      `${process.env.REACT_APP_API_URL}/orders/status?status=` + status
    )
      .then((res) => {
        dispatch({ type: GET_ALL_ORDERS, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
}
export function getUserOrders(id) {
  return function (dispatch) {
    return Axios.get(
      `${process.env.REACT_APP_API_URL}/orders/users/${id}/orders`
    )
      .then((payload) => {
        dispatch({ type: GET_USER_ORDERS, payload: payload.data });
        return payload.data;
      })
      .catch((error) => console.log(error));
  };
}

//ADD_ITEMS_TO_CART,
export function addItemToCart(idUser, product) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/users/${idUser}/cart`,
      product
    )
      .then((payload) => {
        dispatch({ type: ADD_ITEM_TO_CART, payload: payload });
      })
      .catch((error) => console.log(error));
  };
}
//GET_ALL_ITEMS_TO_CART,
export function getAllItemsToCart(idUser) {
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/users/${idUser}/cart`)
      .then((res) => {
        dispatch({ type: GET_ALL_ITEMS_TO_CART, payload: res.data });
        return res.data;
      })
      .catch((error) => console.log(error));
  };
}
//DELETE_ITEM_TO_CART,
export function deleteItemFromCart(idUser, idProduct) {
  return function (dispatch) {
    return Axios.delete(
      `${process.env.REACT_APP_API_URL}/users/${idUser}/cart/${idProduct}`
    )
      .then((payload) => {
        dispatch({ type: DELETE_ITEM_FROM_CART, payload: payload.data });
        return payload.data;
      })
      .catch((error) => console.log(error));
  };
}
//DELETE_ALL_ITEMS
export function emptyCart(idUser) {
  return function (dispatch) {
    return Axios.delete(
      `${process.env.REACT_APP_API_URL}/users/${idUser}/cart`,
      {
        withCredentials: true,
      }
    )
      .then((payload) => {
        dispatch({ type: EMPTY_CART, payload });
      })
      .catch((error) => alert(`${error}`));
  };
}
//MODIFY_QUANTITY_ITEM,
export function modifyQuantityItem(idUser) {
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/users/${idUser}/cart`)
      .then((payload) => {
        dispatch({ type: MODIFY_QUANTITY_ITEM, payload: payload.data });
        return payload.data;
      })
      .catch((error) => console.log(error));
  };
}

/* export function sendTempCartToDatabase(idUser) {
  let tempCart = JSON.parse(localStorage.getItem("Product"));

  let ordersCreadas = [];

  dispatch(getUserOrders(idUser)).then((orders) => {
    ordersCreadas = orders.filter((order) => order.status === "creado");

    for (const prop in tempCart) {
      let product = {
        productId: prop,
        price: tempCart[prop].price,
        quantity: tempCart[prop].quantity,
      };

      dispatch(addItemToUserCart(idUser, product));
      return;
    }
  });
} */

// ---------------Review---------------------

export function createReview(id, data) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/products/${id}/review`,
      data
    )
      .then((payload) => {
        dispatch({ type: CREATE_REVIEW, payload });
      })
      .catch((err) => alert(`${err}`));
  };
}

export function getReviewsOfProduct(idProduct, notDispatch) {
  if (notDispatch) {
    return Axios.get(
      `${process.env.REACT_APP_API_URL}/products/${idProduct}/review`
    )
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
  return function (dispatch) {
    return Axios.get(
      `${process.env.REACT_APP_API_URL}/products/${idProduct}/review `
    )
      .then((res) => {
        dispatch({ type: GET_REVIEWS_OF_PRODUCT, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteReview(id, idReview) {
  return function (dispatch) {
    return Axios.delete(
      `${process.env.REACT_APP_API_URL}/products/${id}/review/${idReview}`
    )
      .then((payload) => {
        dispatch({ type: DELETE_REVIEW, payload });
      })
      .catch((err) => alert(`${err}`));
  };
}

/* export function resetPassword(id, input) {
  return function (dispatch) {
    return Axios.put(`${process.env.REACT_APP_API_URL}/users/${id}/newpass`, input)
      
      .then((data) => {
        dispatch({ tyoe: RESET_PASSWORD, payload: data });
        console.log('todo ok')
      })
      .then(() => alert("la contraseña fue reseteada"))
      .catch((error) => console.log(error.message));
  };
} */
//------------------Promote--------------------------------------

export function promoteUser(id, userr) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/auth/promote/${id}`,
      userr,
      {
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: {
          user: userr,
        },
        withCredentials: true,
      }
    )
      .then((payload) => {
        dispatch({ type: PROMOTE_USER, payload });
      })
      .catch((err) => alert(`${err}`));
  };
}

//--------------------------Question------------------------------

export function getAllQuestions(notDispatch) {
  if (notDispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/question/`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }
  return function (dispatch) {
    return Axios.get(`${process.env.REACT_APP_API_URL}/question/`)
      .then((res) => {
        dispatch({ type: GET_ALL_QUESTION, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
}

export function getProductsOfAnswer(id, body) {
  return function (dispatch) {
    return Axios.post(
      `${process.env.REACT_APP_API_URL}/question/answer/` + id,
      body
    )
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  };
}
