import React, { useEffect, useMemo } from 'react'
import { random } from 'stine'
import { usePage } from './context'
import 'intersection-observer'

/**
 * Props for Impression Component
 */
export interface ImpressionProps {
  /** 曝光行为触发的时机（监听目标与边界盒交叉区域的比例值，范围 [0,1]）*/
  thresholds?: number | number[]
  /** 打点行为触发的时机（监听目标的 intersectionRect 与 boundingClientRect 的比例值，范围 [0,1]） */
  intersectionRatio?: number
  /** 打点的依赖项（当依赖的数据变动时，会重新执行曝光判断，否则只曝光一次） */
  deps?: any[]
  /** 曝光元素的ID（不传则由组件内部自动生成） */
  id?: string
  /** 打点的场景标识（不传则不打点） */
  sn?: string
  /** 子组件（仅允许传一个元素）*/
  children: React.ReactElement
  /** 其它打点数据 */
  [key: string]: any
}

/**
 * Impression Component
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
  const page = usePage()
  const currId = useMemo(() => id || ('impr_' + random()), [])

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
              page.tracker.impr(sn, extra)
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
