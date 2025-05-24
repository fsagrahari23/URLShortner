import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.gen"; // Make sure extension is correct
import HomePage from "../pages/HomePage";
import { checkAuth } from "../helper";

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage, // ✅ Pass the component itself, not JSX
  beforeLoad:checkAuth
});
