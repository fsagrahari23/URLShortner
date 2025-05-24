import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { homePageRoute } from "./homepage";
import { loginRoute, registerRoute } from "./auth.route";
import { dashBoardRoute } from "./dashboard";

// 1. Create the root route
export const rootRoute = createRootRoute({
  component: App,
});

// 2. Add children to the root route
const routeTree = rootRoute.addChildren([
  homePageRoute,
  registerRoute,
  loginRoute,
  dashBoardRoute,
]);

// 3. ✅ Export it so you can import elsewhere
export { routeTree };
