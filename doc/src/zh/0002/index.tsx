import React from 'react'
import { Article, Segment } from 'xueyan-react-markdown'

const MARK1 = `
对元素的可视区域进行监听及曝光

\`\`\`
type Impression = (
  props: ImpressionProps
) => React.ReactElement<any, any>
\`\`\`

## 示例

\`\`\`
// 相当于 tracker.impr('foo', { bar: 123 })
<Impression sn="foo" bar={123}>
  <div></div>
</Impression>
\`\`\`

## ImpressionProps

| 属性 | 名称 | 类型 | 说明 |
| - | - | - | - |
| thresholds | 曝光行为触发的时机 | \`? number,number[]\` | 监听目标与边界盒交叉区域的比例值，范围 [0,1] |
| intersectionRatio | 打点行为触发的时机 | \`? number\` | 监听目标的 intersectionRect 与 boundingClientRect 的比例值，范围 [0,1] |
| deps | 打点的依赖项 | \`? any[]\` | 当依赖的数据变动时，会重新执行曝光判断，否则只曝光一次 |
| id | 曝光元素的ID | \`? string\` | 不传则由组件内部自动生成 |
| sn | 打点的场景标识 | \`? string\` | 不传则不打点 |
| children | 子组件 | \`React.ReactElement\` | 仅允许传一个元素 |
| [key: string] | 其它打点数据 | \`any\` |  |
`

export default function Main() {
  return (
    <Article>
      <Segment>{MARK1}</Segment>
    </Article>
  )
}
