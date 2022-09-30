import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, validateYupSchema } from 'formik';
import {
    Box,
    Card,
    Grid,
    TextField,
    makeStyles,
    Container,
    Button,
    CardContent,
    Divider,
    InputLabel,
    Switch,
    CardHeader,
    MenuItem,
    FormControl
  } from '@material-ui/core';
import * as Yup from "yup";

export default function CakeOrder(props) {

    const navigate = useNavigate();
    const [shapes, setShapes] = useState([]);
    const [toppings, setToppings] = useState([]);

    const [formData, setForData] = useState({
        shapeID: 0,
        size: 0,
        toppingID: 0,
        noOfToppings:0,
        msg:''
  
    });


    return (
        <Fragment>
            <div>
                <br/><br/>
            <Formik
            initialValues={{
                shapeID: formData.shapeID,
                size: formData.size,
                toppingID: formData.toppingID,
                noOfToppings:formData.noOfToppings,
                msg:formData.msg
            }}
           // onSubmit={(values) => trackPromise(saveDetails(values))}
            enableReinitialize
          >
          
                <Grid container spacing={5}>
                    

                    <Grid item md={4} xs={12}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Product SubCategory *"
                            variant="outlined"
                            name="productSubCategoryID"
                            //value={values.productSubCategoryID}
                            //onChange={(e) => handleChange1(e)}
                            //error={Boolean(touched.productSubCategoryID && errors.productSubCategoryID)}
                            //helperText={touched.productSubCategoryID && errors.productSubCategoryID}


                        >
                            <MenuItem key={0} value={0}> --Select Product Sub Category--</MenuItem>
                            {shapes.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.ShapeName}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Product SubCategory *"
                            variant="outlined"
                            name="productSubCategoryID"
                            //value={values.productSubCategoryID}
                            //onChange={(e) => handleChange1(e)}
                            //error={Boolean(touched.productSubCategoryID && errors.productSubCategoryID)}
                            //helperText={touched.productSubCategoryID && errors.productSubCategoryID}


                        >
                            <MenuItem key={0} value={0}> --Select Product Sub Category--</MenuItem>
                            {toppings.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.ToppingName}</MenuItem>)
                            )}
                        </TextField>
                    </Grid>

                </Grid>
</Formik>
            </div>
        </Fragment>
    )
}