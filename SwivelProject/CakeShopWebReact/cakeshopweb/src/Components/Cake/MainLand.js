import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button
} from '@mui/material';

export default function MainLand(props) {

    const navigate = useNavigate();
    
    async function nav(e) {
        navigate('/cakeOrder');
    }

    return (
        <Fragment>
            <div>
                <br /><br /><br />
                <Button variant="contained" onClick={nav}>Place an Order</Button>
            </div>
        </Fragment>
    )
}