import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import RequireAuth from "../hocs/RequireAuth";


const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element:
            <RequireAuth>
                <MainPage />
            </RequireAuth>
    }
]);

export default router;