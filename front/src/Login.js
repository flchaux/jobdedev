import React from 'react';
var qs = require('qs');

export default () => {
    const appToken = qs.parse(window.location.search, { ignoreQueryPrefix: true }).apptoken;
    if(appToken !== undefined)
    {
        localStorage.setItem('app-token', appToken)
        window.location = window.location.protocol + '//' + window.location.host;
    }
    else{
        window.location = 'https://linkedin-login-test.webflow.io/'
    }
}