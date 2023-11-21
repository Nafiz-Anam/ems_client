import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("../App"));
const Home = lazy(() => import("../page/Home"));
const Faq = lazy(() => import("../page/Setting/Faq"));
const Login = lazy(() => import("../page/Auth/Login"));
const Users = lazy(() => import("../page/Users/Users"));
const PublicRoute = lazy(() => import("./PublicRoute"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Experts = lazy(() => import("../page/Expert/Experts"));
const AboutUs = lazy(() => import("../page/Setting/AboutUs"));
const JobPost = lazy(() => import("../page/JobPost/JobPost"));
const VerifyAccount = lazy(() => import("../page/Auth/Verify"));
const VerifyOTP = lazy(() => import("../page/Auth/VerifyOtp"));
const PageNotFound = lazy(() => import("../page/PageNotFound"));
const Bookings = lazy(() => import("../page/Bookings/Bookings"));
const Registration = lazy(() => import("../page/Auth/Registration"));
const UsersDetails = lazy(() => import("../page/Users/UserDetails"));
const LoginHistory = lazy(() => import("../page/Users/loginHistory"));
const UserBookings = lazy(() => import("../page/Users/UserBookings"));
const ExpertOrders = lazy(() => import("../page/Expert/ExpertOrders"));
const RefundPolicy = lazy(() => import("../page/Setting/RefundPolicy"));
const SupportChart = lazy(() => import("../page/Support/SupportChart"));
const ExpertDetails = lazy(() => import("../page/Expert/ExpertDetails"));
const RecoverAccount = lazy(() => import("../page/Auth/RecoverAccount"));
const RecoverPassword = lazy(() => import("../page/Auth/ChangePassword"));
const AddPassword = lazy(() => import("../page/Auth/AddPassword"));
const PrivacyPolicy = lazy(() => import("../page/Setting/PrivacyPolicy"));
const ChangePassword = lazy(() => import("../page/Setting/ChangePassword"));
const TermsCondition = lazy(() => import("../page/Setting/TermsCondition"));
const ExpertsRequest = lazy(() => import("../page/Request/ExpertsRequest"));
const JobPostDetails = lazy(() => import("../page/JobPost/JobPostDetails"));
const BookingDetails = lazy(() => import("../page/Bookings/BookingDetails"));
const PaymentGateway = lazy(() => import("../page/Payment/Payment-gateway"));
const AllCategories = lazy(() => import("../page/Categories/AllCategories"));
const SubCategories = lazy(() => import("../page/Categories/SubCategories"));
const SentNotification = lazy(() => import("../page/Setting/SentNotification"));
// const UserBookingDetails = lazy(() => import("../page/Users/UserBookingDetails"));
const GlobalLoader = lazy(() =>
    import("../components/share/loading/GlobalLoader")
);
// const ExpertsOrdersDetails = lazy(() => import("../page/Expert/ExpertsOrdersDetails"));
const ExpertRequestDetails = lazy(() =>
    import("../page/Request/ExpertRequestDetails")
);
const ExpertServicesRequest = lazy(() =>
    import("../page/Request/ExpertServicesRequest")
);

export const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<GlobalLoader />}>
                <PrivateRoute>
                    <App />{" "}
                </PrivateRoute>{" "}
            </Suspense>
        ),
        children: [
            // dashboard routes
            { index: true, element: <Home /> },
            { path: "/home", element: <Home /> },

            // categories routes
            { path: "/all-categories", element: <AllCategories /> },
            { path: "/sub-categories", element: <SubCategories /> },
            { path: "/sub-categories", element: <SubCategories /> },

            // job post routes
            { path: "/job-post/*", element: <JobPost /> },
            { path: "/job-post/details/:id", element: <JobPostDetails /> },

            // users routes
            // { path: '/all-users/*', element: <Users /> },
            { path: "/all-users/", element: <Users /> },
            { path: "/users/login-history/:id", element: <LoginHistory /> },
            { path: "/all-users/details/:id", element: <UsersDetails /> },
            {
                path: "/users/details/user-all-bookings/:id",
                element: <Bookings />,
            },
            {
                path: "/all-users/details/users-all-booking/:userId/booking-details/:detailsId",
                element: <UserBookings />,
            },

            // expert routes
            { path: "/experts/all-expert/*", element: <Experts /> },
            {
                path: "/experts/all-expert/details/:id",
                element: <ExpertDetails />,
            },
            {
                path: "/experts/all-expert/details/experts-all-orders/:expertId",
                element: <Bookings />,
            },
            {
                path: "/experts/all-expert/details/experts-all-orders/:userId/order-details/:detailsId",
                element: <ExpertOrders />,
            },

            // support chart routes
            { path: "/support-chart", element: <SupportChart /> },

            // booking routes
            { path: "/booking/*", element: <Bookings /> },
            {
                path: "/booking/booking-details/:id",
                element: <BookingDetails />,
            },

            // /expert-request
            { path: "/expert-request", element: <ExpertsRequest /> },
            { path: "/expert-request/:id", element: <ExpertRequestDetails /> },
            {
                path: "/expert-services-request",
                element: <ExpertServicesRequest />,
            },
            {
                path: "/expert-services-request/:id",
                element: <ExpertServicesRequest />,
            },

            // payment gateway routes
            { path: "/payment-gateway/*", element: <PaymentGateway /> },

            // setting routes
            { path: "/setting/change-password", element: <ChangePassword /> },
            {
                path: "/setting/sent-notification",
                element: <SentNotification />,
            },
            {
                path: "/setting/sent-notification",
                element: <SentNotification />,
            },
            { path: "/setting/faq", element: <Faq /> },
            { path: "/setting/terms-condition", element: <TermsCondition /> },
            { path: "/setting/privacy-policy", element: <PrivacyPolicy /> },
            { path: "/setting/refund-policy", element: <RefundPolicy /> },
            { path: "/setting/about-us", element: <AboutUs /> },
        ],
    },
    // page not found
    {
        path: "*",
        element: (
            <Suspense>
                {" "}
                <PageNotFound />{" "}
            </Suspense>
        ),
    },
    // auth routes
    {
        path: "/login",
        element: (
            <Suspense>
                {" "}
                <PublicRoute>
                    <Login />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/registration",
        element: (
            <Suspense>
                {" "}
                <PublicRoute>
                    <Registration />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/auth/verify-otp",
        element: (
            <Suspense>
                <PublicRoute>
                    <VerifyOTP />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/recover-account",
        element: (
            <Suspense>
                {" "}
                <PublicRoute>
                    <RecoverAccount />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/auth/verify-account",
        element: (
            <Suspense>
                <PublicRoute>
                    <VerifyAccount />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/auth/change-password",
        element: (
            <Suspense>
                <PublicRoute>
                    <RecoverPassword />
                </PublicRoute>
            </Suspense>
        ),
    },
    {
        path: "/auth/add-password",
        element: (
            <Suspense>
                <PublicRoute>
                    <AddPassword />
                </PublicRoute>
            </Suspense>
        ),
    },
]);
