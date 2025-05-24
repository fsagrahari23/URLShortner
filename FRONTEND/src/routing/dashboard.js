import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.gen";
import Dashboard from "../pages/Dashboard";
import { checkAuth } from "../helper";

export const dashBoardRoute = createRoute({
    getParentRoute:()=> rootRoute,
    path:'/dashboard',
    component:Dashboard,
    beforeLoad:checkAuth
})