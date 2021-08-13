import React, { useEffect, useMemo } from 'react'
import { uniqueId } from 'lodash'
import { usePager } from './context'
import 'intersection-observer'

/**
 * 曝光组件的Props
 */
export interface ImpressionProps {
  [key: string]: any
  thresholds?: number | number[] // 交叉比例（intersectionRatio）达到thresholds时触发回调函数
  intersectionRatio?: number // 目标元素的可见比例，完全可见时为1，完全不可见时小于等于0
  deps?: any[] // 设置元素的依赖项，让打点可以在更改时得以刷新
  id?: string // 元素的ID，若有，则使用这个ID作为选择器传给children，否则就自动生成
  sn?: string // 元素的打点key，若不传，则不曝光
  children: React.ReactElement
}

/**
 * 曝光组件
 */
export function Impression({
  thresholds,
  intersectionRatio,
  deps,
  id,
  sn,
  children,
  ...extra
}: ImpressionProps) {
  const pager = usePager()
  const currId = useMemo(() => id || uniqueId('impr_'), [])

  useEffect(() => {
    let timer: any
    let observer: IntersectionObserver | undefined
    if (sn && IntersectionObserver) {
      timer = setTimeout(() => {
        const target = document.getElementById(currId)
        const ratio = intersectionRatio !== undefined ? intersectionRatio : 0.5
        if (target) {
          observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.intersectionRatio > ratio && observer) {
              pager.trackImpr(sn, extra)
              observer.disconnect()
              observer = undefined
            }
          }), {
            root: null,
            threshold: thresholds || 0.6
          })
          observer.observe(target)
        }
      }, 10)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
        timer = undefined
      }
      if (observer) {
        observer.disconnect()
        observer = undefined
      }
    }
  }, deps || [])

  return React.cloneElement(React.Children.only(children), { id: currId })
}
