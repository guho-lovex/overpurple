import * as React from 'react';
import { Link, graphql } from 'gatsby';

import { Layout } from '../components/layout';
import BioHeader from '../components/bioHeader';

interface BlogIndexProps {
  data: any;
  location: any;
}

const BlogIndex = ({ data, location }: BlogIndexProps) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes || [];

  const outline = posts
    .reduce((prev: any[], cur: any) => {
      const slug = cur.fields.slug;
      const title = cur.frontmatter.title;
      const itemString = `<p class="mb-6"><a href="${slug}">${title}</a></p>`;
      prev.push(itemString);
      return prev;
    }, [])
    .join('');

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <BioHeader />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle} outline={outline}>
      <BioHeader />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post: any) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
