import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
\`\`\`ts
type usePage = () => Page
\`\`\`

获取页面信息对象

## Page

页面信息对象

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| id | 页面ID | \`string\` |  |
| name | 页面名称 | \`string\` |  |
| viewId | 页面访问ID | \`string\` | 用于打点统计 |
| url | 页面 URL  | \`string\` | 比如 https://xxx.yy:zz/aa/bb/cc?mm=11&n=22#tt |
| domain | 页面 URL 中的协议+域名 | \`string\` | 比如 https://xxx.yy:zz |
| protocol | 页面 URL 中的协议 | \`string\` | 比如 https，没有 :// |
| host | 页面 URL 中的域名+端口 | \`string\` | 比如 xxx.yy:zz，没有协议前缀 |
| path | 页面 URL 中的路径 | \`string\` | 以 / 开始，比如 /aa/bb/cc/ |
| pagePath | 预设的页面路径 | \`string\` | 以 / 开始，不以 / 结尾，比如 /aa/bb/cc |
| publicPath | 预设的页面路径前缀 | \`string\` | 以 / 开始，以 / 结尾，比如 /aa/bb/ |
| privatePath | 预设的页面路径后缀 | \`string\` | 不以 / 开始，不以 / 结尾，比如 cc |
| query | 页面 URL 中的查询对象 | \`RouteStringQuery\` | 比如 {mm:11,n:22} |
| search | 页面 URL 中的查询字符串 | \`string\` | 比如 mm=11&n=22，没有 ? |
| hash | 页面 URL 中的 Hash 字符串 | \`string\` | 比如 tt，没有 # |
| router | 路由对象 | \`Router\` |  |
| tracker | 打点对象 | \`Tracker\` |  |
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
