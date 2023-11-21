import { PaymentGatewayIcon } from "./DashboardIcons";
import {
  BookingIcon,
  Categories,
  ChatBoldIcon,
  ClipboardIcon,
  DashboardIcon,
  ExpertIcon,
  RequestIcon,
  SettingIcon,
  UserIcon,
} from "./SideNavigationIcons";

export const sidebarDatas = [
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
        id: 131232,
        name: "Categories",
        url: "",
        icon: (
          <Categories className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 21321, name: "All Categories", url: "/all-categories" },
          { id: 21, name: "Sub Categories", url: "/sub-categories" },

        ],
      },
      {
        id: 23123123,
        name: "Job Posts",
        url: "",
        icon: (
          <ClipboardIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 2313, name: "On Process", url: "/job-post/on-process" },
          { id: 224, name: "Complete ", url: "/job-post/completed" },
          { id: 212345, name: "Canceled", url: "/job-post/cancelled" },
        ],
      },
      {
        id: 31231232,
        name: "Users",
        url: "/all-users",
        icon: (
          <UserIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          // { id: 212213, name: "All User", url: "/all-users" },
          // { id: 2547344, name: "Number verified", url: "/all-users/phone-verified" },
          // { id: 257565, name: "Email verified", url: "/all-users/email-verified" },
        ],
      },
      {
        id: 43123,
        name: "Experts",
        url: "/experts/all-expert",
        icon: (
          <ExpertIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          // { id: 23, name: "All Experts", url: "/experts/all-expert" },
          // { id: 24, name: "Email Unverified", url: "/experts/all-expert/email-unverified" },
          // { id: 25, name: "Mobile Unverified", url: "/experts/all-expert/phone-unverified" },
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
      {
        id: 4,
        name: "Booking",
        url: "",
        icon: (<BookingIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 2322, name: "All Booking", url: "/booking" },
          { id: 2321, name: "Completed", url: "/booking/completed" },
          { id: 23233, name: "Canceled", url: "/booking/cancelled" },
          { id: 23123133, name: "On Going", url: "/booking/on-going" },
          { id: 23123, name: "Accepted", url: "/booking/accepted" },
        ],
      },
      {
        id: 4,
        name: "Request",
        url: "/expert-request",
        icon: (
          <RequestIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 23, name: "Expert Request", url: "/expert-request" },
          { id: 23, name: "Expert Services Request", url: "/expert-services-request" },
        ],
      },
      // {
      //   id: 4,
      //   name: "Payment Gateway",
      //   url: "/payment-gateway",
      //   icon: (
      //     <PaymentGatewayIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
      //   ),
      //   submenu: [
      //     { id: 23, name: "Card", url: "/payment-gateway/card" },
      //     { id: 24, name: "Mobile Banking", url: "/payment-gateway/mobile-banking" },
      //     { id: 25, name: "Banking", url: "/payment-gateway/banking" },
      //   ],
      // },
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
          { id: 23123, name: "Sent Notification", url: "/setting/sent-notification" },
          { id: 231223, name: "Change Password", url: "/setting/change-password" },
          { id: 231223, name: "Faq", url: "/setting/faq" },
          { id: 231223, name: "Privacy Policy", url: "/setting/privacy-policy" },
          { id: 231223, name: "Terms & Condition", url: "/setting/terms-condition" },
          { id: 231223, name: "Refund Policy", url: "/setting/refund-policy" },
          { id: 231223, name: "About Us", url: "/setting/about-us" },

        ],
      },
    ],
  },
];
