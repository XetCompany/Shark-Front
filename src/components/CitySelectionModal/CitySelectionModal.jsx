import React from "react";
import { Modal, Box, Typography, Autocomplete, TextField } from "@mui/material";
import { Button } from "@components/Button/Button.jsx";

export const CitySelectionModal = ({
  isOpen,
  cities,
  selectedCity,
  onSelectCity,
  onClose,
}) => {
  let options = [];
  cities.map((city) => options.push(city.city));
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          height: 300,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выберите город доставки:
        </Typography>
        <Autocomplete
          id="city-autocomplete"
          options={options}
          getOptionLabel={(option) => option.name}
          value={selectedCity}
          onChange={(event, newValue) => onSelectCity(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Город" margin="normal" />
          )}
        />
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 3,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          После выбора города нажмите "Продолжить оформление заказа"
        </Typography>
        <Button onClick={onClose}>Продолжить оформление заказа</Button>
      </Box>
    </Modal>
  );
};

export default CitySelectionModal;
