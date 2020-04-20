import React, { FunctionComponent } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import {
  CalendarAction,
  CalendarView,
  CalendarUIProps,
} from "../calendar/types";
import StudioPanel from "./ResourceList";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const TemporaryDrawer: FunctionComponent<CalendarUIProps> = ({
  dispatch,
  state,
}) => {
  const classes = useStyles();

  const onClose = (): void => {
    // TODO clean up after drawer closes
  };

  const onOpen = (): void => {
    // TODO cleanup when drawer opens.  Note: this is only a swipe open.
  };

  const toggleDrawer = (
    event: React.KeyboardEvent | React.MouseEvent
  ): void => {
    // For a11y.  Make drawer navigable via keyboard.
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    dispatch({ type: CalendarAction.ToggleDrawer });
  };

  return (
    <SwipeableDrawer
      open={state.drawerIsOpen}
      anchor="left"
      onClose={onClose}
      onOpen={onOpen}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div className={clsx(classes.list)} role="presentation">
        <List>
          {[
            ["Schedule", "listWeek"],
            ["Day", "resourceTimeGridDay"],
            ["Week", "resourceTimeGridWeek"],
            ["Month", "dayGridMonth"],
          ].map((tuple) => (
            <ListItem
              button
              key={tuple[0]}
              onClick={(): void =>
                dispatch({
                  type: CalendarAction.ChangedView,
                  payload: { currentView: tuple[1] as CalendarView },
                })
              }
            >
              <ListItemText primary={tuple[0]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <StudioPanel dispatch={dispatch} state={state} />
      </div>
    </SwipeableDrawer>
  );
};

export default TemporaryDrawer;
