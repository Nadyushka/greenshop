import {defineStore} from 'pinia'

export const useAuthStore = defineStore('tickets', {
    state: () => {
        return {
            isAuth: false,
            userRole: null as null | 'admin' | 'buyer',
            authError: null as null | string,
            users: {
                'admin': {
                    email: 'admin@gmail.com',
                    password: 'admin123',
                    role: 'admin'
                },
                'buyer': {
                    email: 'buyer@gmail.com',
                    password: 'buyer123',
                    role: 'buyer',
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
        }
    }
})
