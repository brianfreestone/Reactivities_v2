import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivitiyDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import CategoryList from "../../features/categories/CategoryList";
import LoginForm from "../../features/users/LoginForm";
import ProfilePage from "../../features/profiles/ProfilePage";

export const routes: RouteObject[] = [
    {
        path:'/',
        element: <App />,
        children:[
            {path: 'activities', element:<ActivityDashboard/>},
            {path: 'activities/:id', element:<ActivitiyDetails/>},
            {path: 'createActivity', element:<ActivityForm key='create'/>},
            {path: 'manageActivity/:id', element:<ActivityForm key='manage' />},
            {path: 'profiles/:username', element:<ProfilePage/>},
            {path: 'login', element:<LoginForm/>},
            {path: 'errors', element:<TestErrors/>},
            {path: 'not-found', element:<NotFound/>},
            {path: 'server-error', element:<ServerError/>},
            {path: 'categories', element:<CategoryList/>},

            {path: '*', element:<Navigate replace to ='/not-found'/>},
        ]
    }
]

export const router = createBrowserRouter(routes)