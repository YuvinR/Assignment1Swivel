import React, { Component } from 'react';
import axios from 'axios';

var api = 'http://localhost:5172/';


    export const CommonGet = (controller, queryString) => {

       return fetch(api+'/'+controller+'/'+queryString);
        
       
    }

    export const CommonPost =  (controller,requestbody)=> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestbody)
        };

        return fetch(api+'/'+controller,requestOptions);
       
    }

    export const CommonUpdate =  (controller,requestbody)=> {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestbody)
        };

        return fetch(api+'/'+controller,requestOptions);
       
    }

    
export const CommonGetAxios = async (url, queryString) => {
    
    let originURL;
    const header = {
        "Content-type": "application/json; charset=utf-8",
        'Access-Control-Allow-Methods': '*',
        'Accept-Language': 'en-US'
    }

    if (queryString != null) {
        originURL = api + url + "?" + queryString;
    } else {
        originURL = api + url;
    }

    return await axios.get(originURL, [header]).then(response => {
        console.log("responseCommonGetAxios",response);
        if (response.statusText === 'Token Time Exceed') {
            window.logout.logout();
        } else {
            if (response.status >= 200 && response.status < 300) {
                return (response.data);
            } else {
                return response.statusText;
            }
        }
    });
};


export const CommonPostAxios = async (url, queryString, body) => {
    const encryptedResult = JSON.stringify(body);
    let originURL;
   
    const options = {
        headers: {
            "Content-type": "application/json; charset=utf-8",
            'Access-Control-Allow-Methods': '*',
            'Accept-Language': 'en-US'
        }
    };
  
    if (queryString != null) {
        originURL = api + url + "?" + queryString;
    } else {
        originURL = api + url;
    }

   

    return await axios.post(originURL, encryptedResult, options).then(response => {
        if (response.statusText === 'Token Time Exceed') {
            window.logout.logout();
        } else {
            if (response.status >= 200 && response.status < 300) {
                return (response.data);
            } else {
                return response.statusText;
            }
        }
    });

}
