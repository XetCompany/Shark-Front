import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CustomFileInput } from "@components/Input/CustomFileInput.jsx";
import userStore from "@store/UserStore.js";
import userApi from "@/api/UserApi.js";
import { useRouterStore } from "mobx-state-router";
import { RoutesEnum } from "@/router/index.jsx";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
}));

export const Profile = observer(() => {
  const classes = useStyles();
  const routerStore = useRouterStore();
  const [profile, setProfile] = useState({
    username: null,
    fullname: null,
    phone: null,
    description: null,
    image: null,
  });

  useEffect(() => {
    const loadProfile = async () => {
      await userStore.updateUser();
      setProfile({
        username: userStore.username,
        fullname: userStore.fullName,
        phone: userStore.phone,
        description: userStore.description,
        image: userStore.image || null,
      });
    };
    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setProfile((prev) => ({
      ...prev,
      phone: value.startsWith("+") ? value : `+${value}`,
    }));
  };

  const handleSaveUser = async () => {
    try {
      await userApi.putUserInfo(profile);
      routerStore.goTo(RoutesEnum.HOME);
    } catch (error) {
      console.error("Ошибка при сохранении профиля:", error);
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar src={profile.image} className={classes.avatar} />
          <CustomFileInput
            fileData={profile.image}
            setFileBase64={(base64) =>
              setProfile((prevState) => ({ ...prevState, image: base64 }))
            }
            accept=".png, .jpeg, .jpg"
            placeholder="Выберите изображение"
          />
        </Box>
        <TextField
          fullWidth
          label="Имя пользователя"
          name="username"
          margin="normal"
          value={profile.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Полное имя"
          name="fullname"
          margin="normal"
          value={profile.fullname}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Телефон"
          name="phone"
          margin="normal"
          value={profile.phone}
          onChange={handlePhoneChange}
        />
        <TextField
          fullWidth
          label="Описание"
          name="description"
          multiline
          rows={4}
          margin="normal"
          value={profile.description}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSaveUser}
        >
          Сохранить изменения
        </Button>
      </CardContent>
    </Card>
  );
});
