import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = () => {
    const userEmail = localStorage.getItem("userEmail");
    axios
      .post("http://localhost:5000/checkout/myorder", { email: userEmail })
      .then((res) => {
        if (res.data.error) {
          setOrderData("");
        } else {
          setOrderData(res.data.orderFoods);
          // console.log("order-data", res.data);
        }
      })
      .catch((err) => console.log("error"));
  };

  useEffect(() => {
    loadOrderData();
  }, []);
  // console.log("forcheck", orderData);
  if (orderData.length===0) {
    return (
      <div>
        <Navbar />
        <div style={{flex:1,minHeight:'70vh'}} className="mt-5 w-100 text-center fs-3">MyOrder is Empty!</div>
        <Footer/>
      </div>
    );
  } else {
    return (
      <>
        <Navbar />

        <div className="container" style={{ flex: 1, minHeight: "75vh" }}>
          <div className="row">
            {orderData.map((data) => {
              
              // console.log("data",data);
              return data.map((item) => {
                return (
                  <div key={data._id}>
                    {item.orderDate ? (
                      <div>
                        <hr />
                        {item.orderDate}
                      </div>
                    ) : (
                      <div>
                        <div className="card " style={{ width: "16rem", maxHeight: "360px" }}>
                          <div className="card-header">{item.name}</div>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">Quantity:{item.quantity}</li>
                            <li className="list-group-item">Price :{item.price}</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </div>
        </div>

        <Footer />
      </>
    );
  }
}
