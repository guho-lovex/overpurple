import * as React from 'react'
import { Link } from 'gatsby'
import { ToggleBtn } from './Toggle/Toggle'
import { COLORS_MODE_KEY, ThemeProvider } from './theme/ThemeContext'

interface LayoutProps {
  location?: Location
  title?: string
  children?: React.ReactNode
}

export const HomeHeader: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
      <ToggleBtn />
    </div>
  )
}

export const OtherPageHeader: React.FC<{
  title?: string
}> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      <ToggleBtn />
    </div>
  )
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `/overpurple.io/`
  const isRootPath = location?.pathname === rootPath
  const header = isRootPath ? (
    <HomeHeader title={title} />
  ) : (
    <OtherPageHeader title={title} />
  )

  return (
    <ThemeProvider>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
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
    </ThemeProvider>
  )
}

export default Layout
