// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";


const notificationData = [
    // {
    //     message: "Lol Hd",
    //     type: "2 Days ago",
    //     dateTime: new Date()
    // },

    {
        type: 'done',
        message: "his is coming",
        date : '2 Days Ago'
    },
    {
        type: 'warning-error',
        message: "his is coming",
        date : '2 Days Ago'
    },
    {
        type: 'warning-warning',
        message: "his is coming",
        date : '2 Days Ago'
    },
    {
        type: 'quiz',
        message: "his is coming",
        date : '2 Days Ago'
    },
    {
        type: 'payment',
        message: "his is coming",
        date : '2 Days Ago'
    },
]

function NotificationsBox() {

    const renderedNotifications = notificationData.map(({message, type, date}) => {

        let title, icon, color, dateTime

        title = message;
        dateTime = date;

        if(type === 'done'){
            color = 'success'
            icon = 'done'
        }else if(type === 'warning-error'){
            color = 'error'
            icon = 'warning'
        }
        else if(type === 'warning-warning'){
            color = 'warning'
            icon = 'warning'
        }else if(type === 'quiz'){
            color = 'secondary'
            icon = 'quiz'
        }
        else if (type === 'payment'){
            color = 'success'
            icon = 'payment'
        }


        return (
            <TimelineItem
                color={color}
                icon={icon}
                title={title}
                dateTime={dateTime}
            />
        )
    })
    return (
        <Card className="h-100">
            <SuiBox pt={3} px={3}>
                <SuiTypography variant="h6" fontWeight="medium">
                    Notifications
                </SuiTypography>
            </SuiBox>

            <SuiBox p={2}>
                {renderedNotifications}
            </SuiBox>
        </Card>
    );
}

export default NotificationsBox;
