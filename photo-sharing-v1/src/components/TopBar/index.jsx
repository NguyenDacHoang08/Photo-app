import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useMatch } from "react-router-dom";

import models from "../../modelData/models";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const userDetailMatch = useMatch("/users/:userId");
  const userPhotosMatch = useMatch("/photos/:userId");

  let title = "All Users";

  if (userDetailMatch) {
    const { userId } = userDetailMatch.params;
    const user = models.userModel(userId);
    title = user ? `${user.first_name} ${user.last_name}` : "User details";
  } else if (userPhotosMatch) {
    const { userId } = userPhotosMatch.params;
    const user = models.userModel(userId);
    title = user ? `Photos of ${user.first_name} ${user.last_name}` : "User photos";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Dacho
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="subtitle1" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
