import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import services from './Services';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: ""

  });
  const [isHidden, setIsHidden] = useState(false)

  const [messageModel, setmessageModel] = useState([]);

  async function login(values) {
    let result = await services.login(values);
    if (result.statusCode == "Error") {
      setIsHidden(true);
      setmessageModel(result.message);
      return;
    }
    sessionStorage.setItem('token', result.data);
    navigate('/cakeOrder');
  }

  return (
    
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: userDetails.username,
              password: userDetails.password
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={login}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                 <br/>
                 <br/>
                 <br/>
                 <br/>
                  <Typography variant="h3" gutterBottom>
                    Sign in to CakeShop
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                </Box>
                <Grid
                  item
                  xs={12}
                  md={12}
                >
                  {isHidden ? <Alert severity="error">
                    <AlertTitle>Error: <strong>{messageModel}</strong></AlertTitle>

                  </Alert> : null}
                </Grid>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
  );
};

export default LoginView;
