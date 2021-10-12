import React, { useContext, useState, useCallback, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import PropertyCard from "./PropertyCard";
import { useHistory } from "react-router-dom";
import API from "../../services/api";
import userContext from "../../lib/context";
import useAPI from "../../services/useApi";

const PropertyViewContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding: 16px;
`;

function PropertyView() {
  const history = useHistory();
  const { user } = useContext(userContext);
  const [properties, setProperties] = useState([]);

  const fetchAllProperties = useCallback(() => {
    return API.getAllProperties(user.token);
  }, [user]);

  const [{ inProgress, error, data }, makeAPIRequest] =
    useAPI(fetchAllProperties);

  useEffect(() => {
    makeAPIRequest();
  }, []);

  useEffect(() => {
    if (!inProgress && !error && !!data) {
      setProperties(data);
    }
  }, [inProgress, error, data]);

  return (
    <PropertyViewContainer>
      {inProgress && <CircularProgress />}
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Open Properties</Typography>
        <Button
          onClick={() => history.push("/property/add")}
          color="secondary"
          variant="outlined"
          sx={{
            marginLeft: "8px",
          }}
        >
          <AddIcon />
          Add
        </Button>
      </Box>
      <Divider sx={{ marginTop: "8px" }} />
      {!properties.filter((p) => p.open).length && (
        <Typography variant="body1" marginTop={1}>
          No open properties
        </Typography>
      )}
      {properties
        .filter((p) => p.open)
        .map((p) => (
          <PropertyCard property={p} />
        ))}
      <Typography variant="h4" sx={{ marginTop: "32px" }}>
        Closed Properties
      </Typography>
      <Divider sx={{ marginTop: "8px" }} />
      {!properties.filter((p) => !p.open).length && (
        <Typography variant="body1" marginTop={1}>
          No closed properties
        </Typography>
      )}
      {properties
        .filter((p) => !p.open)
        .map((p) => (
          <PropertyCard property={p} />
        ))}
    </PropertyViewContainer>
  );
}

export default PropertyView;
