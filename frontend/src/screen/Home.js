import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";

export default function Home() {
  const [foodCategory, setFoodcategory] = useState([]);
  const [foodItems, setFooditems] = useState([]);

  const loadData = () => {
    axios
      .get("http://localhost:5000/api/displaydata")
      .then((res) => {
        setFoodcategory(res.data[0]);
        setFooditems(res.data[1]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  // <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

  return (
    <>
      <Navbar />
      <div className="container">
        {foodCategory.length > 0 ? (
          foodCategory.map((data) => {
            // console.log('filterItem----------------------',data)

            return (
              <div key={data._id} className="row">
                <div>{data.categoryName}</div>
                <hr />
                {foodItems.length > 0 ? (
                  foodItems
                    .filter((i) => i.category === data.categoryName)
                    .map((filterItem) => {
                      // console.log('filterItem',filterItem)
                      return (
                        <div key={filterItem._id} className=" col-12 col-md-6 col-lg-3">
                          <Card filterItem={filterItem} />
                        </div>
                      );
                    })
                ) : (
                  <div>no items</div>
                )}
              </div>
            );
          })
        ) : (
          <div>no category found</div>
        )}
      </div>
      <Footer />
    </>
  );
}
