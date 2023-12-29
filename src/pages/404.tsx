import * as React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/layout';
import SEO from '../components/seo';

interface NotFoundPageProps {
  data: any;
  location: any;
}

const NotFoundPage = ({ data, location }: NotFoundPageProps) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export const Head = () => <SEO title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
