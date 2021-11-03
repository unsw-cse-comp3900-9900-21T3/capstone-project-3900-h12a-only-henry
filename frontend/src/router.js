import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import PropertyView from "./components/property/PropertyView";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import userContext from "./lib/context";
import {
  NAVBAR_HEIGHT,
  ROLE_MANAGER,
  ROLE_GUEST,
  SUBNAV_HEIGHT,
} from "./const";
import Navbar from "./components/navbar/Navbar";
import PropertyDetails from "./components/property/PropertyDetails";
import PropertyEdit from "./components/property/PropertyEdit";
import PropertyAdd from "./components/property/PropertyAdd";
import RouteComponent from "./components/itinerary/Route";
import PropertyViewPublic from "./components/property/PropertyViewPublic";

const Page = styled.div`
  width: 100vw;
  height: calc(100vh - ${NAVBAR_HEIGHT}px - ${SUBNAV_HEIGHT}px);
`;

export const paths = [
  {
    path: "/register",
    exact: true,
    strict: true,
    component: Register,
    name: "Register",
  },
  {
    path: "/",
    exact: true,
    strict: true,
    component: Login,
    name: "Login",
  },
  {
    path: "/property",
    exact: true,
    strict: true,
    component: PropertyViewPublic,
    name: "Listed Properties",
  },
  {
    path: "/property/:estateId",
    exact: true,
    strict: true,
    component: PropertyDetails,
    name: "Property Details",
  },
];

export const managerPaths = [
  {
    path: "/",
    exact: true,
    strict: true,
    component: PropertyView,
    name: "Properties",
  },
  {
    path: "/property/:estateId/edit",
    exact: true,
    strict: true,
    component: PropertyEdit,
    name: "Editing Property",
  },
  {
    path: "/property/add",
    exact: true,
    strict: true,
    component: PropertyAdd,
    name: "Creating Property",
  },
  {
    path: "/property/:estateId",
    exact: true,
    strict: true,
    component: PropertyDetails,
    name: "Property Details",
  },
  {
    path: "/route",
    exact: true,
    strict: true,
    component: RouteComponent,
    name: "Creating inspection route",
  },
];

// Page Layout
function Layout({ Content, user, activePath }) {
  return (
    <>
      <Navbar
        role={!!user.token ? ROLE_MANAGER : ROLE_GUEST}
        path={activePath}
      />
      <Page>
        <Content />
      </Page>
    </>
  );
}

export const inspectorPaths = [{}];

function Router() {
  const { user } = useContext(userContext);

  // TODO: Implement some condition to switch between different routes
  const activePath = !user.token ? paths : managerPaths;

  return (
    <BrowserRouter>
      <Switch>
        {activePath.map((p, i) => (
          <Route
            path={p.path}
            exact={p.exact}
            strict={p.strict}
            key={`ris-path-${i}`}
          >
            <Layout Content={p.component} user={user} activePath={activePath} />
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
