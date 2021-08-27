import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function CreateProduct(props) {
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
        await axios.post(
          "https://60efffcdf587af00179d3c4b.mockapi.io/products",
          { product: values.product, price: values.price }
        );
        SetLoading(false);
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
      history.push("/product");
    },
  });

  return (
    <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
        <h1 class="h3 mb-0 text-gray-800">Create Product</h1>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="col-lg-6">
            <label htmlFor="product">Product </label>
            <input
              id="product"
              type="text"
              className="form-control"
              value={formik.values.product}
              onChange={formik.handleChange}
            />
            {formik.touched.product ? (
              <span className="text-danger">{formik.errors.product}</span>
            ) : null}
            <br />
          </div>

          <div className="col-lg-6">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              className="form-control"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price ? (
              <span className="text-danger">{formik.errors.price}</span>
            ) : null}
            <br />
          </div>

          <div className="col-lg-12 my-2">
            <input
              type="submit"
              value="Submit"
              className="btn-primary"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
