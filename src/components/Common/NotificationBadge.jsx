import { observer } from "mobx-react";
import { Badge, Box, Button, Paper, Popover, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import userStore from "@store/UserStore.js";
import { useState } from "react";
import { NotificationsApi } from "@/api/NotificationsApi.js";
import { useRouterStore } from "mobx-state-router";
import { NOTIFICATION_TYPES } from "@common/common.js";
import { RoutesEnum } from "@/router/index.jsx";

const Notification = observer(({ notification }) => {
  const routerStore = useRouterStore();

  if (notification.type === NOTIFICATION_TYPES.TEXT) {
    return (
      <Typography variant="body1">{notification.text}</Typography>
    );
  } else if (notification.type === NOTIFICATION_TYPES.EVALUATION) {
    return (
      <div>
        <Typography variant="body1">На ваш продукт оставлен отзыв</Typography>
        <Button
          onClick={() => {
            routerStore.goTo(RoutesEnum.M_PRODUCTS_DETAILS, {
              params: { id: notification.additional_data.product_id.toString() },
            });
          }}
        >
          Перейти к продукту
        </Button>
      </div>
    );
  } else if (notification.type === NOTIFICATION_TYPES.ORDER) {
    return (
      <div>
        <Typography variant="body1">На ваш продукт оставлен заказ</Typography>
        <Button
          // onClick={() => {
          //   routerStore.goTo(RoutesEnum.M_ORDER, {
          //     params: {
          //       orderId: notification.additional_data.order_id.toString(),
          //     },
          //   });
          // }}
          onClick={() => {
            // ToDo когда будет страница заказа
            routerStore.goTo(RoutesEnum.M_ORDERS);
          }}
        >
          Перейти к заказу
        </Button>
      </div>
    );
  } else if (notification.type === NOTIFICATION_TYPES.DELIVERED) {
    return (
      <div>
        <Typography variant="body1">Ваш заказ доставлен</Typography>
        <Button
          onClick={() => {
            routerStore.goTo(RoutesEnum.ORDER,
              {
                params: {
                  orderId: notification.additional_data.order_id.toString(),
                },
              },
            );

          }}
        >
          Перейти к заказу
        </Button>
      </div>
    );
  } else if (notification.type === NOTIFICATION_TYPES.CAN_COMMENT) {
    return (
      <div>
        <Typography variant="body1">Вы можете оставить отзыв на продукт</Typography>
        <Button
          onClick={() => {
            routerStore.goTo(RoutesEnum.PRODUCT, {
              params: {
                prodId: notification.additional_data.product_id.toString(),
              },
            });
          }}
        >
          Перейти к продукту
        </Button>
      </div>
    );
  } else {
    return (
      <Typography variant="body1">Неизвестный тип уведомления</Typography>
    );
  }
});

const NotificationWrapper = observer(({ notification, index }) => {
  return (
    <div style={{
      width: "100%",
    }}>
      <Badge color="secondary" badgeContent={notification.is_read ? null : " "} style={{
        width: "100%",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          marginTop: index === 0 ? 0 : 10,
          width: "100%",
        }}>
          <Paper style={{
            padding: 10,
            backgroundColor: notification.is_read ? "#2F2F2F" : "#474747",
          }}>
            <Notification notification={notification} />
          </Paper>
        </div>
      </Badge>
    </div>
  );
});

const ModalNotifications = observer(({ anchorEl, setAnchorEl }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}

      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{
        p: 2,
        minWidth: 300,
      }}>
        <div style={{
          marginBottom: 10,
        }}>
          <Typography variant="h6">Уведомления</Typography>
          <Button
            onClick={async () => {
              await NotificationsApi.markAllAsRead();
              await userStore.updateNotifications();
            }}
          >
            Прочитать все
          </Button>
        </div>
        {/* только первые 5 уведов */}
        {userStore.notifications.slice(0, 5).map((notification, index) => (
          <NotificationWrapper key={index} notification={notification} index={index} />
        ))}
      </Box>
    </Popover>
  );
});

export const NotificationBadge = observer(() => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div style={{
      marginRight: 20,
      // position: "relative",
    }}>
      <Badge
        badgeContent={userStore.notifications.filter((notification) => !notification.is_read).length}
        color="primary"
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MailIcon color="action" />
      </Badge>
      <ModalNotifications anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </div>
  );
});
