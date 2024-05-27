import { RouteObject, createHashRouter, Navigate } from "react-router-dom";
import Layout from "@/layout";
import Dashboard from "@/views/dashboard";
import TableComponent from "@/views/lowCode/table";
import FormComponent from "@/views/lowCode/form";
import ModalComponent from "@/views/lowCode/modal";
import Component from "@/views/lowCode/component";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/lowcode",
    element: <Layout />,
    children: [
      {
        path: "/lowcode/table",
        index: true,
        element: <TableComponent />
      },
      {
        path: "/lowcode/modal",
        element: <ModalComponent />
      },
      {
        path: "/lowcode/component",
        element: <Component />
      },
      {
        path: "/lowcode/form",
        element: <FormComponent />
      }
    ]
  }
];

const router = createHashRouter(routes);

export default router;
