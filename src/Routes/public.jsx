import Layout from 'Components/Layout';
import Home from 'Components/Home';
import { useSelector } from 'react-redux';

const PublicRoutes = () => {
  const role = useSelector((store) => store.auth.role);
  const authenticated = useSelector((store) => store.auth.authenticated);

  const publicRoutes = [
    // { name: 'admin', path: '/admin' },
    // { name: 'My Profile(candidate)', path: '/candidate' },
    { name: 'login', path: '/auth/login' },
    { name: 'sign up', path: '/auth/sign-up' }
  ];
  const publicRoutesAuth = [{ name: 'My Profile', path: `/${role}` }];

  return (
    <>
      {role && authenticated ? (
        <Layout routes={publicRoutesAuth} resource={'/'}>
          <Home />
        </Layout>
      ) : (
        <Layout routes={publicRoutes} resource={'/'}>
          <Home />
        </Layout>
      )}
      ;
    </>
  );
};

export default PublicRoutes;
