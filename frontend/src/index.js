import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import {Provider} from 'react-redux'; 
import reportWebVitals from './reportWebVitals';
import store from './store.js';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from ",/screens/CartScreen"

const router=createBrowserRouter((
  createRoutesFromElements(
   <Route path='/' element={<App/>}>
    <Route index={true} path="/" element={<Homescreen/>}/>
    <Route path='/product/:id' element={<ProductScreen/>}/>
    <Route path='/cart' element={<CartScreen/>}/>

   </Route>
  )
))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
  </React.StrictMode>
);


reportWebVitals();
