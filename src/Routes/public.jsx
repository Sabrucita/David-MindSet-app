import Layout from 'Components/Layout';
import Home from 'Components/Home';

const publicRoutes = [
  { name: 'admin', path: '/admin' },
  { name: 'candidate', path: '/candidate' },
  { name: 'sign up', path: '/candidate/sign-up' }
];

const PublicRoutes = () => {
  return (
    <Layout routes={publicRoutes} resource={'admin'}>
      <Home />
    </Layout>
  );
};

export default PublicRoutes;
