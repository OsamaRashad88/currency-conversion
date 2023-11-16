import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Home from "./Components/Home.tsx";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Details from "./Components/Details.jsx";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:from/:to", element: <Details /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}
export default App;
