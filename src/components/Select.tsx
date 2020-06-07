import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { NativeSelect } from "@material-ui/core";
import { CalendarUIProps } from "../calendar/types";
import Location from "../resources/Location";
import Project from "../resources/Project";
import UserGroup from "../resources/UserGroup";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface SelectProps extends CalendarUIProps {
  selectName: string;
  selectId: string;
  contents: (Location | Project | UserGroup)[];
}

const Select: FunctionComponent<SelectProps> = ({
  // dispatch,
  // state,
  selectName,
  selectId,
  contents,
}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        inputProps={{
          name: selectName,
          id: selectId,
        }}
        onChange={(): void => console.log("select changed")}
      >
        {contents.map((choice) => {
          return choice === contents[0] ? (
            <option value={choice.id} selected>
              {choice.title}
            </option>
          ) : (
            <option value={choice.id}>{choice.title}</option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
};
export default Select;
