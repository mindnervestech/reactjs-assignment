import { store } from "./redux/store/store";


export const Products = [
    {
        name: "Bread",
        id: "brd",
        price: 1.1
    },
    {
        name: "Milk",
        id: "mlk",
        price: 0.5
    },
    {
        name: "Cheese",
        id: "chs",
        price: 0.9
    },
    {
        name: "Soup",
        id: "soup",
        price: 0.6
    },
    {
        name: "Butter",
        id: "btr",
        price: 1.2
    }
]


export const getOffer = (item) => {
    let { cart } = store.getState().appReducer;
    switch(item.id){
        case "btr" : 
        return parseFloat(item.qty * item.price / 3).toFixed(2);
        case "chs" : 
        return item.qty > 1 ? parseFloat(parseInt(item.qty/ 2) * item.price).toFixed(2) : false;
        case "brd" : 
            return cart && cart.find( ({ id }) => id === "soup" ) !== undefined ? parseFloat(item.price / 2).toFixed(2) : false;
        default:
        return false
    }
}