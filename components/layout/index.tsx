import React from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography } from "@material-ui/core";

import styles from "./index.module.scss";

export const MainLayout: React.FC = (props) => {
  return (
    <div className={styles.root}>
      <AppBar className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <Typography 
            variant="h6"
            className={styles.title}
          >Reflection Loss</Typography>
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