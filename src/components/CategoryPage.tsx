import React, { FunctionComponent } from "react";
import Box from "@material-ui/core/Box";
import Category from "../resources/Category";
import CategoryItem from "./CategoryItem";
import { EquipmentAction, EquipmentState } from "../equipmentForm/types";

interface CategoryPageProps {
  state: EquipmentState;
  dispatch: (action: EquipmentAction) => void;
}
const CategoryPage: FunctionComponent<CategoryPageProps> = ({
  state,
  dispatch,
}) => {
  const items: Category[] | null = state.viewedCategory
    ? state.viewedCategory.children || null
    : Category.tree(state.categories);
  return (
    <Box>
      {items
        ?.filter((item) => Category.hasContents(item, state.equipment))
        ?.sort(
          (a, b) =>
            ((b.children && b.children?.length > 0 ? 1 : 0) || 0) -
            ((a.children && a.children?.length > 0 ? 1 : 0) || 0)
        )
        .map((item) => (
          <CategoryItem key={item.id} item={item} dispatch={dispatch} />
        ))}
    </Box>
  );
};

export default CategoryPage;
