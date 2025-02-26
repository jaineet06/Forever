import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [img, setImg] = useState("");
  const [size, setSize] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false); // For transition

  const fetchData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setIsTransitioning(true); // Start transition
      setTimeout(() => {
        setProductData(product);
        setImg(product.image[0]);
        setSize("");
        setIsTransitioning(false); // End transition
      }, 500); // Duration of the fade-out
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId, products]);

  return productData ? (
    <div
      className={`border-t-2 pt-10 transition-opacity ease-in duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImg(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={img} alt="" />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium mt-2 text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>SELECT SIZE</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700" onClick={() => addToCart(productData._id, size)}>
            ADD TO CART
          </button>
          <hr className="mt-5 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash On Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border py-3 px-5 text-sm">DESCRIPTION</b>
          <p className="border py-3 px-5 text-sm">REVIEWS</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint
            veniam tenetur minus voluptas accusamus enim odit quibusdam culpa.
            Totam ipsa, natus sit eos necessitatibus porro eveniet cupiditate
            quaerat aut dolorem culpa corrupti velit illo voluptatibus
            corporis. Quod laboriosam, saepe animi, hic mollitia labore,
            accusamus voluptates nulla similique architecto soluta quos!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
            est ducimus incidunt veritatis nisi molestias excepturi? Distinctio
            fugit nisi aspernatur dolores, necessitatibus est pariatur earum.
            Quasi ea beatae distinctio aperiam.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subcategory={productData.subcategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
