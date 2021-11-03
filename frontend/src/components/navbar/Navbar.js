import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  NAVBAR_HEIGHT,
  ROLE_GUEST,
  ROLE_MANAGER,
  USER_KEY,
  SUBNAV_HEIGHT,
} from "../../const";
import { Grid, Button, Typography, useTheme, Divider } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";
import userContext from "../../lib/context";
import { Box } from "@mui/system";

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  height: ${NAVBAR_HEIGHT}px;
  width: 100%;

  color: white;
  background-color: ${(props) => props.theme.palette.primary.dark};
`;

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  height: ${SUBNAV_HEIGHT}px;
  width: 100%;

  color: white;
  background-color: ${(props) => props.theme.palette.primary.main};
`;

function Navbar({ role, path }) {
  const history = useHistory();
  const theme = useTheme();
  const { user, setUserContext } = useContext(userContext);
  const [currentRoute, setCurrentRoute] = useState(history.location.pathname);

  const isPropertyManager = role === ROLE_MANAGER;
  const isGuest = role === ROLE_GUEST;

  const isLoginPage = isGuest && currentRoute === "/";
  const isRegisterPage = isGuest && currentRoute === "/register";
  const isPublicPropertyPage = isGuest && currentRoute === "/properties";

  const { path: matched } = useRouteMatch();

  const logOut = () => {
    setUserContext({ token: null });
    localStorage.removeItem(USER_KEY);
    history.push("/");
  };

  const getSubheading = () => {
    for (const route of path) {
      if (route.path === matched) {
        return route.name;
      }
    }
    return "Error: Pathname not found";
  };

  useEffect(() => {
    setCurrentRoute(history.location.pathname);
  }, [history]);

  return (
    <>
      <Nav theme={theme}>
        <Typography variant="h3">RIS</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isPropertyManager && (
            <>
              <Typography>{`Hello Agent ${user.token}`}</Typography>
              <Divider
                orientation="vertical"
                sx={{
                  height: `${NAVBAR_HEIGHT / 2}px`,
                  backgroundColor: "white",
                  marginLeft: "16px",
                }}
              />
            </>
          )}
          {isGuest && (
            <Button
              variant="filled"
              onClick={() => history.push("/properties")}
            >
              View Listed Properties
            </Button>
          )}
          {(isPublicPropertyPage || isRegisterPage) && (
            <Button variant="filled" onClick={() => history.push("/")}>
              Sign In
            </Button>
          )}
          {(isPublicPropertyPage || isLoginPage) && (
            <Button variant="filled" onClick={() => history.push("/register")}>
              Don't have an account? Register here
            </Button>
          )}
          {isPropertyManager && (
            <Button variant="filled" onClick={() => history.push("/")}>
              Properties
            </Button>
          )}
          {isPropertyManager && (
            <Button variant="filled" onClick={() => history.push("/route")}>
              Create Itinerary
            </Button>
          )}
          {isPropertyManager && (
            <Button variant="filled" onClick={logOut}>
              Sign Out
            </Button>
          )}
        </Box>
      </Nav>
      <SubNav theme={theme}>
        <Typography variant="h6">{getSubheading()}</Typography>
      </SubNav>
    </>
  );
}

export default Navbar;
