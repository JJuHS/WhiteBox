import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query"
import "./index.css"
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Roboto']
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render(
  
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  
);
