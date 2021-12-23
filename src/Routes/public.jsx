import Layout from 'Components/Layout';
import Home from 'Components/Home';

const publicRoutes = [
  { name: 'admin', path: '/admin' },
  { name: 'candidate', path: '/candidate' },
  { name: 'login', path: '/auth/login' },
  { name: 'sign up', path: '/auth/sign-up' }
];

const PublicRoutes = () => {
  return (
    <Layout routes={publicRoutes} resource={'/'}>
      <Home />
    </Layout>
  );
};

export default PublicRoutes;
