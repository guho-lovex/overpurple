import React from 'react';
import { Link } from 'gatsby';
import { isBrowser } from '../utils/const';
import menuIcon from '../assets/menu-icon.png';
import { ToggleBtn } from './Toggle/Toggle';
import { ThemeProvider } from './theme/ThemeContext';

export const HomeHeader = ({ title }: any) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <ToggleBtn />
    </div>
  );
};

export const OtherPageHeader = ({ title, visible, handleClick }: any) => {
  console.log('------visible----', visible);
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
      <div className="flex items-center" onClick={handleClick}>
        <img className="menu-icon mr-3" src={menuIcon} alt="目录" />
        <ToggleBtn />
      </div>
    </div>
  );
};

export const Layout = ({ location, title, outline, children }: any) => {
  const rootPath = `/overpurple.io/`;
  const isRootPath = location?.pathname === rootPath;
  const [visible, setVisible] = React.useState(true);

  const handleClick = () => {
    setVisible(prev => (prev ? false : true));
  };

  const header = isRootPath ? (
    <HomeHeader title={title} visible={visible} handleClick={handleClick} />
  ) : (
    <OtherPageHeader
      title={title}
      visible={visible}
      handleClick={handleClick}
    />
  );

  const transformVNode = (children: any): any => {
    if (children == null || typeof children !== 'object') {
      return null;
    }
    if (Array.isArray(children)) {
      return children.map(transformVNode);
    }
    const { type, props, ...restProps } = children;
    if (type === 'ol') {
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

    if (type === 'article') {
      const { children } = props;
      if (Array.isArray(children)) {
        const grandson = children.filter(x => x.type === 'section');
        const content = grandson[0]?.props?.dangerouslySetInnerHTML.__html;

        if (isBrowser) {
          const placeholder = document.createElement('div');
          // placeholder.setAttribute('id', 'content');
          // placeholder.insertAdjacentHTML('afterbegin', content);
          placeholder.innerHTML = content;

          // const vDOM = content.match(/<(h\d).*?>.*?<\/h\d>/g);

          // console.log('-------vDOM', vDOM);

          return content;
        }
      }
    }
  };

  const outlineData = transformVNode(children);
  console.log('---outlineData', outlineData);

  const list = [
    { name: 'A', level: 0 },
    { name: 'B', level: 0 },
    { name: 'b1', level: 1 },
    { name: 'b2', level: 1 },
    { name: 'b2-1', level: 2 },
    { name: 'b2-2', level: 2 },
    { name: 'b2-3', level: 2 },
    { name: 'b3', level: 1 },
    { name: 'C', level: 0 },
    { name: 'c1', level: 1 },
  ];

  function listToTree(list: any) {
    const arr = [];
    const template = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];

      if (arr.length < 1 || arr[arr.length - 1].level === item.level) {
        arr.push(item);
      }

      if (arr[arr.length - 1].level < item.level) {
        console.log('--------', item);
        console.log('--------template', template);
        template.push(item);
      } else {
        const temp = [];
        while (
          arr &&
          arr.length > 0 &&
          arr[arr.length - 1].level > item.level
        ) {
          temp.unshift(arr.pop());
        }

        arr[arr.length - 1].children = temp;

        arr.push(item);
      }
    }
    return arr;
  }

  console.log('------listToTree(list)', listToTree(list));

  // function dataToTree(data) {
  //   const arr = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const item = data[i];

  //     console.log('-----arr 栈顶', arr.length > 0 && arr[arr.length - 1].level);

  //     if (arr.length < 1 || arr[arr.length - 1].level === item.level) {
  //       console.log('------item', item);
  //       arr.push(item);
  //     } else {
  //       const temp = [];
  //       while (
  //         arr &&
  //         arr.length > 0 &&
  //         arr[arr.length - 1].level > item.level
  //       ) {
  //         temp.unshift(arr.pop());
  //       }

  //       if (arr[arr.length - 1].level < item.level) {
  //         console.log('------item++++', item);
  //       }

  //       arr[arr.length - 1].children = temp;
  //       arr.push(item);
  //     }
  //   }
  //   return arr;
  // }

  // console.log('---------tree', dataToTree(sourceData));

  return (
    <ThemeProvider>
      <div className="min-w-[546px]">
        <div id="content-menu" className="pt-20 absolute">
          <div className="menu_icon" onClick={handleClick}>
            <img src={menuIcon} alt="目录" />
          </div>
          <div
            className={
              visible
                ? 'pl-6 pr-3 absolute menu'
                : 'pl-6 pr-3 absolute menu hide_menu'
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: outline
                  ? `<div id='article-outline'>${outline}</div>`
                  : '',
              }}
            />
          </div>
        </div>
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <header className="flex-1 global-header">{header}</header>
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
