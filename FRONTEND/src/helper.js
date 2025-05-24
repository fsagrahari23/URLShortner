import { getCuurentuser, login, logOut } from "./api/auth/route";
import { logout, setUser } from "./redux/authSlice";
import { store } from "./redux/store";
import { redirect } from "@tanstack/react-router";
export const checkAuth =async ({context})=>{
    try{
      
        const {queryClient,store} = context;
        const {user} = await queryClient.ensureQueryData({
            queryKey:['currentUser'],
            queryFn:getCuurentuser,
            retry: false,
        })
   store.dispatch(setUser(user))
   const auth = store.getState().auth;

   if(!auth.isAuthenticated) return false;

   return true;

    }catch (err) {
    console.error("Auth check failed:", err);
    return redirect({ to: '/login' });
  }
}

export const performLogout =async () => {
  store.dispatch(logout());
  await logOut();
  return redirect({ to: "/login" });
};