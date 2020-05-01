import { get } from 'svelte/store'
import { user } from './stores/user'
import AuthLayout from './layouts/Auth.svelte';
import BlankLayout from './layouts/Blank.svelte'
import Login from './pages/Login.svelte'
import Signup from './pages/Signup.svelte'
import Home from './pages/Home.svelte'
import Logout from './pages/Logout.svelte'
import Users from './pages/Users.svelte'
import Musics from './pages/Musics.svelte'
import Chords from './pages/Chords.svelte'

function isLogged() {
    const v = get(user);
    return !!v.token;
}

const guardLogged = { guard: isLogged, redirect: '/login' }

const routes = [
    { name: "/", component: Home, layout: BlankLayout, onlyIf: guardLogged },

    { name: "login", component: Login, layout: AuthLayout },
    { name: "signup", component: Signup, layout: AuthLayout },
    { name: 'logout', component: Logout },
    { name: 'users', component: Users, layout: BlankLayout },
    { name: 'musics', component: Musics, layout: BlankLayout },
    { name: 'chords', component: Chords, layout: BlankLayout },
];

export { routes };
