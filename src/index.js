import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Bookmarks from './Bookmarks';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
    ,
  },
  {
    path: "/bookmarks",
    element: <Bookmarks />
    ,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
