import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { addErrorToField } from "../utils";
import ErrorMessage from "./ErrorMessage";

function TextFields({ label, inputProps, control, name, errors }) {
  return (
    <FormControl fullWidth sx={{ mb: "1rem" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            required
            label={label}
            variant="filled"
            InputProps={inputProps}
            {...field}
            {...addErrorToField(errors[name])}
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
}
export default TextFields;
