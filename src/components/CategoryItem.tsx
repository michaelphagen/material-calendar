import Button from "@material-ui/core/Button";
import React, { FunctionComponent } from "react";
import Category from "../resources/Category";
import { EquipmentAction, EquipmentActionTypes } from "../equipmentForm/types";
import { IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

interface CategoryItemProps {
  item: Category | null;
  dispatch: (action: EquipmentAction) => void;
}
const CategoryItem: FunctionComponent<CategoryItemProps> = ({
  item,
  dispatch,
}) => {
  if (!item) {
    return null;
  }
  return (
    <Button
      style={{
        flexDirection: "column",
        minWidth: "100%",
      }}
      variant="contained"
      onClick={(): void => {
        dispatch({
          type: EquipmentActionTypes.SelectedCategory,
          payload: { currentCategory: item },
        });
        dispatch({
          type: EquipmentActionTypes.ToggleCategoryDrawer,
          payload: {},
        });
      }}
    >
      {item.title}
      {item.children && item.children.length > 0 && (
        <Button
          onClick={(event): void => {
            event.stopPropagation();
            dispatch({
              type: EquipmentActionTypes.ViewedCategory,
              payload: { viewedCategory: item },
            });
          }}
        >
          >
        </Button>
      )}
    </Button>
  );
};
export default CategoryItem;
