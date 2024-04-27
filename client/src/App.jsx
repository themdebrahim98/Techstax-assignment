import "./App.css";
import ScreenBuilder from "./pages/ScreenBuilder/ScreenBuilder";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import WorkflowRunner from "./components/RunWorkFlow/RunWorkFlow";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./components/PrivateRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <PrivateRoute>
          <Home />,
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/runworkflow",
    element: (
      <Layout>
        <PrivateRoute>
          <WorkflowRunner />,
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/screenbuilder/:id",
    element: (
      <Layout>
        <PrivateRoute>
          <ScreenBuilder />,
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
