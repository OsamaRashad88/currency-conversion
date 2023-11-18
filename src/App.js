import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Home from "./Components/Home.tsx";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Details from "./Components/Details.tsx";
import { CurrencyContexttProvider } from "./context/Context.js";

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
  return (
    <CurrencyContexttProvider>
      <RouterProvider router={routers}></RouterProvider>
    </CurrencyContexttProvider>
  );
}
export default App;
