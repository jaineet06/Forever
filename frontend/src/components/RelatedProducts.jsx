import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category, subcategory }) => {

  const { products } = useContext(ShopContext);

  const[related, setRelated] = useState([]);

  useEffect(() => {
        let productCpy = products.slice();

        productCpy = productCpy.filter((item) => category === item.category)
        productCpy = productCpy.filter((item) => subcategory === item.subcategory)

        setRelated(productCpy.slice(0, 5))
  },[products])

  return( <div className="my-24">
    <div className='text-center text-3xl py-2'>
        <Title text1={"RELATED"} text2={"PRODUCTS"}/>
    </div>

    <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            related.map((item, index) => (
                <ProductCard key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }
    </div>
  </div>
  )
};

export default RelatedProducts;
