import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"OUR"} text2={"BESTSELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md-text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, hic?
          Voluptatum quo quam necessitatibus doloribus, repellendus iure eius
          deserunt. Voluptatem dicta quibusdam sit repellat nisi! Odio et
          assumenda eaque doloribus?
        </p>
      </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestseller.map((item, index) => (
                    <ProductCard key={index} id={item._id} image={item.image} price={item.price} name={item.name}/>
                ))
            }
        </div>

    </div>
  );
};

export default BestSeller;
