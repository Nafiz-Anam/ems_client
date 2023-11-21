import {
    ChatBoldIcon,
    ClipboardIcon,
    DashboardIcon,
    PaymentIcon,
    SettingIcon,
    UserIcon,
} from "./SideNavigationIcons";

export const SidebarData = [
    {
        id: 13123,
        title: "MENU",
        mainMenus: [
            {
                id: 11,
                name: "Dashboard",
                url: "/",
                icon: (
                    <DashboardIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
                ),
                submenu: [],
            },
        ],
    },
    {
        id: 212313,
        title: "APP MANAGEMENT",
        mainMenus: [
            {
                id: 31231232,
                name: "Employees",
                url: "",
                icon: (
                    <UserIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
                ),
                submenu: [
                    {
                        id: 2313,
                        name: "All Employees",
                        url: "/employees/all_employees",
                    },
                    {
                        id: 2313,
                        name: "All Bank Accounts",
                        url: "/employees/bank_accounts",
                    },
                ],
            },
            {
                id: 31231232,
                name: "Payouts",
                url: "/all-payouts",
                icon: (
                    <PaymentIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
                ),
                submenu: [],
            },
            {
                id: 23123123,
                name: "Job Posts",
                url: "",
                icon: (
                    <ClipboardIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
                ),
                submenu: [
                    {
                        id: 2313,
                        name: "On Process",
                        url: "/job-post/on-process",
                    },
                    { id: 224, name: "Complete ", url: "/job-post/completed" },
                ],
            },
            {
                id: 1234,
                name: "Support Chat",
                url: "/support-chart",
                icon: (
                    <ChatBoldIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
                ),
                submenu: [],
            },
        ],
    },
    {
        id: 4,
        title: "SETTINGS",
        mainMenus: [
            {
                id: 1124,
                name: "Setting",
                url: "/setting",
                icon: (
                    <SettingIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
                ),
                submenu: [
                    {
                        id: 23123,
                        name: "Sent Notification",
                        url: "/setting/sent-notification",
                    },
                    {
                        id: 231223,
                        name: "Change Password",
                        url: "/setting/change-password",
                    },
                    { id: 231223, name: "Faq", url: "/setting/faq" },
                    {
                        id: 231223,
                        name: "Privacy Policy",
                        url: "/setting/privacy-policy",
                    },
                    {
                        id: 231223,
                        name: "Terms & Condition",
                        url: "/setting/terms-condition",
                    },
                    {
                        id: 231223,
                        name: "Refund Policy",
                        url: "/setting/refund-policy",
                    },
                    { id: 231223, name: "About Us", url: "/setting/about-us" },
                ],
            },
        ],
    },
];
