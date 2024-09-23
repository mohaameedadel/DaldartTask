import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./Components/Layout/Layout";
import Hot from "./Pages/Hot/Hot";
import New from "./Pages/New/New";
import Rising from "./Pages/Rising/Rising";
import Details from "./Pages/Details/Details";
import NotFoundPages from "./Pages/NotFoundPages/NotFoundPages";

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
