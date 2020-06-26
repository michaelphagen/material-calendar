import { EquipmentState, EquipmentAction, EquipmentActionTypes } from "./types";
import Category from "../resources/Category";
import Equipment from "../resources/Equipment";
import Tag from "../resources/Tag";

export const initialState = {
  filterDrawerIsOpen: false,
  categoryDrawerIsOpen: true,
  equipmentCartIsOpen: false,
  categoryDrawerView: false,
  searchString: "",
  equipment: [] as Equipment[],
  tags: [] as Tag[],
  categories: [] as Category[],
  selectedTags: {} as { [k: string]: boolean },
  currentCategory: null,
  viewedCategory: null,
  previousCategory: [],
};

type StateHandler = (
  state: EquipmentState,
  action: EquipmentAction
) => EquipmentState;

const changedSearchString: StateHandler = (state, { payload }) => ({
  ...state,
  ...payload,
});

const receivedResource: StateHandler = (state, { payload }) => ({
  ...state,
  ...payload,
});

const selectedFilter: StateHandler = (state, { payload }) => ({
  ...state,
  selectedTags: {
    ...state.selectedTags,
    ...payload.selectedTags,
  },
});

const addPrevious = (state: EquipmentState): Category[] => {
  const newState = state.previousCategory;
  if (state.viewedCategory) {
    newState.push(state.viewedCategory);
  }
  return newState;
};

const selectedCategory: StateHandler = (state, { payload }) => ({
  ...state,
  ...payload,
});

const viewedCategory: StateHandler = (state, { payload }) => ({
  ...state,
  ...payload,
  previousCategory: addPrevious(state),
});

const returnToPreviousCategory: StateHandler = (state) => ({
  ...state,
  currentCategory: null,
  viewedCategory: state.previousCategory.pop() || null,
});

const clearCategoryHistory: StateHandler = (state) => ({
  ...state,
  previousCategory: [],
});

const toggleFilterDrawer: StateHandler = (state) => ({
  ...state,
  filterDrawerIsOpen: !state.filterDrawerIsOpen,
});

const toggleCategoryDrawer: StateHandler = (state) => ({
  ...state,
  categoryDrawerIsOpen: !state.categoryDrawerIsOpen,
});

const toggleEquipmentViewMode: StateHandler = (state) => ({
  ...state,
  categoryDrawerView: !state.categoryDrawerView,
});

const toggleEquipmentCart: StateHandler = (state) => ({
  ...state,
  equipmentCartIsOpen: !state.equipmentCartIsOpen,
});
const reducer: StateHandler = (state, action) =>
  ({
    [EquipmentActionTypes.ChangedSearchString]: changedSearchString,
    [EquipmentActionTypes.ReceivedResource]: receivedResource,
    [EquipmentActionTypes.SelectedCategory]: selectedCategory,
    [EquipmentActionTypes.ViewedCategory]: viewedCategory,
    [EquipmentActionTypes.ReturnToPreviousCategory]: returnToPreviousCategory,
    [EquipmentActionTypes.ClearCategoryHistory]: clearCategoryHistory,
    [EquipmentActionTypes.SelectedFilter]: selectedFilter,
    [EquipmentActionTypes.ToggleFilterDrawer]: toggleFilterDrawer,
    [EquipmentActionTypes.ToggleCategoryDrawer]: toggleCategoryDrawer,
    [EquipmentActionTypes.ToggleEquipmentViewMode]: toggleEquipmentViewMode,
    [EquipmentActionTypes.ToggleEquipmentCart]: toggleEquipmentCart,
  }[action.type](state, action));

export default reducer;
