import Home from "../../scenes/Home/Home";
import FancyHome from "../../scenes/FancyHome/FancyHome";
import DashboardSketch from "../../scenes/DashboardSketch/DashboardSketch";

export const paths={
    home: '/',
    fancyHome: '/home',
    dash: '/dashboard',
};

const getAppRoutes =()=>{

    let routes = [];

    routes.push({path:paths.dash, Component: DashboardSketch});
    routes.push({path:paths.home, Component: Home});
    routes.push({path:paths.fancyHome, Component: FancyHome});

    return routes;
};


export default getAppRoutes;
