import {createContext, useContext, useReducer} from 'react'
// import faker from  "./faker";
import { faker } from '@faker-js/faker';
import {CartReducer, productReducer} from "./Reducers"

const Cart = createContext();
faker.seed(123);

const Context = ({children}) => {
    const products = [...Array(20)].map(() => ({
        id: faker.string.uuid(),
        name:faker.commerce.productName(),
        price:faker.commerce.price(),
        image: faker.image.urlPicsumPhotos(),
        // avatar: faker.image.avatar(),
        inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }));
    // console.log(products);

    const [state, Dispatch]= useReducer(CartReducer,{
        products: products,
        Cart:[],
    });

    const [productState,productDispatch]= useReducer(productReducer,{
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: " ",
    })

  return (
    <Cart.Provider value={{state, Dispatch, productState,productDispatch}}>
        {children}
    </Cart.Provider>
  )
}

export default Context;

export const CartState =()=>{
    return useContext(Cart);
}

