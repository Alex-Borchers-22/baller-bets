import React from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import usersService from "../services/users";
import toastr from "toastr";

const UserLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      //   password: Yup.string()
      //     .min(6, "Password must be at least 6 characters")
      //     .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      try {
        const result = await usersService.auth(values.email, values.password);
        console.log(result.data.message);
        if (result && result.data.message) {
          toastr.warning(result.data.message);
        } else if (result.data) {
          toastr.success("Login Successful");
          window.location.href = "/daily_lines";
        } else {
          throw new Error("Login Failed");
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
        sx={{ mt: 1, width: "100%", maxWidth: 360 }}
      >
        <Typography variant="h5" gutterBottom>
          User Login
        </Typography>
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
        {/* <TextField
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
        /> */}
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
        <Button color="secondary" fullWidth variant="text" href="/register">
          Create New Account
        </Button>
      </Box>
    </Grid>
  );
};

export default UserLogin;
