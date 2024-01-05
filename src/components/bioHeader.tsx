/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import NavHeader from './nav';
import SEO from './seo';

const BioHeader = () => {
  const data = useStaticQuery(pageQuery);

  const {
    site: { siteMetadata },
  } = data;
  const rootPath = data.site?.pathPrefix;
  const title = siteMetadata?.title;
  const author = siteMetadata?.author;
  const description = siteMetadata?.description;
  const url = siteMetadata?.siteUrl;

  const NavTitle = title?.split('-')[0];
  console.log('-----ti', NavTitle);

  return (
    <div className="bio hover:scale-[1.005]">
      <SEO title={title} description={description} url={url} />
      <div>
        <NavHeader title={NavTitle} rootPath={rootPath} />
      </div>
      <div className="dark-footer flex items-center">
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
              A personal blog by &nbsp;
              <a
                href={`https://github.com/guho-lovex`}
                target="_blank"
                rel="noreferrer"
              >
                {author.name}
              </a>
            </>
            {/* <div>{author.summary}</div> */}
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
        description
        siteUrl
      }
    }
  }
`;

export default BioHeader;
