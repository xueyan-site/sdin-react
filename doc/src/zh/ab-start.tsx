import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
## 文档标题

文档内容
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
