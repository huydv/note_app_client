import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { addNewFolder } from "../utils/folderUtils";

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenPopup = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNewFolderName("");
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddNewFolder = async () => {
    const addFolder = await addNewFolder({ name: newFolderName });
    handleClose();
  };
  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullwidth="true"
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
