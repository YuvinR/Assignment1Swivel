import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, validateYupSchema } from 'formik';
import {
    Box,
    Card,
    Grid,
    TextField,
    Container,
    Button,
    CardContent,
    Divider,
    InputLabel,
    Switch,
    CardHeader,
    MenuItem,
    Typography,
    FormControl
} from '@mui/material';
import services from './Services';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import * as Yup from "yup";
import { shape } from '@mui/system';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export default function CakeOrder(props) {

    const navigate = useNavigate();
    const [shapes, setShapes] = useState([]);
    const [toppings, setToppings] = useState([]);

    const [toppingsSet, setToppingsSet] = useState([]);
    const [calValue, setCalValue] = useState(0);
    const [formData, setForData] = useState({
        shapeID: 0,
        size: 0,
        toppingID: 0,
        noOfToppings: 0,
        msg: '',
        noOfStaws: 0

    });

    useEffect(() => {
        getAllShapes();
    }, [])


    useEffect(() => {
        CalculatePrice();
    }, [formData])


    useEffect(() => {
        CalculatePrice();
    }, [toppingsSet])

    async function getAllShapes() {

        var res = await services.getAllShapes();
        setShapes(res);

        var res1 = await services.getAllToppings();
        setToppings(res1);
    }

    async function handleChange1(e) {
        const target = e.target;
        const value = target.name === 'isActive' ? target.checked : target.value
        setForData({
            ...formData,
            [e.target.name]: value
        });

    }



    async function add(e) {
        let arr = [...toppingsSet]

        let filterTopping = toppings.find(x => x.id == formData.toppingID)


        let obj = {
            toppingID: formData.toppingID,
            toppingPrice: filterTopping.toppingPrice,
            initialQuantity: filterTopping.initialQuantity,
            toppingName: filterTopping.toppingName,
            noOfToppings: formData.noOfToppings
        }

        arr.push(obj)
        setToppingsSet(arr);

    }

    async function CalculatePrice() {
        let filterTopping = '';
        var toppingPrice = 0;
        
        if(formData.shapeID!=0 ||formData.shapeID!='' ){
            var shapeList = [...shapes]
        
            filterTopping= shapeList.find(x => x.id == formData.shapeID)
            toppingPrice = filterTopping.shapePrice
        }
      
        var sizePrice = 0.01 * formData.size;


        var msgPrice = formData.msg != '' ? 1 : 0;
        var totOfToppings = 0;

        toppingsSet.forEach(element => {
            var unitValue = element.toppingPrice / element.initialQuantity;
            var unitCal = unitValue * element.noOfToppings
            totOfToppings = totOfToppings + unitCal;
        });

        var tot = toppingPrice + sizePrice + msgPrice + totOfToppings;
        setCalValue(tot);
    }

    async function clear() {
        setForData({
            shapeID: 0,
            size: 0,
            toppingID: 0,
            noOfToppings: 0,
            msg: '',
            noOfStaws: 0
        })
        setToppingsSet([]);

    }

    async function PlaceOrder() {

        var newArr=[];

        toppingsSet.forEach(element => {
            let obj={
                toppingID: element.toppingID,
                toppingPrice : element.toppingPrice
            }
            newArr.push(obj)
        });

        let finalObj={
            shapeID:formData.shapeID,
            size:parseFloat(formData.size),
            message:formData.msg,
            totalPrice:parseFloat(calValue),
            orderToppings :newArr
        }

        var res = services.CreateOrder(finalObj);
        console.log("resss",res);
    }

    return (
        <Fragment>

            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
            >
                <Container>
                    <br /><br /><br /><br />
                    <Typography variant="h3" gutterBottom>
                        Order Cake
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Enter details below.</Typography>
                    <br /><br />
                    <Formik
                        initialValues={{
                            shapeID: formData.shapeID,
                            size: formData.size,
                            toppingID: formData.toppingID,
                            noOfToppings: formData.noOfToppings,
                            msg: formData.msg,
                            noOfStaws: formData.noOfStaws
                        }}
                        // onSubmit={(values) => trackPromise(saveDetails(values))}
                        enableReinitialize

                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                            props
                        }) => (
                            <div>
                                <Grid container spacing={5}>


                                    <Grid item md={4} xs={12}>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Shape"
                                            variant="outlined"
                                            name="shapeID"
                                            value={formData.shapeID}
                                            onChange={(e) => handleChange1(e)}
                                        //error={Boolean(touched.productSubCategoryID && errors.productSubCategoryID)}
                                        //helperText={touched.productSubCategoryID && errors.productSubCategoryID}

                                        >
                                            <MenuItem key={0} value={0}> --Select Shape--</MenuItem>
                                            {shapes.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>{item.shapeName}</MenuItem>)
                                            )}
                                        </TextField>
                                    </Grid>

                                    <Grid item md={4} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Size"
                                            variant="outlined"
                                            name="size"
                                            value={formData.size}
                                            onChange={(e) => handleChange1(e)}


                                        />
                                    </Grid>

                                    <Grid item md={4} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Message"
                                            variant="outlined"
                                            name="msg"
                                            value={formData.msg}
                                            onChange={(e) => handleChange1(e)}


                                        />
                                    </Grid>



                                </Grid>
                                <br /><br /><br />
                                <Typography sx={{ color: 'text.secondary' }}>Add Toppings</Typography>
                                <br />
                                <Grid container spacing={5}>

                                    <Grid item md={4} xs={12}>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Topping"
                                            variant="outlined"
                                            name="toppingID"
                                            value={formData.toppingID}
                                            onChange={(e) => handleChange1(e)}
                                        >
                                            <MenuItem key={0} value={0}> --Select Topping--</MenuItem>
                                            {toppings.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>{item.toppingName + '(' + item.initialQuantity + 'pcs-' + item.toppingPrice + '$' + ')'}</MenuItem>)
                                            )}
                                        </TextField>
                                    </Grid>


                                    <Grid item md={4} xs={12}>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Number Of Stawberies"
                                            variant="outlined"
                                            name="noOfToppings"
                                            value={formData.noOfToppings}
                                            onChange={(e) => handleChange1(e)}
                                        //error={Boolean(touched.productSubCategoryID && errors.productSubCategoryID)}
                                        //helperText={touched.productSubCategoryID && errors.productSubCategoryID}


                                        >
                                            <MenuItem key={0} value={0}> --Select Topping--</MenuItem>
                                            <MenuItem key={4} value={4}> 4</MenuItem>
                                            <MenuItem key={8} value={8}> 8</MenuItem>
                                            <MenuItem key={12} value={12}> 12</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item md={2} xs={12}>
                                        <Button variant="contained" onClick={() => add()}>Add</Button>
                                    </Grid>

                                </Grid>
                                <br /><br /><br />
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Topping Category)</TableCell>
                                                <TableCell align="center">No Of Stawberies</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {toppingsSet.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center" component="th" scope="row">
                                                        {row.toppingName}
                                                    </TableCell>
                                                    <TableCell align="center">{row.noOfToppings}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <br /><br />
                                <Typography variant="h3" gutterBottom>
                                     Total($) :{calValue}
                                </Typography>
                                <br />
                                <Button variant="outlined" onClick={clear}>Clear</Button>
                                &nbsp;
                                <Button variant="contained" onClick={PlaceOrder}>Submit</Button>
                               
                                
                            </div>
                        )}
                    </Formik>

                </Container>
            </Box>

        </Fragment>
    )
}