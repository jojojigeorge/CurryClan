import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Navbar from "../components/Navbar";
// import axios form('axios')
import axios from "axios";
import Footer from "../components/Footer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  // if (data.length === 0) {
  //     return (
  //         <div>
  //             <Navbar />
  //             <div className='mt-5 w-100 text-center fs-3'>The Cart is Empty!</div>
  //         </div>
  //     )
  // }

  const handleCheckout = () => {
    let userEmail = localStorage.getItem("userEmail");
    axios
      .post("http://localhost:5000/checkout", { email: userEmail, cartData: data, orderDate: new Date().toDateString() })
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: "DROP" });
        }
      })
      .catch((err) => console.log(err));
  };

  let totalPrice = data.reduce((total, food) => total + parseInt(food.price), 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      {data.length > 0 ? (
        <div className="py-5" style={{ flex: 1 }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 ">
                <div className="card shadow">
                  <div className="card-body cartdiv ">
                    <div className="container col-md-11">
                      <div className="fs-4 text-center p-3 mb-4">My Cart</div>
                    </div>
                    <table className="table text-center container">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((food, index) => (
                          <tr key={food.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.quantity}</td>
                            <td>{food.price}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                  dispatch({ type: "REMOVE", index: index });
                                }}
                                className="btn p-0"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>{" "}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div>
                      <h1 className="fs-4">Total Price: {totalPrice}/-</h1>
                    </div>
                    <div>
                      <button
                        className="btn bg-success mt-2 text-white "
                        onClick={() => {
                          handleCheckout();
                        }}
                      >
                        {" "}
                        Check Out{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ flex: 1, minHeight: "70vh" }} className="mt-5 w-100 text-center fs-3">
            The Cart is Empty!
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
