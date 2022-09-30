import React, { Component } from 'react';

var api = 'http://localhost:5172';


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
