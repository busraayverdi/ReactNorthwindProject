import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
function AddOrUpdateProduct({
  products,
  categories,
  getProduct,
  getCategories,
  saveProduct,
  history,
  ...props //mevcut componentin proplarına yukarıdakileri de ekleriz yani genişletiriz.
}) {
  const [product, setProduct] = useState({ ...props.product });
  //State deki productı setProduct fonk ile set edebilirim
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product }); //state deki product nesnesini set etmiş olduk
  }, [props.product]);

  function handleChange(event) {
    //event yardımı ile data doldurulur
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
      //yukarıda önceki product ın name değeri kontrol edilip gerekli çevrimler yapılır
    }));
    validate(name,value);
    
  }

  function validate(name,value){
if (name==="productName"&&value==="") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün ismi olmalıdır!!",
      }));
     
    }
    else{
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "",
      }));
    }

  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/"); //daha önce geldiğimiz sayfalara yönlendirme yapar.(history)
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  //kendi propsları
  const productId = ownProps.match.params.productId; //parametrelere bak ve productId yi çek
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};

  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}
const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
