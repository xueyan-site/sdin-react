import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
本工具是为辅助 \`sdin\` React 应用程序而设计的。

## History 导航

\`\`\`
const { router } = usePage()
router.push('路径', { query1: 123 })
router.replace('路径', { query1: 123 })
\`\`\`

## Location 导航

\`\`\`
const { router } = usePage()
router.changeUrl('路径', { query1: 123 })
router.replaceUrl('路径', { query1: 123 })
\`\`\`

## 打开新窗口

\`\`\`
const { router } = usePage()
router.openUrl('路径', { query1: 123 })
\`\`\`

## 前进或回退历史记录

\`\`\`
const { router } = usePage()
router.forward()
router.back()
\`\`\`

## 生成链接

\`\`\`
const { router } = usePage()
router.formatUrl('路径', { query1: 123 })
\`\`\`

## 生成当页链接

\`\`\`
const { router, query } = usePage()
router.formatUrl(undefined, {
  ...query, 
  query1: 123
})
\`\`\`

## 追踪点击行为

> 打点相关功能，需要配置 [track 信息](/sdin?doc=0012)，否则无效。  

\`\`\`
const { tracker } = usePage()
tracker.clk('区块名', { bar: '携带的额外信息' })
\`\`\`

## 追踪错误信息

\`\`\`
const { tracker } = usePage()
tracker.err('错误信息', { bar: '携带的额外信息' })
\`\`\`

## 追踪区块曝光

\`\`\`
// 相当于 tracker.impr('foo', { bar: 123 })
<Impression sn="foo" bar={123}>
  <div></div>
</Impression>
\`\`\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
