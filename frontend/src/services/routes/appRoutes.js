import Home from "../../scenes/Home/Home";
import FancyHome from "../../scenes/FancyHome/FancyHome";

export const paths={
    home: '/',
    fancyHome: '/home'
};

const getAppRoutes =()=>{

    let routes = [];

    routes.push({path:paths.home, Component: Home});
    routes.push({path:paths.fancyHome, Component: FancyHome});

    return routes;
};


export default getAppRoutes;
