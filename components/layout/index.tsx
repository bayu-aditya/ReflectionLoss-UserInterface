import React, { useState } from "react";
import { 
  AppBar, 
  Button, 
  Menu, 
  MenuItem, 
  Toolbar, 
  Typography } from "@material-ui/core";

import styles from "./index.module.scss";

export const MainLayout: React.FC = (props) => {
  const [openMode, setOpenMode] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget)
    setOpenMode(true)
  }
  const handleCloseMode = () => {
    setAnchorEl(null)
    setOpenMode(false)
  }

  const handleChangeMode = (value: "simulation" | "experiment") => {
    if (value === "simulation") {
      window.location.href = "/simulation"
    } else if (value === "experiment") {
      window.location.href = "/experiment"
    }
  }

  return (
    <div className={styles.root}>
      <AppBar className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <Typography 
            variant="h6"
            className={styles.title}
          >Reflection Loss</Typography>

          <Button
            aria-controls="mode-popout"
            aria-haspopup
            onClick={handleOpenMode}
            className={styles.button}
          >Mode</Button>

          <Menu 
            id="mode-popout"
            open={openMode} 
            keepMounted
            anchorEl={anchorEl}
            onClose={handleCloseMode}
          >            
            <MenuItem
              onClick={() => handleChangeMode("simulation")}
            >Simulation</MenuItem>
            <MenuItem 
              onClick={() => handleChangeMode("experiment")} 
            >Experiment</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {props.children}

      <footer>
        <Typography
          variant="caption"
        >
          Reflection Loss Calculation | Copyright 2021
        </Typography>
      </footer>
    </div>
  )
}