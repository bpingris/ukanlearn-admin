import "smelte/src/tailwind.css";

import { createUserStore } from './stores/user'
import { client } from './services/http'
import App from './App.svelte';

createUserStore(client);

const app = new App({
	target: document.body,
});

export default app;