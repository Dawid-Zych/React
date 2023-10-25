import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

/* W wczesniejszych wersiach vite nie było eslinta trzeba było go zainstalować
  npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
nastepnie tworzymy plik .eslintrc.json

{ "extends": "react-app"}

następnie w pliku vite.config.js 
import eslint from "vite-plugin-eslint"

i dodajemy go do naszego exportu

export default defineConfig({
  plugins: [react(),eslint()],
})

*/
