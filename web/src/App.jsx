import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@mui/material/Snackbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';


const dev = "http://localhost:5000"
const baseUrl = window.location.hostname.split(":")[0] === "localhost" ? dev : "";

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
  }));

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required("Please Enter this feild"),
      email: Yup
        .string()
        .email("Please enter valid email")
        .required("Please enter this feild"),
      password: Yup
        .string()
        .min(8, "Password must be 8 digits long")
        .required("Please enter this feild")
    }),
    onSubmit: (values) => {
      console.log("submit click=>", values);
      axios.post(`${baseUrl}/api/v1/login`, {
        name: values.name,
        email: values.email,
        password: values.password
      })
        .then((res) => {
          console.log(res.data);
          setOpen(true);
          setToogleUser(!toogleUser);
        })
    }
  })

  const [users, setUsers] = useState([])
  const [toogleUser, setToogleUser] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/users`)
      .then(res => {
        console.log("users ka array a gaya=>", res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("error while getting users from server", err);
      })

  }, [toogleUser])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        ❌
      </Button>
    </React.Fragment>
  );

  return (
    <div className="App">
      <h1>Signup</h1>
      <br />
      <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
        <TextField
          type="text"
          color="secondary"
          label="Name"
          name="name"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        /><br />
        <TextField
          type="email"
          color="secondary"
          label="Email"
          name="email"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        /><br />
        <TextField
          type="password"
          color="secondary"
          label="Password"
          name="password"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        /><br />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Profile Created"
        action={action}
      />
      {users.map((val) => {
        return (
          <>
            <p>{val.name}</p>
            <p>{val.email}</p>
            <p>{val.password}</p>
          </>
        )
      })}
    </div>
  );
}

export default App;