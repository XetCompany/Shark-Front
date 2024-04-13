import { observer } from "mobx-react";
import { Box, Modal, Typography } from "@mui/material";
import errorStore from "@store/ErrorStore.js";

export const ErrorModal = observer(() => {
  return (
    <Modal open={errorStore.errorMessage !== null} onClose={() => errorStore.setError(null)}>
      <Box
        sx={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Error
        </Typography>
        <Typography variant="body1" gutterBottom>
          {errorStore.errorMessage}
        </Typography>
      </Box>
    </Modal>
  )
});