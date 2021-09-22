import React, { useEffect, useMemo } from 'react'
import { random } from 'xueyan-react-store'
import { usePager } from './context'
import 'intersection-observer'

/**
 * Props for Impression Component
 */
export interface ImpressionProps {
  [key: string]: any
  /**
   * The callback function is triggered when the intersectionRatio reaches thresholds
   */
  thresholds?: number | number[]
  /**
   * Visibility ratio of the target element, 1 when fully visible, less than or equal to 0 when fully invisible
   */
  intersectionRatio?: number
  /**
   * Set the element's dependencies so that punches can be refreshed when they are changed
   */
  deps?: any[]
  /**
   * element's ID, if any, is passed to children as a selector, otherwise it is automatically generated
   */
  id?: string
  /**
   * The element's tracking key, if not passed, is not send tracking data
   */
  sn?: string
  /**
   * React component children, There is and only one DOM
   */
  children: React.ReactElement
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
  const pager = usePager()
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
