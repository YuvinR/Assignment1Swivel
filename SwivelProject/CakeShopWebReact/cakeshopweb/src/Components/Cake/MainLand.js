import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainLand(props) {
    
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (sessionStorage.getItem('token') === "" || sessionStorage.getItem('token') == null || sessionStorage.getItem('token') === undefined) {

                navigate('/login');
            } else {
                console.log("secure route");
                navigate('/cakeOrder');
            }
        }, 3000);
        return () => clearTimeout(timer);

    });
   

  return (
    <Fragment>
        <div>
        </div>
    </Fragment>
    )
}