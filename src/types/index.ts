export interface IProduct {
    id: number,
    name: string,
    description: string,
    availableCount: number,
    image: string,
    price: number
}

export interface CartItem extends IProduct {
    quantity: number
}