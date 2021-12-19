import Layout from 'Components/Layout';
import Home from 'Components/Home';

const PublicRoutes = () => {
  return (
    <Layout resource={'admin'}>
      <Home />
    </Layout>
  );
};

export default PublicRoutes;
