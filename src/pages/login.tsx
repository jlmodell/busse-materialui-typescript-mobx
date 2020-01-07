import React from "react";
import { observer } from "mobx-react";
import { Link } from "@reach/router";

import { Auth, Params, Data } from '../store/mobx'

import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Button,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    IconButton
  } from "@material-ui/core";
  import { Visibility, VisibilityOff } from "@material-ui/icons";
  
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(4, 4)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    input: {
      flex: 1
    },
    formControl: {
      margin: theme.spacing(1)
    },
    button: {
      background: "teal",
      color: "white",
      marginRight: "1rem",
      marginTop: "1rem"
    },
    clearButton: {
      color: "teal",
      marginRight: "1rem",
      marginTop: "1rem"
    },
    typography: {
      display: "flex",
      justifyContent: "center"
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem"
    },
    dateContainer: {
      marginTop: "2rem"
    }
  }));

  const Login = observer(() => {
    const classes = useStyles();
    const store = users;
    const salesStore = sales;
  
    const handleSubmit = e => {
      e.preventDefault();
      store.login();
    };

    return (
        <div className={classes.root}>
    )
})