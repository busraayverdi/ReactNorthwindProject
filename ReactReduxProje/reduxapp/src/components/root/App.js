import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";
import Navi from "../navi/Navi";
import { Route, Switch } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    //Parametre saveProduct/:productIddeki gibi : ile verilir
    <Container>
      <Navi />

      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/product" component={Dashboard} />
        <Route path="/saveProduct/:productId" component={AddOrUpdateProduct} />
        <Route path="/saveProduct" component={AddOrUpdateProduct} />
        <Route path="/cart" component={CartDetail} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;
