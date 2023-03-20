<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="center">
  Lovex's Overpurpled blog starter
</h1>

srr serve与client 页面路径不匹配时（没有正确水合 hydrate ），这导致 gatsby develop 和 gatsby build 不一致。排查是否使用了window及其的方法，如果有，我们需要将获取放在useEffect中，保证代码不会执行，除非在浏览器中。详见：[Debugging HTML Builds]('https://www.gatsbyjs.com/docs/debugging-html-builds/')