import React, { FunctionComponent } from "react";
import { Dialog, Toolbar, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import { AdminAction, AdminUIProps } from "../../admin/types";
import { ResourceKey } from "../../resources/types";
import ResourceForm from "./forms/ResourceForm";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import formRouter from "../../admin/forms/router";
import { dispatchOneResource } from "../../admin/dispatch";

const AdminDetailsForm: FunctionComponent<AdminUIProps> = ({
  dispatch,
  state,
}) => {
  const { template, valuator, updater } = formRouter(state.resourceKey);

  if (!state.resourceInstance) {
    return <div style={{ display: "none" }}></div>;
  }
  return (
    <Dialog fullScreen={true} open={state.detailIsOpen}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={(): void => dispatch({ type: AdminAction.CloseDetail })}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5">{`Edit ${
          ResourceKey[state.resourceKey]
        }`}</Typography>
      </Toolbar>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Formik
          initialValues={valuator(state)}
          onSubmit={dispatchOneResource(dispatch, state, updater)}
        >
          {(props): JSX.Element => (
            <ResourceForm {...props} FormFields={template} />
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </Dialog>
  );
};

export default AdminDetailsForm;
