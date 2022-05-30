import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
放置与打点相关的操作和属性

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| page | 当前路由所属的 page 对象 | \`Page\` |  |

> 打点相关功能，需要配置 [track 信息](/xueyan-typescript-cli?doc=0012)。  
> 若配置中没有开启打点，则不会有打点请求发出。  

## Tracker.pv

页面访问打点

\`\`\`
type pv = (
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

\`\`\`
interface TrackParams {
  [key: string]: any
}
\`\`\`

\`tracker.pv({ bar: 123 })\`

## Tracker.impr

区块曝光打点

\`\`\`
type impr = (
  sn: string,        // 场景标识
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

\`tracker.impr('foo', { bar: 123 })\`

## Tracker.clk

区块点击打点

\`\`\`
type clk = (
  sn: string,        // 场景标识
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

\`tracker.clk('foo', { bar: 123 })\`

## Tracker.info

自定义信息打点

\`\`\`
type info = (
  info?: any,        // 要记录的信息
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

\`tracker.info('foo', { bar: 123 })\`

## Tracker.err

自定义错误打点

\`\`\`
type err = (
  error?: Error,     // 要记录的错误信息
  data?: TrackParams // 打点时携带的数据
) => void
\`\`\`

\`tracker.err(new Error('foo'), { bar: 123 })\`
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
