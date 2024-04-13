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
  if (!userStore.username) userStore.updateUser();
  const routerStore = useRouterStore();
  const classes = useStyles();

  const [profile, setProfile] = useState({
    username: userStore.username,
    fullname: userStore.fullName,
    phone: userStore.phone,
    description: userStore.description,
    image: userStore.image,
    photoName: null,
    imageValue: null,
  });
  useEffect(() => {
    userStore.updateUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    await userApi.putUserInfo(profile);
    await routerStore.goTo(RoutesEnum.HOME);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={
              profile.image ||
              "https://www.example.com/path-to-default-image.jpg"
            }
            className={classes.avatar}
          />
          <CustomFileInput
            fileData={profile.imageValue}
            setFileBase64={(base64) => {
              setProfile((prevState) => ({
                ...prevState,
                image: base64,
              }));
            }}
            setFileData={(data) => {
              setProfile((prevState) => ({
                ...prevState,
                imageValue: data,
              }));
            }}
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
          onChange={handleChange}
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
