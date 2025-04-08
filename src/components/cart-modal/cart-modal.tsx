import { forwardRef, MouseEvent, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { changeQuantity, clearAll, decrement, increment, remove } from "../../store/cart"
import { CartItem, IProduct } from "../../types"
import { Modal } from "../modal"
import './cart-modal.css';


export const CartModal = forwardRef<HTMLDialogElement, Record<string, unknown>>((_, ref) => {

    const items = useSelector<RootState>(state => state.cart.items) as CartItem[];
    // const totalPrice = useSelector<RootState>(state => state.cart.totalPrice) as number;
    const products = useSelector<RootState>(state => state.products.data) as IProduct[];
    const dispatch = useDispatch();

    const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);

    const isQuantityLessAvailable = (index: number) => {
        return items[index].quantity < products[index].availableCount
    }

    const handleDecrement = (id: number, index: number, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(decrement(id));
    }

    const handleClearAll = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(clearAll());
    }

    const handleDeleteProduct = (id: number, index: number, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(remove(id));
    }

    const handleQuantityChange = (id: number, index: number, value: string) => {
        console.log('value: ', value);
        if (isQuantityLessAvailable(index)) {
            dispatch(changeQuantity({ id, value: Number(value)}  ));
        }
    }

    const handleIncrement = (id: number, index: number, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isQuantityLessAvailable(index)) {
            dispatch(increment(id));
        }
    }

    return (
        <Modal>
            <dialog id="cart-modal" ref={ref}>
                <div role="dialog-header"> Zawartość Koszyka: </div>
                <ul>
                    {items.length > 0 && items.map((item, index) => (
                        <li key={item.id}>
                            {item.name}
                            <p>{item.description}</p>
                            <div>{item.price}</div>
                            <div>
                                <button onClick={(e) => handleDecrement(item.id, index, e)}>-</button>
                                <input type="number" min={0} max={products[index].availableCount} value={item.quantity} onChange={(e) => handleQuantityChange(item.id, index, e.target.value)} />
                                <button onClick={(e) => handleIncrement(item.id, index, e)} disabled={!isQuantityLessAvailable(index)}>+</button>
                            </div>
                            <button onClick={(e) => handleDeleteProduct(item.id, index, e)}>Usuń produkt</button>
                        </li>
                    ))}
                </ul>
                <div className="clear-cart-modal">
                <output>Suma: {totalPrice}</output>
                <button onClick={handleClearAll}>Wyczyść wszystko</button>
                </div>
            </dialog>
        </Modal>
    )
});