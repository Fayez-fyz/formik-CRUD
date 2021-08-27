import "./App.css";
import DashBoard from "./DashBoard";

import Product from "./Product";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import ProductContext, { ProductProvider } from "./ProductContext";
import TopBar from "./TopBar";

function App() {
  return (
    <>
      <Router>
        <div id="wrapper">
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <TopBar />
              <div class="container-fluid">
                <Switch>
                  <ProductProvider>
                    <Route path="/" component={DashBoard} exact={true} />
                    <Route path="/product" component={Product} exact={true} />
                    <Route
                      path="/create-product"
                      component={CreateProduct}
                      exact={true}
                    />
                    <Route
                      path="/product/edit/:id"
                      component={EditProduct}
                      exact={true}
                    />
                  </ProductProvider>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
