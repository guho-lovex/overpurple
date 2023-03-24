/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import React from 'react';

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */

import { minify } from 'terser';

const themeScript = `(function () {

  const hasWindow = typeof window !== 'undefined'
  
  if (!hasWindow) {
    return
  }

  function getThemeMode() {
    const preferredThemeMode = window.localStorage.getItem('themeMode')
    const hasPreferredThemeMode = typeof preferredThemeMode === 'string'
  
    if (hasPreferredThemeMode) {
      return preferredThemeMode
    }
  
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)').matches
    const hsMediaDarkMode = typeof darkMedia === 'boolean'
  
    if (hsMediaDarkMode) {
      return darkMedia ? 'dark' : 'light'
    }
  
    return 'light'
  }

  const themeMode = getThemeMode()

  let preferredTheme = themeMode 

  function setTheme(newTheme) {
    window.__theme = newTheme
    preferredTheme = newTheme
    document.body.className = newTheme
  }

  window.__setThemeMode = function(newTheme) {
    setTheme(newTheme)
    try {
      window.localStorage.setItem('themeMode', newTheme)
    } catch (err) {}
  }
  setTheme(themeMode)
})()`;

const minifyJsCode = minify(themeScript).code || ``;
const MagicScriptTag = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: minifyJsCode,
      }}
    />
  );
};

export function onRenderBody({ setHtmlAttributes, setPreBodyComponents }) {
  setHtmlAttributes({ lang: `en` });
  setPreBodyComponents(<MagicScriptTag />);
}
