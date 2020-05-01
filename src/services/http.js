import { get } from 'svelte/store'
import axios from 'axios'
import { user } from '../stores/user'

export let client = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 7500
})

client.interceptors.request.use(config => {
    const $user = get(user)
    if ($user.token) {
        config.headers['Authorization'] = `Bearer ${$user.token}`
    }
    return config
})