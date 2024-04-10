import { Container, Typography } from "@mui/material";
import React from "react";

export function ContentPageWrapper({ children, title, componentHeader }) {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <Container sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        padding: 2,
        paddingBottom: 0,
        margin: 2,
        marginTop: 0,
        marginBottom: 0,
      }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        {componentHeader}
      </Container>
      {children}
    </Container>
  );
}
