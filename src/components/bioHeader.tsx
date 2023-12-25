/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import NavHeader from './nav';

const BioHeader = () => {
  const data = useStaticQuery(pageQuery);
  // Set these values by editing "siteMetadata" in gatsby-config.js
  const rootPath = data.site?.pathPrefix;
  const title = data.site.siteMetadata?.title;
  const author = data.site.siteMetadata?.author;
  // const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <div>
        <NavHeader title={title} rootPath={rootPath} />
      </div>
      <div className="dark-footer">
        <StaticImage
          className="bio-avatar"
          // layout="constrained"
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../assets/xiaolan.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
        {author?.name && (
          <div>
            <>
              Personal blog by &nbsp;
              <a
                href={`https://github.com/guho-lovex`}
                target="_blank"
                rel="noreferrer"
              >
                {author.name}
              </a>
            </>
            <div>{author.summary}</div>
            <></>
          </div>
        )}
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query BioQuery {
    site {
      pathPrefix
      siteMetadata {
        title
        author {
          name
          summary
          author_avatar
        }
        social {
          twitter
        }
        siteUrl
      }
    }
  }
`;

export default BioHeader;
