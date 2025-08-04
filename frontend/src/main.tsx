import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import '@/styles/main.scss';
import { registerSW } from 'virtual:pwa-register';
import { initSyncListener } from "@/utils/syncManager";

initSyncListener();

registerSW({
	onNeedRefresh() {
		console.log('Nueva versión disponible');
	},
	onOfflineReady() {
		console.log('App lista para modo offline');
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
)
