import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import mockData from "./mockData";
import { RootState } from "./store"
import { load } from "./store/products"
import { IProduct } from "./types"

const fakeFetchData = () => {
    return new Promise(resolve => {
    setTimeout(() => resolve(mockData), 3000);
    });
}

export const useFetchProducts = () => {
    const [isLoading, setLoading] = useState(true);
    const data = useSelector<RootState>(store => store.products.data) as IProduct[];
    const dispatch = useDispatch();
    useEffect(() => {
        if (data.length ===mockData.length) {
            return;
        }
        fakeFetchData()
            .then(mockData => {
                dispatch(load(mockData as IProduct[]))
            })
            .catch(error => {
                console.error('error: ', error);
            }).finally(() => {
                setLoading(false);
            })
    }, []);

    return { isLoading, data: data as IProduct[] };
}