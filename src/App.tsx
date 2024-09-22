import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./assets/Components/Layout/Layout";
import Hot from "./assets/Pages/Hot/Hot";
import New from "./assets/Pages/New/New";
import Rising from "./assets/Pages/Rising/Rising";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Details from "./assets/Pages/Details/Details";
import NotFoundPages from "./assets/Pages/NotFoundPages/NotFoundPages";

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Hot /> },
        { path: "/new", element: <New /> },
        { path: "/rising", element: <Rising /> },
        { path: "/details/:id", element: <Details /> },
        { path: "*", element: <NotFoundPages /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
