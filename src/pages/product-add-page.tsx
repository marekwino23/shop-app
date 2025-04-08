import { Link } from 'react-router-dom'
import { ProductForm } from './../components/product-form'

function ProductAddPage() {
  
  return (
    <div className="App">
    <ProductForm/>
    <Link to="/">Powrót do listy produktów</Link>
    </div>
  );
}

export default ProductAddPage;
