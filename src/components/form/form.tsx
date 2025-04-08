import { FormEvent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { add, load } from "../../store/products"
import { IProduct } from "../../types"
import { useForm } from 'react-hook-form';

export const Form = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm();
    const products = useSelector<RootState>(state => state.products.data) as IProduct[];
    useEffect(() => {
        dispatch(load(products))
    },[])
    const dispatch = useDispatch();
    const handleAddProduct = () => {
        const data = getValues() 
        dispatch(add({ id: products.length, name: data.name, description: data.desc, availableCount: data.stockNumber, image: '', price: data.price }))
    }
    return(
        <div className="product-form-container">
         <form className="product-form">
            <label className="product-form-label">Nazwa produktu
                <input {...register('name')} type="text" placeholder="Wpisz nowy produkt"/>
            </label>
            <label className="product-form-label">Opis produktu
                <input {...register('desc')} type="text" placeholder="Wpisz opis produktu"/>
            </label> 
            <label className="product-form-label">Stan magazynowy
                <input {...register('stockNumber')} type="number" placeholder="Wpisz ilość produktów na magazynie"/>
            </label>
            <label className="product-form-label">Obrazek
                <input {...register('image')} type="text" placeholder="Wpisz ilość produktów na magazynie"/>
            </label> 
            <label className="product-form-label">Cena
                <input {...register('price')} type="number" placeholder="Wpisz cene produktu"/>
            </label> 
        </form>   
        <button onClick={handleAddProduct} className="product-form-btn">Dodaj produkt</button>
        </div>
    )
}