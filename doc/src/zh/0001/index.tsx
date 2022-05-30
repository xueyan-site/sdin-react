import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
获取页面信息对象

\`\`\`
type usePage = () => Page
\`\`\`

> 更多类型定义：[Page](${XT_PATH}?doc=0005)
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
