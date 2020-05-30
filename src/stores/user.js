import { writable } from 'svelte/store'

/**
 * @param {import('axios').AxiosInstance} http 
 */
function _createUserStore(http) {
    const { set, update, subscribe } = writable({
        token: localStorage.getItem('ukanlearn-access-token-admin') || null
    })

    return {
        set, update, subscribe,
        /**
         * 
         * @param {string} email 
         * @param {string} password 
         */
        async login(email, password) {
            try {
                const { data } = await http.post('/auth/login/admin', { email, password })
                update(u => ({ ...u, token: data.token }))
                localStorage.setItem('ukanlearn-access-token-admin', data.token)
                return null
            } catch (error) {
                return error
            }
        },
        async logout() {
            set({
                token: null
            })
            localStorage.removeItem('ukanlearn-access-token-admin')
        }
    }
}

export let user = null

/**
 * @param {import('axios').AxiosInstance} http 
 */
export function createUserStore(http) {
    user = _createUserStore(http)
}