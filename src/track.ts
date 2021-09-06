import { queryToString } from './route'
import { PERF_JOIN_SYMBOL, TRACK_JOIN_SYMBOL } from './constants'

/**
 * tracking data
 */
export interface TrackParams {
  [key: string]: any
}

/**
 * track method
 * @param store page store
 * @param params track params
 * @returns void
 */
export type Track = (params: TrackParams) => Promise<void>

/**
 * Use image for punctuation (with upper limit for params)
 * @param store page store
 * @param params tracking data
 * @returns 
 */
export function track(params: TrackParams) {
  if (XT_TRACK_PATH) {
    return new Promise<void>(resolve => {
      if (XT_DEV) {
        const curr = { ...params }
        if (curr.t) {
          curr.t = curr.t.split(TRACK_JOIN_SYMBOL)
        }
        if (curr.p) {
          curr.p = curr.p.split(PERF_JOIN_SYMBOL)
        }
        console.log('[track]', curr)
        resolve()
      } else {
        const t = document.createElement('img')
        t.crossOrigin = 'anonymous'
        t.src = XT_TRACK_PATH + queryToString(params)
        t.onload = t.onerror = () => resolve()
      }
    })
  } else {
    return Promise.resolve()
  }
}
