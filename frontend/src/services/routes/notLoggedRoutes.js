import Login from "../../scenes/public/Login/Login";
import Landing from "../../scenes/public/Landing/Landing";

export const paths={
    landing:'/',
    login:'/login',
};

const notLoggedRoutes=[
    {path:paths.login, Component: Login},
    {path:paths.landing, Component: Landing},
];

export default notLoggedRoutes;
