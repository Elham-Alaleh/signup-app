import { Box, Avatar, Typography, InputAdornment, Button } from "@mui/material";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";
import TextFields from "../components/TextFields";
import SelectFields from "../components/SelectFields";
import CheckboxFields from "../components/CheckboxFields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { passwordRegExp, phoneRegExp } from "../utils";

const schema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is Required!")
    .min(3, "Full Name must contain atleast 3 characters!"),
  email: yup
    .string()
    .required("Email is Required!")
    .email("This Email is not valid!"),
  phone: yup
    .string()
    .required("Phone number is required!")
    .matches(phoneRegExp, "Phone number is not valid!"),
  country: yup.string().required("Please select your country!"),
  password: yup
    .string()
    .required("The password is required!")
    .matches(
      passwordRegExp,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character."
    ),
  confirmPassword: yup
    .string()
    .required("Confirming password is required!")
    .oneOf([yup.ref("password"), null], "Password does not match!"),
  privacy: yup.bool().oneOf([true], "Please check this field!"),
});

function RegisterForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      password: "",
      confirmPassword: "",
      privacy: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "4rem",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <HowToRegSharpIcon />
      </Avatar>
      <Typography component="h1">Sign Up</Typography>
      <Box
        noValidate
        component="form"
        sx={{ width: "100%", mt: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextFields
          label="Full Name"
          control={control}
          name="fullName"
          errors={errors}
        />
        <TextFields
          label="Email"
          control={control}
          name="email"
          errors={errors}
        />
        <TextFields
          label="Phone"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">+98</InputAdornment>
            ),
            type: "number",
          }}
          control={control}
          name="phone"
          errors={errors}
        />
        <SelectFields
          label="Country"
          control={control}
          name="country"
          errors={errors}
        />
        <TextFields
          label="Password"
          control={control}
          name="password"
          errors={errors}
        />
        <TextFields
          label="Confirm Password"
          control={control}
          name="confirmPassword"
          errors={errors}
        />
        <CheckboxFields
          label="I Accept This App Terms And Privacy Policies."
          control={control}
          name={"privacy"}
          errors={errors}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
export default RegisterForm;
