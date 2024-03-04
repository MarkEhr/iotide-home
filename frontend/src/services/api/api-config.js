import React from 'react';

const config ={
    host:window.location.origin,
    commonPath:'api/v1',
    credentials:'include',
    saveTokenToLocalStorage: true,
    getDataFromResponse: r=>r?.data,
    getMetaDataFromResponse:r=>r?.meta,
    strictMode: false,
    handleUnknownMethods: true,
    login:{
        createBody: ( username, password )=>JSON.stringify({ username, password }),
        getHeaders: ()=>({ 'Content-Type': 'application/json' }),
    },
};

if(process.env.REACT_APP_BUILD === 'dev')
    config.host=localStorage.iotidehost||'http://localhost:4000';

export default config;

export const ApiContext = React.createContext(null);
