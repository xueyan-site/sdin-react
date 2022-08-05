import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
放置与路由相关的操作和属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| page | 当前路由所属的 page 对象 | \`Page\` |  |

## Router.formatUrl

将字符串格式化成标准的 URL 字符串  

\`\`\`
type formatUrl = (
  urlOrStr: string | RouteUrl, 
  query: RouteQuery = {}
) => string
\`\`\`

它会补齐传入的字符串中缺失的部分，并确保 URL 查询参数都进行了编码  

\`router.formatUrl('/foo', { bar: 123 })\`

## Router.changeUrl

改变当前 URL (通过修改 location.href)  

\`\`\`
type changeUrl = (
  urlOrStr: string | RouteUrl,
  query?: RouteQuery
) => void
\`\`\`

\`router.changeUrl('/foo', { bar: 123 })\`

## Router.replaceUrl

替换当前 URL (通过 location.replace 方法)

\`\`\`
type replaceUrl = (
  urlOrStr: string | RouteUrl,
  query?: RouteQuery
) => void
\`\`\`

\`router.replaceUrl('/foo', { bar: 123 })\`

## Router.openUrl

打开一个新的 URL (通过点击 \<a\> 元素)

\`\`\`
type openUrl = (
  urlOrStr: string | RouteUrl, 
  query?: RouteQuery, 
  target: 'blank' | 'self' | 'parent' | 'top' = 'blank'
) => void
\`\`\`

\`router.openUrl('/foo', { bar: 123 })\`

## Router.push

添加一条 URL 记录

\`\`\`
type push = (
  urlOrStr: string | RouteUrl, 
  query?: RouteQuery
) => void
\`\`\`

\`router.push('/foo', { bar: 123 })\`

## Router.replace

替换当前 URL 记录

\`\`\`
type replace = (
  urlOrStr: string | RouteUrl, 
  query?: RouteQuery
) => void
\`\`\`

\`router.replace('/foo', { bar: 123 })\`

## Router.forward

跳转至后几条 URL 记录

\`\`\`
type forward = (
  delta: number = 1
) => void
\`\`\`

\`router.forward()\`

## Router.back

回退至前几条 URL 记录

\`\`\`
type back = (
  delta: number = 1
) => void
\`\`\`

\`router.back()\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
