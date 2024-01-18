import React from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import axios from "axios";
import { addErrorToField } from "../utils";
import ErrorMessage from "./ErrorMessage";

function SelectFields({ label, control, name, errors }) {
  const [countryList, setCountryList] = useState([]);

  const countryNames = countryList.map((country) => country.name.common).sort();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountryList(res.data));
  }, []);

  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            required
            select
            label={label}
            variant="filled"
            {...field}
            {...addErrorToField(errors[name])}
          >
            {countryNames.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
}
export default SelectFields;
