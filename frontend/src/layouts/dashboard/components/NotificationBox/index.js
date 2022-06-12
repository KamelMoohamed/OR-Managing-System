// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";

const NotificationData = [
  {
    type: "done",
    message: "his is coming",
    date: "2 Days Ago",
  },
  {
    type: "warning-error",
    message: "his is coming",
    date: "2 Days Ago",
  },
  {
    type: "warning-warning",
    message: "his is coming",
    date: "2 Days Ago",
  },
  {
    type: "quiz",
    message: "his is coming",
    date: "2 Days Ago",
  },
  {
    type: "payment",
    message: "his is coming",
    date: "2 Days Ago",
  },
];

function NotificationsBox() {
  const [notificationData, setNotificationData] = useState(NotificationData);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/user/notification`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const responseData = await response.json();
        const output = responseData.notification.slice(0, 5).map((d) => {
          return {
            type: d.type,
            message: d.message,
            date: d.date,
          };
        });
        setNotificationData(output);
      } catch (err) {
        console.log(err);
      }
    };
    getNotifications();
  }, []);

  const renderedNotifications = notificationData.map(({ message, type, date }) => {
    let title, icon, color, dateTime;

    title = message;
    dateTime = date;

    if (type === "done") {
      color = "success";
      icon = "done";
    } else if (type === "warning-error") {
      color = "error";
      icon = "warning";
    } else if (type === "warning-warning") {
      color = "warning";
      icon = "warning";
    } else if (type === "quiz") {
      color = "secondary";
      icon = "quiz";
    } else if (type === "payment") {
      color = "success";
      icon = "payment";
    }

    return <TimelineItem color={color} icon={icon} title={title} dateTime={dateTime} />;
  });
  return (
    <Card className="h-100">
      <SuiBox pt={3} px={3}>
        <SuiTypography variant="h6" fontWeight="medium">
          Notifications
        </SuiTypography>
      </SuiBox>

      <SuiBox p={2}>{renderedNotifications}</SuiBox>
    </Card>
  );
}

export default NotificationsBox;
