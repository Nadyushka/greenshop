import {defineStore} from 'pinia'
import type {PlantType, PostCareType, PostType, ProductInCart} from "~/utils/types";

export const usePlantsStore = defineStore('plants', {
    state: () => {
        return {
            currentPage: 1 as number,
            limit: 9 as number,
            plantType: null as null | string,
            minPrice: 0 as null | number,
            maxPrice: 100000 as null | number,
            size: null as null | string,
            productStatus: null as null | string,
            plantTitle: null as null | string,
            paymentMethodId: 1,
            paymentMethods: [
                {
                    id: 1,
                    title: 'Card',
                },
                {
                    id: 2,
                    title: 'Direct bank transfer',
                },
                {
                    id: 3,
                    title: 'Cash on delivery',
                }
            ],
            cartItemsData: [
                {
                    id: '1',
                    title: 'Barberton Daisy',
                    img: 'plant_one.png',
                    price: 119,
                    pcs: 2,
                },
                {
                    id: '2',
                    title: 'Angel Wing Begonia',
                    img: 'plant_two.png',
                    price: 169,
                    pcs: 3,
                },
                {
                    id: '4',
                    title: 'Bird\'s Nest Fern',
                    price: 179,
                    pcs: 1,
                    img: 'plant_four.png',
                }
            ] as ProductInCart[],
            plantCareData: [
                {
                    id: '1',
                    title: 'Summer cactus & succulents',
                    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
                    img: 'main_care-one.png',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    id: '2',
                    title: 'Styling Trends & much more',
                    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
                    img: 'main_care-two.png',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    id: '3',
                    title: 'Styling Trends & much more',
                    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
                    img: 'main_care-two.png',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    id: '4',
                    title: 'Summer cactus & succulents',
                    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
                    img: 'main_care-one.png',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
            ] as PostCareType[],
            blogPostsData: [
                {
                    id: '1',
                    date: 'September 12',
                    length: 'Read in 6 minutes',
                    img: 'main__post-one.png',
                    title: 'Cactus & Succulent Care Tips',
                    text: 'Cacti are succulents are easy care plants for any home or patio.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '2',
                    date: 'September 13',
                    length: 'Read in 2 minutes',
                    img: 'main__post-two.png',
                    title: 'Top 10 Succulents for Your Home',
                    text: 'Best in hanging baskets. Prefers medium to high light.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '3',
                    date: 'September 15',
                    length: 'Read in 3 minutes',
                    img: 'main__post-three.png',
                    title: 'Cacti & Succulent Care Tips',
                    text: 'Cacti and succulents thrive in containers and because most are.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '4',
                    date: 'September 15',
                    length: 'Read in 2 minutes',
                    img: 'main__post-four.png',
                    title: 'Best Houseplants Room by Room',
                    text: 'The benefits of houseplants are endless. In addition to.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '5',
                    date: 'September 9',
                    length: 'Read in 1 minutes',
                    img: 'main__post-three.png',
                    title: 'Cacti & Succulent Care Tips',
                    text: 'Cacti and succulents thrive in containers and because most are.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '6',
                    date: 'September 9',
                    length: 'Read in 3 minutes',
                    img: 'main__post-four.png',
                    title: 'Top 10 Succulents for Your Home',
                    text: 'Best in hanging baskets. Prefers medium to high light.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '7',
                    date: 'September 10',
                    length: 'Read in 1 minutes',
                    img: 'main__post-two.png',
                    title: 'Best Houseplants Room by Room',
                    text: 'The benefits of houseplants are endless. In addition to.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
                {
                    id: '8',
                    date: 'September 11',
                    length: 'Read in 7 minutes',
                    img: 'main__post-one.png',
                    title: 'Cactus & Succulent Care Tips',
                    text: 'Cacti are succulents are easy care plants for any home or patio.',
                    fullText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

                },
            ] as PostType[],
            plants: [
                {
                    id: '1',
                    title: 'Barberton Daisy',
                    price: 119,
                    discount: 0,
                    addedToCart: true,
                    saved: true,
                    img: 'plant_one.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'All Plants',
                    rate: 5,
                },
                {
                    id: '2',
                    title: 'Angel Wing Begonia',
                    price: 169,
                    discount: 0,
                    addedToCart: true,
                    saved: false,
                    img: 'plant_two.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'New Arrivals',
                    rate: 4,
                },
                {
                    id: '3',
                    title: 'Violet',
                    price: 229,
                    discount: 5,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_one.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'New Arrivals',
                    rate: 5,
                },
                {
                    id: '4',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: true,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'New Arrivals',
                    rate: 5,
                },
                {
                    id: '5',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'New Arrivals',
                    rate: 4,
                },
                {
                    id: '6',
                    title: 'Chinese Evergreen',
                    price: 39,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_six.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'All Plants',
                    rate: 4,
                },
                {
                    id: '7',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_seven.png',
                    type: 'House Plants',
                    size: 'small',
                    productStatus: 'All Plants',
                    rate: 4,
                },
                {
                    id: '8',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_eight.png',
                    type: 'House Plants',
                    size: 'medium',
                    productStatus: 'All Plants',
                    rate: 5,
                },
                {
                    id: '9',
                    title: 'Chinese Evergreen',
                    price: 39,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_nine.png',
                    type: 'House Plants',
                    size: 'medium',
                    rate: 4,
                    productStatus: 'All Plants',
                },
                {
                    id: '10',
                    title: 'African',
                    price: 229,
                    discount: 11,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_nine.png',
                    type: 'Potter Plants',
                    size: 'medium',
                    rate: 4,
                    productStatus: 'All Plants',
                },
                {
                    id: '11',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Potter Plants',
                    size: 'medium',
                    rate: 4,
                    productStatus: 'All Plants',
                },
                {
                    id: '12',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Potter Plants',
                    size: 'medium',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '13',
                    title: 'Angel Wing Begonia',
                    price: 169,
                    discount: 0,
                    addedToCart: true,
                    saved: false,
                    img: 'plant_two.png',
                    type: 'Seeds',
                    size: 'medium',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '14',
                    title: 'African Violet',
                    price: 229,
                    discount: 3,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Seeds',
                    size: 'medium',
                    productStatus: 'All Plants',
                },
                {
                    id: '15',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Seeds',
                    size: 'medium',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '16',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Seeds',
                    size: 'medium',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '17',
                    title: 'Barberton Daisy',
                    price: 119,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_one.png',
                    type: 'Small Plants',
                    size: 'medium',
                    productStatus: 'All Plants',
                },
                {
                    id: '18',
                    title: 'Angel Wing Begonia',
                    price: 169,
                    discount: 0,
                    addedToCart: true,
                    saved: false,
                    img: 'plant_two.png',
                    type: 'Small Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '19',
                    title: 'African Violet',
                    price: 229,
                    discount: 20,
                    addedToCart: false,
                    saved: true,
                    img: 'plant_two.png',
                    type: 'Small Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '20',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Small Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '21',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Small Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '22',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_eight.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '23',
                    title: 'Chinese Evergreen',
                    price: 39,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_nine.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '24',
                    title: 'African Violet',
                    price: 229,
                    discount: 7,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_one.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '25',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '26',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '27',
                    title: 'Angel Wing Begonia',
                    price: 169,
                    discount: 0,
                    addedToCart: true,
                    saved: false,
                    img: 'plant_two.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '28',
                    title: 'African Violet',
                    price: 229,
                    discount: 13,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_three.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '29',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Big Plants',
                    size: 'large',
                    productStatus: 'All Plants',
                },
                {
                    id: '30',
                    title: 'African Violet',
                    price: 229,
                    discount: 5,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_two.png',
                    type: 'Succulents',
                    size: 'small',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '31',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Succulents',
                    size: 'small',
                    productStatus: 'All Plants',
                },
                {
                    id: '32',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Succulents',
                    size: 'small',
                    productStatus: 'All Plants',
                },
                {
                    id: '33',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_eight.png',
                    type: 'Succulents',
                    size: 'small',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '34',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_eight.png',
                    type: 'Trerrariums',
                    productStatus: 'New Arrivals',
                },
                {
                    id: '35',
                    title: 'Chinese Evergreen',
                    price: 39,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_nine.png',
                    type: 'Trerrariums',
                    size: 'small',
                    productStatus: 'All Plants',
                },
                {
                    id: '37',
                    title: 'African Violet',
                    price: 229,
                    discount: 13,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_three.png',
                    type: 'Trerrariums',
                    size: 'small',
                    productStatus: 'All Plants',
                },
                {
                    id: '38',
                    title: 'Bird\'s Nest Fern',
                    price: 99,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_four.png',
                    type: 'Trerrariums',
                    size: 'small',
                    productStatus: 'All Plants',
                },
                {
                    id: '39',
                    title: 'Broadleaf Lady Palm',
                    price: 59,
                    discount: 0,
                    addedToCart: false,
                    saved: false,
                    img: 'plant_five.png',
                    type: 'Trerrariums',
                    size: 'small',
                    productStatus: 'All Plants',
                },
            ] as PlantType[],
        }
    },

    getters: {
        wishlist: (state): PlantType[] => state.plants.filter(plant => plant.saved),
        shownPlants: (state): PlantType[] => {
            const totalAndFilteredPlants = {
                length: 0,
                plants: [],
            }
            const filteredPlants = [...state.plants]
                .filter(plant => {
                    if (state.productStatus) {

                        if (state.productStatus === 'All Plants') {
                            return true
                        }

                        if (state.productStatus === 'Sale') {
                            return plant.discount
                        }

                        return plant.productStatus === state.productStatus;
                    }
                    return true;
                })
                .filter(plant => {

                    if (state.plantType) {
                        return plant.type === state.plantType;
                    }
                    return true;
                })
                .filter(plant => (plant.price >= state.minPrice) && (plant.price <= state.maxPrice))
                .filter(plant => {
                        if (state.size) {
                            return plant.size == state.size
                        }

                        return true;
                    }
                )
                .filter(plant => {

                    if (state.plantTitle) {
                        return plant.title.toLowerCase().includes(state.plantTitle.toLowerCase())
                    }
                    return true;
                })


            totalAndFilteredPlants.length = filteredPlants.length;
            totalAndFilteredPlants.plants = filteredPlants
                .slice((state.currentPage - 1) * state.limit, (state.currentPage - 1) * state.limit + state.limit)

            return totalAndFilteredPlants

        },
        filteredPlants: (state): number => {
            return (filterData: { filterType: string, filterValue: string }) => {
                return [...state.plants].filter(plant => plant[filterData.filterType] === filterData.filterValue).length
            }
        },
        totalPlants: (state): number => state.plants.length,
        selectedPlant: (state): (id: string) => PlantType => {
            return (id: string): PlantType => {
                return state.plants.find(plant => plant.id === id)!
            }
        }
    },

    actions: {
        async setPage(page: number) {
            this.currentPage = page
        },
        async setPlantsFilters(payload: {
            minPrice: number | null
            maxPrice: number | null
            plantType: string | null
            plantSize: string | null
        }) {
            this.minPrice = payload.minPrice
            this.maxPrice = payload.maxPrice
            this.plantType = payload.plantType
            this.size = payload.plantSize?.toLowerCase()
        },

        async setProductStatus(productStatus: string) {
            this.productStatus = productStatus
        },

        async changePcsInCart(id: string, increment: boolean) {
            const isItemInCart = this.cartItemsData.find(plant => plant.id == id)

            if (!isItemInCart) {
                const productToAdd: PlantType = this.plants.find(plant => plant.id == id)!
                const preparedProduct: ProductInCart = {
                    id: productToAdd.id!,
                    title: productToAdd!.title,
                    pcs: 1,
                    img: productToAdd!.img,
                    price: productToAdd!.price,
                }
                this.cartItemsData = [...this.cartItemsData, preparedProduct]
            }

            this.cartItemsData = this.cartItemsData.map(product => {
                if (product.id == id) {
                    return {
                        ...product,
                        pcs: increment ? product.pcs + 1 :
                            product.pcs > 0 ? product.pcs - 1 : 0,
                    }
                } else {
                    return product
                }
            })
        },

        async deleteProductFromCart(id: string) {
            this.cartItemsData = this.cartItemsData.filter(product => product.id !== id)
            this.plants = this.plants.map(plant => {
                if (plant.id === id) {
                    return {
                        ...plant,
                        addedToCart: false
                    }
                } else {
                    return plant
                }
            })
        },

        async addProductToCart(product: ProductInCart) {
            this.cartItemsData = [...this.cartItemsData, product]
            this.plants = this.plants.map(plant => {
                if (plant.id === product.id) {
                    return {
                        ...plant,
                        addedToCart: true
                    }
                } else {
                    return plant
                }
            })
        },

        async removeProductFromCart(id: string) {
            this.cartItemsData = this.cartItemsData.filter(plant => plant.id !== id)
            this.plants = this.plants.map(plant => {
                if (plant.id === id) {
                    return {
                        ...plant,
                        addedToCart: false
                    }
                } else {
                    return plant
                }
            })
        },

        async clearCart() {
            this.cartItemsData = []
            this.plants = this.plants.map(plant => ({
                ...plant,
                addedToCart: false
            }))
        },

        async setPaymentMethod(paymentMethodId: number) {
            this.paymentMethodId = paymentMethodId
        },

        async addProductToWishlist(id: string) {
            this.plants = this.plants.map(plant => {
                if (plant.id === id) {
                    return {
                        ...plant,
                        saved: true
                    }
                } else {
                    return plant
                }
            })
        },

        async removeProductFromWishlist(id: string) {
            this.plants = this.plants.map(plant => {
                if (plant.id === id) {
                    return {
                        ...plant,
                        saved: false
                    }
                } else {
                    return plant
                }
            })
        },

        async deleteBlogPost(id: string) {
            this.blogPostsData = this.blogPostsData.filter(post => post.id !== id)
        },

        async savePostChanges(payload: PostType) {
            this.blogPostsData = this.blogPostsData.map(post => {
                if (post.id === payload.id) {
                    return payload
                } else {
                    return post
                }
            })
        },

        async addPost(payload: PostType) {
            const preparedPost = {
                ...payload,
                id: `${this.blogPostsData.length + 1}`,
                img: 'main__post-one.png'
            }
            this.blogPostsData = [preparedPost, ...this.blogPostsData]
        },

        async deleteCarePost(id: string) {
            this.plantCareData = this.plantCareData.filter(post => post.id !== id)
        },

        async saveCarePostChanges(payload: PostCareType) {
            this.plantCareData = this.plantCareData.map(post => {
                if (post.id === payload.id) {
                    return payload
                } else {
                    return post
                }
            })
        },

        async addCarePost(payload: PostCareType) {
            const preparedPost = {
                ...payload,
                id: `${this.plantCareData.length + 1}`,
                img: 'main_care-one.png'
            }
            this.plantCareData = [preparedPost, ...this.plantCareData]
        },

        async deletePlant(id: string) {
            this.plants = this.plants.filter(plant => plant.id !== id)
        },

        async savePlantChanges(payload: PlantType) {
            this.plants = this.plants.map(plant => {
                if (plant.id === payload.id) {
                    return payload
                } else {
                    return plant
                }
            })
        },

        async addPlant(payload: PlantType) {
            const preparedPlant = {
                ...payload,
                id: `${this.plants.length + 1}`,
                img: 'plant_eight.png',
                addedToCart: false,
                saved: false,
            }
            this.plants = [preparedPlant, ...this.plants]
        },

        async removeAllFilters() {
            this.minPrice = 0
            this.maxPrice = 100000
            this.size = ''
            this.productStatus = ''
            this.plantTitle = ''
            this.plantType = ''
        }

    }
})
