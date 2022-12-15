import React, { useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";

import Todos from "./components/Todos/Todos";
import Form from "./components/Form/Form";
import getItDone from "./assets/images/getItDone.png";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const get_id = (data) => {
    setCurrentId(data);
  };

  return (
    <Container maxWidth="lg">
      <AppBar
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          padding: "10px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        position="static"
        color="inherit">
        <Typography sx={{ marginRight: "15px" }} variant="h4" align="center">
          Get it Done
        </Typography>
        <img src={getItDone} alt="get-it-done" height="40" width="60" />
      </AppBar>

      <Grow in>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={4}>
            <Form id={currentId} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Todos id={get_id} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default App;
