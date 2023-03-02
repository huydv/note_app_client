import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleLogoutClick = () => {
    auth.signOut();
  };

  const handleClickMenu = (el) => {
    setAnchorEl(el.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }} onClick={handleClickMenu}>
        <Typography sx={{ paddingTop: "10px" }}>{displayName}</Typography>
        <Avatar
          alt="avatar"
          src={photoURL}
          sx={{ width: "24", height: "24", marginLeft: "5px" }}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
