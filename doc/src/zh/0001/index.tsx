import React from 'react'
import { Article, Segment } from 'ark-markdown'

const MARK1 = `
获取页面信息对象

\`\`\`
type usePage = () => Page
\`\`\`

> 更多类型定义：[Page](?doc=0005)
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
