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

const Bio = () => {
  const data = useStaticQuery(pageQuery);
  // Set these values by editing "siteMetadata" in gatsby-config.js
  const rootPath = data.site?.pathPrefix;
  const title = data.site.siteMetadata?.title;
  const author = data.site.siteMetadata?.author;
  // const social = data.site.siteMetadata?.social

  console.log('------rootPath', rootPath);

  return (
    <div className="bio">
      <div>
        <NavHeader title={title} rootPath={rootPath} />
      </div>
      <div className="dark-footer">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={['auto', 'webp', 'avif']}
          src="../assets/icon.jpeg"
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
                href={`https://github.com/lovexueorangecat/overpurple.io`}
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
        }
        social {
          twitter
        }
        siteUrl
      }
    }
  }
`;

export default Bio;
