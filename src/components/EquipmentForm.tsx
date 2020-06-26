import React, { FunctionComponent, useEffect } from "react";
import {
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FilterDrawer from "./FilterDrawer";
import CategoryPage from "./CategoryPage";
import TuneIcon from "@material-ui/icons/Tune";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import EquipmentList from "./EquipmentList";
import EquipmentStandardList from "./EquipmentStandardList";
import {
  fetchAllEquipmentResources,
  filterItems,
  quantizeEquipment,
  transition,
  useStyles,
} from "../equipmentForm/equipmentForm";
import {
  EquipmentFormProps,
  EquipmentActionTypes,
} from "../equipmentForm/types";
import reducer, { initialState } from "../equipmentForm/reducer";
import EquipmentViewToggleMenu from "./EquipmentViewToggleMenu";
import EquipmentCart from "./EquipmentCart";

const EquipmentForm: FunctionComponent<EquipmentFormProps> = ({
  open,
  setOpen,
  selectedEquipment,
  setFieldValue,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    setFieldValue,
  });
  const classes = useStyles();
  const quantizedEquipment = quantizeEquipment(state.equipment);

  useEffect(() => fetchAllEquipmentResources(dispatch), []);

  const toggleFilterDrawer = (): void =>
    dispatch({ type: EquipmentActionTypes.ToggleFilterDrawer, payload: {} });

  const toggleEquipmentCart = (): void =>
    dispatch({ type: EquipmentActionTypes.ToggleEquipmentCart, payload: {} });
  return (
    <Dialog fullScreen open={open} TransitionComponent={transition}>
      <div className={classes.root}>
        <FilterDrawer
          state={state}
          dispatch={dispatch}
          onOpen={toggleFilterDrawer}
          onClose={toggleFilterDrawer}
          closeDrawer={toggleFilterDrawer}
        />
        <EquipmentCart
          state={state}
          onOpen={toggleEquipmentCart}
          onClose={toggleEquipmentCart}
          selectedEquipment={selectedEquipment}
        />
        <AppBar position="sticky">
          <List>
            <Toolbar>
              <IconButton
                type="submit"
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={(): void => {
                  state.categoryDrawerView &&
                  (state.viewedCategory || state.currentCategory)
                    ? state.categoryDrawerIsOpen
                      ? dispatch({
                          type: EquipmentActionTypes.ReturnToPreviousCategory,
                          payload: {},
                        })
                      : dispatch({
                          type: EquipmentActionTypes.ToggleCategoryDrawer,
                          payload: {},
                        })
                    : setOpen(false);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              {state.categoryDrawerView ? (
                <Typography component="h6">
                  {state.viewedCategory?.title || "All Categories"}
                </Typography>
              ) : (
                <Typography className={classes.title}>Equipment</Typography>
              )}
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleFilterDrawer}
                aria-label="filter"
              >
                <TuneIcon />
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleEquipmentCart}
                aria-label="filter"
              >
                <ShoppingCartIcon />
              </IconButton>
              <EquipmentViewToggleMenu state={state} dispatch={dispatch} />
            </Toolbar>
          </List>
        </AppBar>
        {state.categoryDrawerView && state.categoryDrawerIsOpen && (
          <CategoryPage state={state} dispatch={dispatch} />
        )}
        {state.categoryDrawerView ? (
          !state.categoryDrawerIsOpen && (
            <EquipmentStandardList
              setFieldValue={state.setFieldValue}
              equipmentList={filterItems(
                quantizedEquipment,
                state.searchString,
                state.selectedTags,
                state.currentCategory
              )}
              selectedEquipment={selectedEquipment}
            />
          )
        ) : (
          <EquipmentList
            dispatch={dispatch}
            state={state}
            equipmentList={filterItems(
              quantizedEquipment,
              state.searchString,
              state.selectedTags,
              null
            )}
            selectedEquipment={selectedEquipment}
          />
        )}
      </div>
    </Dialog>
  );
};

export default EquipmentForm;
