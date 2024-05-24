import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwiaWF0IjoxNjc2NDkzNTI4fQ.VNWQDQJM9jDXrGofVLk3brpqlcNwFzjDmLLwfP9Rw4TM20IIuayvzubPJPfrkJb4kcRAUchdg7uy36rf9z-n9eLdcCw6FQLBBP7t0IA0NhFwjc0NjsJ50zUFgqPi8TAeVclD3DpjEoIRGbSrJpeVIBnLy6DeY7NcugJRbzKpW7iVq9WR9hO-mJ9n01zzEs3xJZ9Kyvq0dir680qPAtEdqLIvPstK8tDRNoYwcZXUthxSoDEAf-sp-E1qbuVv1WDlNpmBncWcUKFUgxeAuoFKRaYOy-9xrATE33C3wUW26Q9nUWJjDHiDw_Oe695P1UpTsKntGAWI_ECytTZhlA_pug";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const getProducts = async () => {
    try {
      const res = await axios.get("/products");
      console.log(res.data);
      setProducts(res.data);
      setTotal(res.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClick = async (id) => {
    const res = await axios.delete(`/products/${id}`);
    console.log(res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
  };
  const handlePage = async (page) => {
    const res = await axios.get("/products?page=" + page);
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {Array(Math.ceil(total / 4))
        .fill(0)
        .map((e, i) => (
          <button onClick={() => handlePage(i + 1)}>{i + 1}</button>
        ))}
      {products.map((product, index) => (
        <Product {...product} key={index} handleClick={handleClick}></Product>
      ))}
    </>
  );
};

export default ProductList;
