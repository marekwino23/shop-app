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

    // const totalPrice = useSelector<RootState>(state => state.cart.totalPrice) as number;
    const products = useSelector<RootState>(state => state.products.data) as IProduct[];

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