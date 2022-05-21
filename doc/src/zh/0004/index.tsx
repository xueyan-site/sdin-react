import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
放置与打点相关的操作和属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| page | 当前路由所属的 page 对象 | \`Page\` |  |

## Tracker.pv

\`\`\`ts
type pv = (
  data?: TrackParams // 打点时携带的数据
) => void

interface TrackParams {
  [key: string]: any
}
\`\`\`

页面访问打点

\`tracker.pv({ bar: 123 })\`

## Tracker.impr

\`\`\`ts
type impr = (
  sn: string,        // 场景标识
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

区块曝光打点

\`tracker.impr('foo', { bar: 123 })\`

## Tracker.clk

\`\`\`ts
type clk = (
  sn: string,        // 场景标识
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

区块点击打点

\`tracker.clk('foo', { bar: 123 })\`

## Tracker.info

\`\`\`ts
type info = (
  info?: any,        // 要记录的信息
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

自定义信息打点

\`tracker.info('foo', { bar: 123 })\`

## Tracker.err

\`\`\`ts
type err = (
  error?: Error,     // 要记录的错误信息
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

自定义错误打点

\`tracker.err(new Error('foo'), { bar: 123 })\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
