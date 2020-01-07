import React from "react";
import { observer } from "mobx-react";
//import { Link } from "@reach/router";

import DateSetter from '../components/DateSetter'

import {
  Auth,
  Params,
  //Data 
} from '../store/mobx'

import { makeStyles } from "@material-ui/core/styles";
import {
  //Typography,
  Button,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  IconButton
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff
} from "@material-ui/icons";

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

  const auth = Auth
  const params = Params
  // const data = Data

  React.useEffect(() => {
    console.log(auth.email)
    console.log(auth.password)
  }, [auth.email, auth.password])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    auth.login();
  };

  return (
    <div className={classes.root}>
      <div className={classes.dateContainer}>
        <DateSetter />
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <FormControl fullWidth>
            <InputLabel>E-mail</InputLabel>
            <Input
              className={classes.input}
              type="email"
              id="email"
              value={auth.email}
              placeholder="Enter a valid e-mail"
              onChange={e => auth.setEmail(e.target.value)}
            />
          </FormControl>
        </div>
        <div className="form-control">
          <FormControl fullWidth>
            <InputLabel>Password</InputLabel>
            <Input
              className={classes.input}
              type={auth.showPassword ? "text" : "password"}
              id="password"
              value={auth.password}
              placeholder="Enter your password"
              onChange={e => auth.setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => auth.setShowPassword()}
                  >
                    {auth.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            type="submit"
            className={classes.button}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  )
})

export default Login