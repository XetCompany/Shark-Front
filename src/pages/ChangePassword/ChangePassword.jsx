import React, { useState } from "react";
import { observer } from "mobx-react";
import { Box, TextField, Button, Typography } from "@mui/material";
import UserApi from "@/api/UserApi.js";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

export const ChangePassword = observer(() => {
  const routerStore = useRouterStore();
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswords = () => {
    if (!passwords.old_password || !passwords.new_password) {
      setError("Пожалуйста заполните все поля!");
      return false;
    }
    if (passwords.new_password.length < 8) {
      setError("Новый пароль должен быть длиньше 8 символов");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validatePasswords()) {
      console.log("Новый пароль: ", passwords);
      const response = await UserApi.changePassword(passwords);
      if (response.status === 200) {
        routerStore.goTo(RoutesEnum.HOME);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={handleSubmit}
      noValidate
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Смена пароля
      </Typography>
      <TextField
        label="Текущий пароль"
        type="password"
        name="old_password"
        variant="outlined"
        required
        value={passwords.old_password}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Новый пароль"
        type="password"
        name="new_password"
        variant="outlined"
        required
        value={passwords.new_password}
        onChange={handleChange}
        fullWidth
      />
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Сменить
      </Button>
    </Box>
  );
});
