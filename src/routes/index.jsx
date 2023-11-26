import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import CreateSalaryPayout from "../page/Payouts/AddPayout";

const App = lazy(() => import("../App"));
const Home = lazy(() => import("../page/Home"));
const Login = lazy(() => import("../page/Auth/Login"));
const Users = lazy(() => import("../page/Users/UserTable"));
const PublicRoute = lazy(() => import("./PublicRoute"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const AboutUs = lazy(() => import("../page/Setting/AboutUs"));
const JobPost = lazy(() => import("../page/JobPost/JobPost"));
const AccountDetails = lazy(() => import("../page/Users/AccountDetails"));
const CreateEmployee = lazy(() => import("../page/Users/CreateEmployee"));
const CreateBank = lazy(() => import("../page/Users/AddBank"));
const ContactDetails = lazy(() => import("../page/Users/ContactDetails"));
const AcademicDetails = lazy(() => import("../page/Users/AcademicDetails"));
const KycDetails = lazy(() => import("../page/Users/KycDetails"));
const PayoutTable = lazy(() => import("../page/Payouts/PayoutTable"));
const PayoutDetails = lazy(() => import("../page/Payouts/PayoutDetails"));
const VerifyAccount = lazy(() => import("../page/Auth/Verify"));
const VerifyOTP = lazy(() => import("../page/Auth/VerifyOtp"));
const PageNotFound = lazy(() => import("../page/PageNotFound"));
const Registration = lazy(() => import("../page/Auth/Registration"));
const UsersDetails = lazy(() => import("../page/Users/UserDetails"));
const BankAccounts = lazy(() => import("../page/Users/BankAccounts"));
const RefundPolicy = lazy(() => import("../page/Setting/RefundPolicy"));
const SupportChart = lazy(() => import("../page/Support/SupportChart"));
const RecoverAccount = lazy(() => import("../page/Auth/RecoverAccount"));
const RecoverPassword = lazy(() => import("../page/Auth/ChangePassword"));
const AddPassword = lazy(() => import("../page/Auth/AddPassword"));
const PrivacyPolicy = lazy(() => import("../page/Setting/PrivacyPolicy"));
const ChangePassword = lazy(() => import("../page/Setting/ChangePassword"));
const TermsCondition = lazy(() => import("../page/Setting/TermsCondition"));
const JobPostDetails = lazy(() => import("../page/JobPost/JobPostDetails"));
const SentNotification = lazy(() => import("../page/Setting/SentNotification"));

const GlobalLoader = lazy(() =>
    import("../components/share/loading/GlobalLoader")
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

            // job post routes
            { path: "/job-post/*", element: <JobPost /> },
            { path: "/job-post/details/:id", element: <JobPostDetails /> },

            // payout routes
            { path: "/payouts/*", element: <PayoutTable /> },
            { path: "/payouts/create", element: <CreateSalaryPayout /> },
            { path: "/payouts/details/:id", element: <PayoutDetails /> },

            // users routes
            { path: "/employees/*", element: <Users /> },
            { path: "/employees/create", element: <CreateEmployee /> },
            { path: "/employees/create/bank-details", element: <CreateBank /> },
            { path: "/employees/bank_accounts", element: <BankAccounts /> },
            { path: "/employees/details/:id", element: <UsersDetails /> },
            {
                path: "/employees/account/details/:id",
                element: <AccountDetails />,
            },
            {
                path: "/employees/contact/details/:id",
                element: <ContactDetails />,
            },
            {
                path: "/employees/academic/details/:id",
                element: <AcademicDetails />,
            },
            {
                path: "/employees/kyc/details/:id",
                element: <KycDetails />,
            },

            // support chart routes
            { path: "/support-chart", element: <SupportChart /> },

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
