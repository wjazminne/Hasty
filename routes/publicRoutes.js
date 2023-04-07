import { lazy } from 'react';

const Landing = lazy(() => import('../pages/landing/Landing'));
const Listings = lazy(() => import('../components/listings/Listings'));
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'));
const ServerError = lazy(() => import('../pages/error/ServerError'));
const Contact = lazy(() => import('../components/contactus/Contact'));
const Register = lazy(() => import('../pages/user/Register'));
const Login = lazy(() => import('../pages/user/Login'));
const ListingDetails = lazy(() => import('../pages/listingdetails/ListingDetails'));
const AboutUs = lazy(() => import('../components/aboutus/AboutUs'));
const Confirm = lazy(() => import('../pages/user/Confirm'));
const ForgotPassword = lazy(() => import('../pages/user/ForgotPassword'));
const FileUpload = lazy(() => import('../components/files/FileUploadExample'));
const BlogsList = lazy(() => import('../components/blogs/BlogsList'));
const BlogDetails = lazy(() => import('../components/blogs/BlogDetails'));
const PrivacyPolicy = lazy(() => import('../components/cookiepolicy/PrivacyStatement'));
const CookiePolicy = lazy(() => import('../components/cookiepolicy/CookieStatement'));
const ChangePassword = lazy(() => import('../pages/user/ChangePassword'));
const Faq = lazy(() => import('../components/faq/Faq'));
const Ratings = lazy(() => import('../components/rating/Ratings'));
const DonationForm = lazy(()=> import('../components/donations/DonationForm'))
const CharitableFunds = lazy(() => import('../components/charitablefunds/charitableFunds'));
const Newsletters = lazy(() => import('../components/newsletter/Newsletters'));
const AddNewsletter = lazy(() => import('../components/newsletter/AddNewsletter'));
const NewsletterPreview = lazy(() => import('../components/newsletter/NewsletterPreview'));
const SiteReference = lazy(() => import('../pages/SiteReference'));
const SubscriptionPage = lazy(() => import('../components/subscription/SubscriptionPage'));
const NewsletterUnsubPage = lazy(() => import('../components/newslettersubscription/NewsletterUnsubscribePage'));
const Podcast = lazy(() => import('../components/podcast/Podcast'));
const SurveyBuilder = lazy(() => import('../components/surveyquestions/SurveyBuilder'));
const TakeSurvey = lazy(() => import('../components/surveys/TakeSurvey'));

const routes = [
  {
    path: '/takesurvey',
    name: 'Take Survey',
    exact: true,
    element: TakeSurvey,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/',
    name: 'Landing',
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/unsubscribe',
    name: 'Newsletter Unsubscribe',
    exact: true,
    element: NewsletterUnsubPage,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/faq',
    name: 'Faq',
    exact: true,
    element: Faq,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/podcast',
    name: 'Podcast',
    element: Podcast,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicy',
    exact: true,
    element: PrivacyPolicy,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/cookies',
    name: 'CookiePolicy',
    exact: true,
    element: CookiePolicy,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/contactus',
    name: 'Contact',
    exact: true,
    element: Contact,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/register',
    name: 'Register',
    exact: true,
    element: Register,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/siteref',
    name: 'SiteRef',
    exact: true,
    element: SiteReference,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/login',
    name: 'Login',
    exact: true,
    element: Login,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    exact: true,
    element: AboutUs,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/listings/:id',
    name: 'Listing Details',
    exact: true,
    element: ListingDetails,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/confirm',
    name: 'Confirm',
    exact: true,
    element: Confirm,
    roles: [],
    isAnonymous: true,
  },
  {
    path: `/listings`,
    name: `Listings`,
    exact: true,
    element: Listings,
    roles: [],
    isAnonymous: true,
  },
  {
    path: `/forgot-password`,
    name: `Forgot Password`,
    exact: true,
    element: ForgotPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: `/fileuploader`,
    name: `File Upload Example`,
    exact: true,
    element: FileUpload,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/blogs/:id/details',
    name: 'Blog Details',
    exact: true,
    element: BlogDetails,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/blogs',
    name: 'Blogs List',
    exact: false,
    element: BlogsList,
    roles: [],
    isAnonymous: true,
  },
  {
    path: `/changepassword`,
    name: `Change Password`,
    exact: true,
    element: ChangePassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/pricing',
    name: 'Pricing Page',
    exact: true,
    element: SubscriptionPage,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/ratings',
    name: 'Ratings',
    exact: true,
    element: Ratings,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/charitablefunds',
    name: 'Charitable Funds',
    exact: true,
    element: CharitableFunds,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/newsletters/',
    name: 'Newsletters',
    exact: true,
    element: Newsletters,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/newsletters/new',
    name: 'Newsletters Add',
    exact: true,
    element: AddNewsletter,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/newsletters/new/:id',
    name: 'Edit Newsletters',
    exact: true,
    element: AddNewsletter,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/newsletterpreview/:id',
    name: 'View Newsletter',
    exact: true,
    element: NewsletterPreview,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/pricing',
    name: 'Pricing Page',
    exact: true,
    element: SubscriptionPage,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/survey/add',
    name: 'SurveyBuilder',
    exact: true,
    element: SurveyBuilder,
    roles: [],
    isAnonymous: true,
  },
  {
    path: '/donations',
    name: 'Donate',
    exact: true,
    element: DonationForm,
    roles: [],
    isAnonymous: true,
  },
];

const errorRoutes = [
  {
    path: '/error-500',
    name: 'Error - 500',
    element: ServerError,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
  {
    path: '*',
    name: 'Error - 404',
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

let allRoutes = [...routes, ...errorRoutes];

export default allRoutes;
