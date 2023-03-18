/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
import React from 'react'
import Layout from './src/components/layout'

function getInitialColorMode() {
  const persistedColorPreference = window.localStorage?.getItem('color_mode')
  const hasPersistedPreference = typeof persistedColorPreference === 'string'

  if (hasPersistedPreference) {
    return persistedColorPreference
  }
  // 没有选择任何 mode： ‘light' or 'dark'
  // 查看系统media
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const hasMediaQueryPreference = typeof mql.matches === 'boolean'
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark-mode' : 'light-mode'
  }

  // 如果使用不支持的浏览器 默认themes light
  return 'light-mode'
}

export function onRenderBody({ setHtmlAttributes }) {
  setHtmlAttributes({ lang: `en` })
}

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}
