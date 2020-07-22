import React, { FunctionComponent } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { EquipmentState } from "../equipmentForm/types";
import MenuItem from "@material-ui/core/MenuItem";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";

interface EquipmentCartProps {
  state: EquipmentState;
  onClose: () => void;
  onOpen: () => void;
  selectedEquipment: {
    [k: string]: any;
  };
  setFieldValue: (field: string, value: any) => void;
}
const EquipmentCart: FunctionComponent<EquipmentCartProps> = ({
  state,
  onClose,
  onOpen,
  selectedEquipment,
  setFieldValue,
}) => {
  const selectedItems = Object.keys(selectedEquipment).filter(function (
    key: string
  ) {
    return selectedEquipment[key].quantity > 0;
  });

  return (
    <SwipeableDrawer
      open={state.equipmentCartIsOpen}
      anchor="top"
      onClose={onClose}
      onOpen={onOpen}
    >
      <Typography variant="subtitle2" style={{ textAlign: "center" }}>
        Equipment in your cart
      </Typography>
      <hr
        style={{
          minWidth: "100%",
        }}
      />
      {selectedItems.length > 0 ? (
        <List>
          {selectedItems.map((key) => {
            const selectOptions = Array.from({
              length: selectedEquipment[key].quantity + 1,
            }).map((_, i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ));
            return (
              <div
                key={selectedEquipment[key].name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  textTransform: "capitalize",
                }}
              >
                <ListItem>
                  <ListItemText primary={selectedEquipment[key].name} />
                  <Select
                    labelId={selectedEquipment[key].name + "Quantity Select"}
                    name={"equipment[" + key + "]"}
                    value={selectedEquipment[key].quantity}
                    onChange={(event): void =>
                      setFieldValue(
                        "equipment[" + selectedEquipment[key].name + "]",
                        event.target.value as number
                      )
                    }
                  >
                    {selectOptions}
                  </Select>
                </ListItem>
              </div>
            );
          })}
        </List>
      ) : (
        <div>
          You haven't reserved any equipment yet! Select some equipment from the
          list below!
        </div>
      )}
    </SwipeableDrawer>
  );
};

export default EquipmentCart;
