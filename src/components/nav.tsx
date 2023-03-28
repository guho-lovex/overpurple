/** avoid has gatsby ssr error:  Text content does not match server-rendered HTML
 *  所以封装成一个组件形式
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

interface NavProps {
  title: string;
  rootPath: string;
}

const NavHeader = ({ title, rootPath }: NavProps) => {
  const [titleClassName, setClassName] = useState<string>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isRootPath = window.location.pathname === rootPath;
      const isDevPath = window.location.pathname === '/';
      const hiddenBioHeader = isRootPath || isDevPath;

      console.log('------rootPath', rootPath);
      console.log('-------isRootPath', isRootPath);
      console.log('-------isDevPath', isDevPath);
      console.log('-------hiddenBioHeader', hiddenBioHeader);

      const InsertClassName = hiddenBioHeader ? '' : 'title-bio';
      setClassName(InsertClassName);
    }
  }, [rootPath]);

  return (
    <div>
      <Link
        className={`header-link-home header-home-second-header ${titleClassName}`}
        to="/"
      >
        {title}
      </Link>
    </div>
  );
};

export default NavHeader;
