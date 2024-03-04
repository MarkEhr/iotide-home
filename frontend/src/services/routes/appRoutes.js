import Home from "../../scenes/Home/Home";

export const paths={
    home: '/'
};

const getAppRoutes =()=>{

    let routes = [];

    routes.push({path:paths.home, Component: Home});

    return routes;
};


export default getAppRoutes;
