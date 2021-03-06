import React, { FunctionComponent } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { FormValues } from "../../../admin/types";
import { List } from "@material-ui/core";

const FormTemplate: FunctionComponent<FormValues> = () => (
  <List>
    <Field
      fullWidth
      component={TextField}
      name="course.title"
      label="Course title"
    />
    <Field
      fullWidth
      component={TextField}
      name="course.catalogId"
      label="Course catalog ID"
    />
  </List>
);
export default FormTemplate;
