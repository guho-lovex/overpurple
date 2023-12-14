import React from 'react';
import { Link } from 'gatsby';
import { ToggleBtn } from './Toggle/Toggle';
import { ThemeProvider } from './theme/ThemeContext';

interface LayoutProps {
  location?: Location;
  title?: string;
  children?: React.ReactNode;
}

export const HomeHeader: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <ToggleBtn />
    </div>
  );
};

export const OtherPageHeader: React.FC<{
  title?: string;
}> = ({ title }) => {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const allCodeNode = window.document.querySelectorAll(
        'code[class*="language-"]'
      );
      console.log('-----allCodeNode', allCodeNode);
    }
  }, []);
  return (
    <div className="flex items-center justify-between">
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      <ToggleBtn />
    </div>
  );
};
const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `/overpurple.io/`;
  const isRootPath = location?.pathname === rootPath;
  const header = isRootPath ? (
    <HomeHeader title={title} />
  ) : (
    <OtherPageHeader title={title} />
  );

  const transformVNode = (children: any): any => {
    if (children == null || typeof children !== 'object') {
      return null;
    }
    if (Array.isArray(children)) {
      return children.map(transformVNode);
    }
    const { type, props, ...restProps } = children;
    if (typeof type === 'string') {
      const { children: propsChildren, ...rest } = props;
      if (Array.isArray(propsChildren)) {
        const vNodeChildren = propsChildren.map(x => {
          const childProps = x?.props;
          const childNode = childProps?.children;
          const grandChildProps = childNode?.props;
          const grandChildNode = childNode?.props?.children;

          if (Array.isArray(grandChildNode)) {
            const grandson = grandChildNode.filter(
              cur => cur.type === 'header'
            );
            const outlineTextNode = grandson[0]?.props?.children?.filter(
              (cur: any) => cur.type === 'h2'
            );

            const grandsonNode = {
              ...grandson[0],
              props: {
                ...grandson[0].props,
                children: {
                  ...outlineTextNode[0],
                  type: 'p',
                },
              },
            };

            return {
              ...x,
              props: {
                ...childProps,
                children: {
                  ...childNode,
                  props: {
                    ...grandChildProps,
                    children: grandsonNode,
                  },
                },
              },
            };
          }
        });

        console.log('00000000vNode', vNodeChildren);

        return {
          type,
          props: { ...rest, children: vNodeChildren },
          ...restProps,
        };
      }
    }
  };

  const outlineData = transformVNode(children);

  return (
    <ThemeProvider>
      <div className="flex">
        {!isRootPath && <div className="w-2/6">{outlineData}</div>}
        <div className="global-wrapper flex-1" data-is-root-path={isRootPath}>
          <header className="global-header">{header}</header>
          <main>{children}</main>
          {isRootPath && (
            <footer>
              <a href="https://juejin.cn/user/4283353029944296">掘金</a>
              <> • </>
              <a href="https://github.com/lovexueorangecat/overpurple.io">
                github
              </a>
            </footer>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
