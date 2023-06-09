import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));
const Photo = lazy(() => import('./modules/photo/pages/PhotoPage'));
const Filter = lazy(() => import('./modules/table/page/Filter'));
const ProfilePage = lazy(() => import('./modules/profile/page'));
const DetailProduct = lazy(() => import('./modules/table/page/DetailProduct'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <ProtectedRoute path={ROUTES.profile} component={ProfilePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.signup} component={SignUpPage} />
        <Route path={ROUTES.photo} component={Photo} />
        <ProtectedRoute path={`${ROUTES.detail}/:id`} component={DetailProduct} />
        <ProtectedRoute path={ROUTES.product} component={Filter} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
