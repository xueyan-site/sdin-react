import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
放置与路由相关的操作和属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| page | 当前路由所属的 page 对象 | \`Page\` |  |

## Router.formatUrl

\`\`\`ts
type formatUrl = (
  urlOrStr: string | RouteUrl, 
  query: RouteQuery = {}
) => string
\`\`\`

将字符串格式化成标准的 URL 字符串  
它会补齐传入的字符串中缺失的部分，并确保 URL 查询参数都进行了编码  

\`router.formatUrl('/foo', { bar: 123 })\`

## Router.changeUrl

\`\`\`ts
type changeUrl = (
  urlOrStr: string | RouteUrl,
  query?: RouteQuery
) => void
\`\`\`

改变当前 URL (通过修改 location.href)  

\`router.changeUrl('/foo', { bar: 123 })\`

## Router.replaceUrl

\`\`\`ts
type replaceUrl = (
  urlOrStr: string | RouteUrl,
  query?: RouteQuery
) => void
\`\`\`

替换当前 URL (通过 location.replace 方法)

\`router.replaceUrl('/foo', { bar: 123 })\`

## Router.openUrl

\`\`\`ts
type openUrl = (
  urlOrStr: string | RouteUrl, 
  query?: RouteQuery, 
  target: 'blank' | 'self' | 'parent' | 'top' = 'blank'
) => void
\`\`\`

打开一个新的 URL (通过点击 \<a\> 元素)

\`router.openUrl('/foo', { bar: 123 })\`

## Router.push

\`\`\`ts
type push = (
  urlOrStr: string | RouteUrl, 
  query?: RouteQuery
) => void
\`\`\`

添加一条 URL 记录

\`router.push('/foo', { bar: 123 })\`

## Router.replace

\`\`\`ts
type replace = (
  urlOrStr: string | RouteUrl, 
  query?: RouteQuery
) => void
\`\`\`

替换当前 URL 记录

\`router.replace('/foo', { bar: 123 })\`

## Router.forward

\`\`\`ts
type forward = (
  delta: number = 1
) => void
\`\`\`

跳转至后几条 URL 记录

\`router.forward()\`

## Router.back

\`\`\`ts
type back = (
  delta: number = 1
) => void
\`\`\`

回退至前几条 URL 记录

\`router.back()\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
