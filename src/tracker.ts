import { Page } from './page'
import { TRACK_JOIN_SYMBOL } from './constants'
import { track, getPerfLog } from './track-utils'
import type { TrackParams } from './track-utils'

interface TrackerProps {
  page: Page
}

export class Tracker {
  /**
   * page information
   */
  readonly page: Page

  constructor(props: TrackerProps) {
    this.page = props.page
  }
  
  /**
   * get tracking main information
   * @param action tracking action, such as click, impr, pv, etc.
   * @param sn scene number, A custom string to distinguish burying site
   * 
   * contains following information:
   * - action  tracking action, such as click, impr, pv, etc.
   * - sn      scene number
   * - project project name
   * - view    view id, current view page flag, a random string
   * - id      page id
   * - path    url path
   * - search  url search string
   * - hash    url hash
   * - refer   page refer
   */
  private getMeta(action: string, sn?: string) {
    return [
      action,
      sn || '',
      this.page.viewId,
      this.page.id,
      this.page.path,
      this.page.search,
      this.page.hash,
      this.page.query.r || ''
    ].join(TRACK_JOIN_SYMBOL)
  }

  /**
   * base track method
   * @param action tracking action, such as click, impr, pv, etc.
   * @param sn scene number, A custom string to distinguish burying site
   * @param params tracking other params
   */
  private send(action: string, sn?: string, params?: TrackParams) {
    track({
      t: this.getMeta(action, sn),
      ...params,
    })
  }

  /**
   * page view tracking (with performace data)
   * @param data tracking data
   */
  pv(data?: TrackParams) {
    this.send('pv', undefined, {
      p: getPerfLog(),
      d: data,
    })
  }

  /**
   * impression tracking
   * @param sn scene number, A custom string to distinguish burying site
   * @param data tracking data
   */
  impr(sn: string, data?: TrackParams) {
    if (sn) {
      this.send('ips', sn, {
        d: data
      })
    }
  }

  /**
   * click action tracking
   * @param sn scene number, A custom string to distinguish burying site
   * @param data tracking data
   */
  clk(sn: string, data?: TrackParams) {
    if (sn) {
      this.send('clk', sn, {
        d: data
      })
    }
  }

  /**
   * information tracking
   * @param info information data
   * @param data other tracking data
   */
  info(info?: any, data?: TrackParams) {
    if (info) {
      this.send('inf', undefined, {
        i: info,
        d: data,
      })
    }
  }

  /**
   * error tracking
   * @param error error data
   * @param data other tracking data
   */
  err(error?: Error, data?: TrackParams) {
    if (error) {
      this.send('err', undefined, {
        e: error,
        d: data,
      })
    }
  }
}
