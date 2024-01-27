export interface PlantType {
    id: string | undefined | null
    title: string
    price: number | undefined
    discount: number | undefined
    addedToCart: boolean
    saved: boolean
    img: string
    type: string
    size: string
    productStatus: string
    rate: number | null
}

export interface ProductInCart {
    id: string
    title: string
    img: string
    price: number
    pcs: number
}

export interface addressDataType {
    id: string | undefined | null
    addressName: string
    streetHouse: string
    city: string
    state: string
    country: string
    zip: string
    appartment: string
}

export interface PostType {
    id: string | undefined | null
    date: string
    length: string
    title: string
    text: string
    fullText: string
    img: string
}

export interface PostCareType {
    id: string | undefined | null
    title: string
    text: string
    fullText: string
    img: string
}

export interface PersonalDataType {
    firstName: string
    secondName: string
    password: string
    email: string
    phone: number
}

export interface PersonalAddressType {
    id: string,
    addressName: string
    streetHouse: string
    city: string
    state: string
    country: string
    zip: string
}
