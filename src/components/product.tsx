import { MouseEventHandler, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { CartItem, type IProduct } from "../types"

interface ProductProps extends IProduct {
    index?: number
    onSetProductIndex?(index: number): void
}

export const Product = ({ id, name, description, availableCount, price, image, index = 0, onSetProductIndex }: ProductProps) => {
    const dispatch = useDispatch()
    const [quantity,setQuantity] = useState(0)
    const quantityRef = useRef<HTMLInputElement>(null);
    const products = useSelector<RootState>(state => state.products.data) as IProduct[];

    const handleAddProduct = () => {
        dispatch({ type: 'carts/add', payload: { product: { id, name, description, price }, quantity: quantityRef.current?.value || 1 }});
        alert(`Dodałem do koszyka nowy produkt`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.target.value))
    }

    return (
        <div className='shop-product'>
          {onSetProductIndex && <button onClick={() => onSetProductIndex?.(index)}><img width={60} height={60} src={image}/></button>}
          <h3>Produkt: {name}</h3>
          <p><b>Opis:</b> {description}</p>
          <span><b>Cena: </b>{price}zł</span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input type="number" onChange={handleChange} min={0} max={products[index].availableCount} defaultValue={1} ref={quantityRef} /><button className="btn-add-cart" onClick={handleAddProduct}>Dodaj do koszyka<img width={20} height={20} src="https://marekxd.publit.io/file/bag-18827632.png"/></button>
          </div>
          <output>Ilość towaru na magazynie: {availableCount - quantity}</output>
        </div>
    )
}