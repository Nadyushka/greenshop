export interface addressDataType {
    id: string | null
    addressName: string
    streetHouse: string
    city: string
    state: string
    country: string
    zip: string
    appartment: string
}

export interface PostType {
    id: string
    date: string
    length: string
    title: string
    text: string
    fullText: string
    img: string
}

export interface PostCareType {
    id: string
    title: string
    text: string
    fullText: string
    img: string
}
