import {
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  GET_CATEGORIES_OF_PRODUCT,
  GET_PRODUCTS_OF_CATEGORY,
  GET_PRODUCT,
  GET_ALL_USERS,
  GET_ONLY_USER,
  ADD_ITEM_TO_GUEST_CART,
  REMOVE_ITEM_FROM_GUEST_CART,
  GET_ALL_ORDERS,
  GET_USER_ORDERS,
  SEARCH_BY_KEYWORD,
  GET_REVIEWS_OF_PRODUCT,
  PROMOTE_USER,
  RESET_PASSWORD,
  CURRENT_USER,
  //RELOAD_CATEGORIES_OF_PRODUCT,
} from "./constants.js";

const initialState = {
  allProducts: [],
  allCategories: [],
  allOrders: [],
  userOrders: [],
  currentCategoriesOfProduct: [],
  currentProduct: {},
  currentCategory: {},
  currentReviewsOfProduct: [],
  allUsers: [],
  onlyUser: {},
  userPromote: {},
  users: [],
  currentUser: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case GET_ALL_CATEGORIES:
      return { ...state, allCategories: action.payload };
    case GET_CATEGORIES_OF_PRODUCT:
      return { ...state, currentCategoriesOfProduct: action.payload };
    case GET_PRODUCTS_OF_CATEGORY:
      return { ...state, allProducts: action.payload };
    case GET_PRODUCT:
      return { ...state, currentProduct: action.payload };
    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case GET_ONLY_USER:
      return { ...state, onlyUser: action.payload };
    case GET_ALL_ORDERS:
      return { ...state, allOrders: action.payload };
    /* case RELOAD_CATEGORIES_OF_PRODUCT:
	  return { ...state, currentCategoriesOfProduct: [] }; */
    case GET_USER_ORDERS:
      return { ...state, userOrders: action.payload };
    case SEARCH_BY_KEYWORD:
      return { ...state, allProducts: action.payload };
    case GET_REVIEWS_OF_PRODUCT:
      return { ...state, currentReviewsOfProduct: action.payload };
    case PROMOTE_USER:
      return { ...state, userPromote: action.payload };
    case RESET_PASSWORD:
      return {
        ...state,
        users: state.users.filter(
          (elemento) => elemento.id !== action.payload.id
        ),
      };
    case CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
