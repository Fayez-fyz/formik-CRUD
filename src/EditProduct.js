import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


export default function EditProduct(props) {
  const history = useHistory();
  const [isLoading, SetLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      product: "",
      price: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.product) {
        errors.product = "Required";
      }
      if (!values.price) {
        errors.price = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        SetLoading(true);
        await axios.put(
          `https://60efffcdf587af00179d3c4b.mockapi.io/products/${props.match.params.id}`,
          { product: values.product, price: values.price }
        );
        SetLoading(false);
        history.push("/product");
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
      history.push("/product");
    },
  });

  useEffect(async () => {
    try {
      let product = await axios.get(
        `https://60efffcdf587af00179d3c4b.mockapi.io/products/${props.match.params.id}`
      );
      formik.setFieldValue("product", product.data.product);
      formik.setFieldValue("price", product.data.price);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4 my-4">
        <h1 class="h3 mb-0 text-gray-800">Edit Product</h1>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="col-lg-6">
            <label htmlFor="product">Product </label>
            <input
              id="product"
              name="product"
              type="text"
              className="form-control"
              value={formik.values.product}
              onChange={formik.handleChange}
            />
            {formik.errors.product ? (
              <span className="text-danger">{formik.errors.product}</span>
            ) : null}
          </div>
          <div className="col-lg-6">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              step="any"
              className="form-control"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price ? (
              <span className="text-danger">{formik.errors.price}</span>
            ) : null}
          </div>

          <div className="col-lg-12 my-2">
            <input
              type="submit"
              value="Update"
              className="btn-primary "
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
