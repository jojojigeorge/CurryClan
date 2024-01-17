import React from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  // let one='frontend/src/images/one.png';
  let data = useCart();
  let dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    let itemAlredyInCart = false;
    for (const item of data) {
      if (item.id === props.filterItem._id) {
        itemAlredyInCart = true;
        break;
      }
    }
    if (itemAlredyInCart) {
      //item is alredy in the cart
      await dispatch({
        type: "UPDATE",
        id: props.filterItem._id,
        price: props.filterItem.price,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.filterItem._id,
        name: props.filterItem.name,
        quantity: 1,
        price: props.filterItem.price,
      });
    }
  };

  return (
    <>
      <div className="card col-md-3 p-2 " style={{ width: "16rem" }}>
        <div className="my-auto ">
          <a className="removeTextdecoration" href="/">
            {" "}
          </a>
          <img className="card-img-top " style={{ objectFit: "cover" }} src={"images/" + props.filterItem._id + ".png"} height="120px" alt="" />
          <div className=" mt-1 myblackcolor ">
            <h6 className="text-center">{props.filterItem.name}</h6>

            <h6 className="text-center">{props.filterItem.price}/-</h6>
          </div>

          <div className="row m-1">
            <button type="" className="btn btn-info text-white" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
