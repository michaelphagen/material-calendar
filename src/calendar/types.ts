import Event from "../resources/Event";
import Project from "../resources/Project";
import FullCalendar from "@fullcalendar/react";
import UserGroup from "../resources/UserGroup";
import { ResourceKey, ResourceInstance } from "../resources/types";

export enum CalendarAction {
  ChangedView,
  CloseEventDetail,
  CloseProjectDashboard,
  CloseGroupDashboard,
  Error,
  Loading,
  PickedDate,
  OpenEventDetail,
  OpenGroupDashboard,
  OpenProjectDashboard,
  ReceivedAllResources,
  ReceivedResource,
  SelectedGroup,
  SelectedLocation,
  SelectedProject,
  ToggleDrawer,
  TogglePicker,
  ViewToday,
}

export type CalendarView =
  | "dayGridMonth"
  | "listWeek"
  | "resourceTimeGridDay"
  | "resourceTimeGridWeek";

export interface CalendarState {
  // UI state
  currentStart: Date;
  currentView: string;
  detailIsOpen: boolean;
  drawerIsOpen: boolean;
  error?: Error;
  groupDashboardIsOpen: boolean;
  loading: boolean;
  pickerShowing: boolean;
  projectDashboardIsOpen: boolean;
  ref: React.RefObject<FullCalendar> | null;

  // Resources
  resources: { [k in ResourceKey]: ResourceInstance[] };
  currentEvent?: Event;
  currentGroup?: UserGroup;
  currentProject?: Project;
}

// https://github.com/redux-utilities/flux-standard-action
export interface Action {
  type: CalendarAction;
  //! Partial<CalendarState> would work except for resources
  payload?: {
    // UI state
    currentStart?: Date;
    currentView?: string;
    detailIsOpen?: boolean;
    drawerIsOpen?: boolean;
    error?: Error;
    groupDashboardIsOpen?: boolean;
    loading?: boolean;
    pickerShowing?: boolean;
    projectDashboardIsOpen?: boolean;
    ref?: React.RefObject<FullCalendar> | null;

    // Resources
    //! this needs to be Partial as well
    resources?: { [k: number]: ResourceInstance[] };
    currentEvent?: Event;
    currentGroup?: UserGroup;
    currentProject?: Project;
  };
  error?: boolean;
  meta?: ResourceKey;
}

export type CalendarUIProps = {
  dispatch: (action: Action) => void;
  state: CalendarState;
};
