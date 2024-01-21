import {defineStore} from 'pinia'
import type {addressDataType} from "~/utils/types";

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isAuth: false,
            userRole: null as null | 'admin' | 'buyer',
            authError: null as null | string,
            selectedAddressId: null as string | null,
            users: {
                admin: {
                    email: 'admin@gmail.com',
                    password: 'admin123',
                    role: 'admin'
                },
                buyer: {
                    email: 'buyer@gmail.com',
                    password: 'buyer123',
                    role: 'buyer',
                    firstName: 'John',
                    secondName: 'Doe',
                    phone: 6848448564,
                    savedAddresses: [
                        {
                            id: '1',
                            addressName: 'Home',
                            streetHouse: '100 Jericho avenue, Westbury',
                            city: 'NY',
                            state: 'NY',
                            country: 'USA',
                            zip: '11590'
                        }, {
                            id: '2',
                            addressName: 'Office',
                            streetHouse: '20 Richon avenue',
                            city: 'NY',
                            state: 'NY',
                            country: 'USA',
                            zip: '11563'
                        },
                    ],
                }
            }
        }
    },

    actions: {
        async login(payload: { email: string, password: string }) {
            if (payload.email === this.users.admin.email && payload.password === this.users.admin.password) {
                this.isAuth = true
                this.userRole = 'admin'
                return
            } else if (payload.email === this.users.buyer.email && payload.password === this.users.buyer.password) {
                this.isAuth = true
                this.userRole = 'buyer'
                return
            } else {
                this.authError = 'There is no user with such email and password combination'
            }

            return this.authError
        },

        async logout() {
            this.isAuth = false
            this.userRole = null
        },

        async savePersonalData(payload: {
            firstName: string
            secondName: string
            password: string
            email: string
            phone: number
        }) {
            this.users = {
                ...this.users,
                buyer: {
                    ...this.users.buyer,
                    ...payload
                }
            }
        },

        async saveAddress(addressData: addressDataType) {
            this.users = {
                ...this.users,
                buyer: {
                    ...this.users.buyer,
                    savedAddresses: this.users.buyer.savedAddresses.map(address => {
                        if (address.id === addressData.id) {
                            return {
                                id: addressData.id,
                                addressName: addressData.addressName,
                                streetHouse: addressData.streetHouse,
                                city: addressData.city,
                                state: addressData.state,
                                country: addressData.country,
                                zip: addressData.zip,
                            }
                        } else {
                            return address
                        }
                    })
                }
            }
        },

        async deleteAddress(id: string) {
            this.users = {
                ...this.users,
                buyer: {
                    ...this.users.buyer,
                    savedAddresses: this.users.buyer.savedAddresses
                        .filter(address => address.id !== id)
                }
            }
        },

        async addAddress(newAddress: {
            id: string
            addressName: string
            streetHouse: string
            city: string
            state: string
            country: string
            zip: string
        }) {
            this.users = {
                ...this.users,
                buyer: {
                    ...this.users.buyer,
                    savedAddresses: [...this.users.buyer.savedAddresses, newAddress]
                }
            }
        },

        async setSelectedAddressId (id: string) {
            this.selectedAddressId = id
        }
    }
})
