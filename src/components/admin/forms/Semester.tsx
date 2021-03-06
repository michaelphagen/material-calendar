import React, { FunctionComponent } from "react";
import { Field } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { FormValues } from "../../../admin/types";
import { List } from "@material-ui/core";

const FormTemplate: FunctionComponent<FormValues> = (values) => {
  const { active } = values;
  return (
    <List>
      <Field fullWidth component={TextField} name="title" label="Title" />
      <Field fullWidth component={DatePicker} name="start" label="Start" />
      <Field fullWidth component={DatePicker} name="end" label="End" />
      <Field
        type="checkbox"
        component={CheckboxWithLabel}
        name="active"
        Label={{
          label: 'Semester is "active" (not exactly sure what that means...)',
        }}
        checked={active}
      />
    </List>
  );
};
export default FormTemplate;
