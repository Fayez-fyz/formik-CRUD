import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductContext from "./ProductContext";

export default function Product() {
  const productContext = useContext(ProductContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      let product = await axios.get(
        "https://60efffcdf587af00179d3c4b.mockapi.io/products"
      );
      productContext.setProductList([...product.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  let handleDelete = async (id) => {
    let confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        await axios.delete(
          `https://60efffcdf587af00179d3c4b.mockapi.io/products/${id}`
        );
        let rowIndex = productContext.productList.findIndex(
          (obj) => obj.id == id
        );
        productContext.productList.splice(rowIndex, 1);
        productContext.setProductList([...productContext.productList]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 class="h3 mb-2 text-gray-800 my-4">Product</h1>

      <Link
        to="/create-product"
        href="#"
        class="d-none d-sm-inline-block btn btn-sm btn-outline-primary shadow-sm my-2 "
      >
        <i class="fas fa-download fa-sm text--50 "></i> Create Product
      </Link>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Table</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            {isLoading ? (
              <h3> Loading...</h3>
            ) : (
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {productContext.productList.map((obj, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{obj.product}</td>
                        <td>{obj.price}</td>

                        <td>
                          <Link
                            to={`/product/edit/${obj.id}`}
                            className=" btn-sm btn-primary mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              handleDelete(obj.id);
                            }}
                            className=" btn-sm btn-danger mx-1"
                          >
                            {" "}
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
