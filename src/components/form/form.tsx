import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { add, load } from "../../store/products"
import { IProduct } from "../../types"
import { useForm } from 'react-hook-form';
import './form.css';

export const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IProduct>();
    const products = useSelector<RootState>(state => state.products.data) as IProduct[];
    useEffect(() => {
        dispatch(load(products))
    },[])
    const dispatch = useDispatch();
    const handleAddProduct = (data : IProduct) => {
        dispatch(add({ id: products.length, name: data.name, description: data.description, availableCount: data.availableCount, image: '', price: data.price }))
    }
    return(
        <div className="product-form-container">
            <h2>Dodaj produkt</h2>
         <form className="product-form" onSubmit={handleSubmit(handleAddProduct)}>
            <label className="product-form-label">Nazwa produktu
                <input {...register('name')} type="text" placeholder="Wpisz nowy produkt"/>
            </label>
            <label className="product-form-label">Opis produktu
                <input {...register('description')} type="text" placeholder="Wpisz opis produktu"/>
            </label> 
            <label className="product-form-label">Stan magazynowy
                <input {...register('availableCount')} type="number" placeholder="Wpisz ilość produktów na magazynie"/>
            </label>
            <label className="product-form-label">Obrazek
                <input {...register('image')} type="text" placeholder="Wpisz ilość produktów na magazynie"/>
            </label> 
            <label className="product-form-label">Cena
                <input {...register('price')} type="number" placeholder="Wpisz cene produktu"/>
            </label> 
            <button className="product-form-btn">Dodaj produkt</button>
        </form>   
        </div>
    )
}