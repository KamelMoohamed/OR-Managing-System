// Images
import kal from "assets/images/kal-visuals-square.jpg";
import marie from "assets/images/marie.jpg";
import ivana from "assets/images/ivana-square.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const operationListData = [
    {
        drName: "Ibrahim Mohamed",
        drImage: kal,
        operationType: 'Major',
        time: '2:30 PM',
        date: '21/7/2022',
        action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "see more",
        },
    },
    {
        drName: "Kamel Mohamed",
        drImage: marie,
        operationType: 'Mar',
        time: '2:30 PM',
        date: '21/8/2022',

        action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "see more",
        },
    },
    {
        drName: "Youssef Shaaban",
        drImage: ivana,
        operationType: 'Pathology',
        time: '2:30 PM',
        date: '21/9/2022',
        action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "see more",
        },
    },
    {
        drName: "Romaisaa Sherif",
        drImage: team4,
        operationType: 'Lol',
        time: '2:30 PM',
        date: '21/3/2022',
        action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "see more",
        },
    },
    {
        drName: "Ahmed Hesham",
        drImage: team3,
        operationType: 'Cardiovascular',
        time: '2:30 PM',
        date: '21/5/2022',
        action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "see more",
        },
    },
    {
        drName: "Eman Ibrahim",
        drImage: team3,
        operationType: 'Cardiovascular',
        time: '2:30 PM',
        date: '21/5/2022',
        action: {
            type: "internal",
            route: "/pages/profile/profile-overview",
            color: "info",
            label: "see more",
        },
    },
];

export default operationListData;
