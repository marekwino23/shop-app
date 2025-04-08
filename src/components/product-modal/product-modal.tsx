import { forwardRef, MouseEvent, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { changeQuantity, clearAll, decrement, increment } from "../../store/cart"
import { CartItem, IProduct } from "../../types"
import { Modal } from "../modal"
import { Product } from "../product"
import './product-modal.css';

interface ProductModalProps {
    productPreviewIndex: number
}


export const ProductModal = forwardRef<HTMLDialogElement, ProductModalProps>(({ productPreviewIndex}, ref) => {

    const items = useSelector<RootState>(state => state.cart.items) as CartItem[];
    // const totalPrice = useSelector<RootState>(state => state.cart.totalPrice) as number;
    const products = useSelector<RootState>(state => state.products.data) as IProduct[];
    const dispatch = useDispatch();

    const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);

    const isQuantityLessAvailable = (index: number) => {
        return items[index].quantity < products[index].availableCount
    }

    // const handleDecrement = (id: number, index: number, e: MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dispatch(decrement(id));
    // }

    // const handleClearAll = (e: MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dispatch(clearAll());
    // }

    // const handleQuantityChange = (id: number, index: number, value: string) => {
    //     console.log('value: ', value);
    //     if (isQuantityLessAvailable(index)) {
    //         dispatch(changeQuantity({ id, value: Number(value)}  ));
    //     }
    // }

    // const handleIncrement = (id: number, index: number, e: MouseEvent) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if (isQuantityLessAvailable(index)) {
    //         dispatch(increment(id));
    //     }
    // }

    return (
        <Modal>
            <dialog id="product-modal" ref={ref}>
                {productPreviewIndex > -1 && (
                <>
                <div role="dialog-header"> Podgląd produktu </div>
                <Product {...products[productPreviewIndex]} />
                </>
                )}
            </dialog>
        </Modal>
    )
});