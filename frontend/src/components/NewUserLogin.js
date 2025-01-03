import React from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import usersService from "../services/users";
import toastr from "toastr";
import { setUserCredentials } from "../utils/setUserCredentials";

const NewUserLogin = () => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const result = await usersService.create(values);
        console.log(result);
        if (result && result.status === 201) {
          // Let user know the account was created & we are logging them in
          toastr.info("Account created. Logging in...");

          // Handle successful account creation & login
          const loginResult = await usersService.auth(
            values.email,
            values.password
          );
          console.log(loginResult);
          if (loginResult && loginResult.status === 200) {
            toastr.success("Login Successful");
            const { user, accessToken } = loginResult.data;
            setUserCredentials(user, accessToken);
            window.location = "/daily_lines";
          } else {
            toastr.error("Login Failed");
            throw new Error(loginResult);
          }
        } else {
          if (result && result?.data.message) {
            toastr.error(result.data.message);
            throw new Error(result);
          } else {
            toastr.error("Account Creation Failed");
            throw new Error(result);
          }
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <Grid container justifyContent="center">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 5, width: "100%", maxWidth: 360 }}
      >
        <Typography variant="h5" gutterBottom>
          Create New Account
        </Typography>
        <TextField
          fullWidth
          id="first_name"
          name="first_name"
          label="First Name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="last_name"
          name="last_name"
          label="Last Name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="username"
          name="username"
          label="User Name"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          Create Account
        </Button>
      </Box>
    </Grid>
  );
};

export default NewUserLogin;
