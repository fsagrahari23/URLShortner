import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.gen";
import Register from "../pages/Register";
import Login from "../pages/Login";

export const registerRoute = createRoute({
    getParentRoute:()=> rootRoute,
    path:'/register',
    component:Register
})

export const loginRoute = createRoute({
    getParentRoute:()=> rootRoute,
    path:'/login',
    component:Login
})