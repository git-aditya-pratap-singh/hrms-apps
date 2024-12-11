//import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import router from "./app/_routes/api.routes";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />

      <RouterProvider router={router} />
    </>
  )
}
export default App;