import { useMemo, useRef, useState } from "react"
import { useFetchProducts } from "../useFetchProducts"
import { Pagination } from "../components/pagination/pagination"
import { Product } from "../components/product"
import { ProductModal } from "../components/product-modal/product-modal"
import { Link } from "react-router-dom"
import './home.css';

const PER_PAGE= 3;

const Home = () => {
    const { data = [], isLoading } = useFetchProducts();
    const productModalRef = useRef<HTMLDialogElement>(null);
    const [page, setPage] = useState(1);
    const [productPreviewIndex, setProductPreviewIndex] = useState(-1);
    const slicedData = useMemo(() => data.slice((page - 1) * PER_PAGE, page * PER_PAGE), [data, page]);
    const onSetProductIndex = (index = 0) => {
        setProductPreviewIndex(index);
        productModalRef.current?.showModal();
      }
    
      const updatePage = (pageNum: number) => {
        setPage(pageNum);
      }
      
      return(
        <div className='App-shop'>
          <Link to="/product">Dodaj Produkt</Link>
          <div className="grid">
          {slicedData.length > 0 && slicedData.map((product, index) => (
      <Product key={product.id} index={index} {...product} onSetProductIndex={onSetProductIndex} />
    ))}
    <ProductModal ref={productModalRef} productPreviewIndex={productPreviewIndex} />
    {/* {isLoading && <div>loading...</div>} */}
          </div>
          <Pagination count={data.length} perPage={PER_PAGE} page={page} updatePage={updatePage} />
  </div>
      )
}

export default Home;