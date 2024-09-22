import Login from "../../scenes/public/Login/Login";
import Landing from "../../scenes/public/Landing/Landing";
import FancyHome from "../../scenes/FancyHome/FancyHome";

export const paths={
    base:'*',
    landing:'/',
    login:'/login',
};

const getMainRoutes = (isLoggedIn) => {

    if (isLoggedIn)
        return [
            {path: paths.base, Component: FancyHome},
        ]
    else return [
        {path: paths.landing, Component: Landing},
        {path: paths.login, Component: Login},
    ];
}

export default getMainRoutes;
