import { FormControlLabel, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

function CheckboxFields({ label, control, name, errors }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          required
          control={<Checkbox />}
          label={label}
        />
      )}
    />
  );
}
export default CheckboxFields;
