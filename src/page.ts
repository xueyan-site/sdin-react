import Store from 'xueyan-react-store'
import { track } from './track'
import { getPerfLog } from './performance'
import { stringToUrl, urlToString } from './route'
import { TRACK_JOIN_SYMBOL, REFERENCE_JOIN_SYMBOL } from './constants'
import type { StoreOptions } from 'xueyan-react-store'
import type { TrackParams, Track } from './track'
import type { RouteQuery, RouteUrl } from './route'

/**
 * page meta
 */
export interface PageMeta {
  /**
   * page id, page url suffix path, no '/'
   */
  id: string
  /**
   * page name
   */
  name: string
  /**
   * page url full path, has '/'
   */
  pagePath: string
  /**
   * project url public path, has '/'
   */
  publicPath: string
  /**
   * page url suffix path, has '/'
   */
  privatePath: string
}

/**
 * page infomation
 */
export interface PageData extends RouteUrl, PageMeta {}

/**
 * page config options
 */
export interface PageOptions extends StoreOptions {
  /**
   * custom define tracking method
   */
  track?: Track
}

export const PAGE_STORE_KEY = 'PAGE'

/**
 * page store
 */
export class PageStore extends Store<PageData> {
  /**
   * track method
   */
  private __track__: Track

  constructor(defaultData: PageData, options?: PageOptions) {
    super(PAGE_STORE_KEY, defaultData, options)
    this.__track__ = options?.track || track
  }

  /**
   * format path to full URL
   * 
   * It will fill in the missing domain name for the given URL, ensuring that the URL parameters are encoded
   * 
   * @example
   * formatUrl('/foo', { bar: 123 })
   */
  formatUrl(urlOrStr: string | RouteUrl, { sn, sid, sidx, ...query }: RouteQuery = {}) {
    const url = typeof urlOrStr === 'string' ? stringToUrl(urlOrStr, query) : urlOrStr
    url.query.r = [this.id, sn, sid, sidx].join(REFERENCE_JOIN_SYMBOL)
    return urlToString(url)
  }

  /**
   * modify current URL (by change location.href)
   * 
   * @example
   * changeUrl('/foo', { bar: 123 })
   */
  changeUrl(url: string | RouteUrl, query?: RouteQuery) {
    location.href = this.formatUrl(url, query)
  }

  /**
   * replace current URL (by change location.href)
   * 
   * @example
   * replaceUrl('/foo', { bar: 123 })
   */
  replaceUrl(url: string | RouteUrl, query?: RouteQuery) {
    location.replace(this.formatUrl(url, query))
  }

  /**
   * open URL (by click \<a\> DOM)
   * 
   * @param target The way to open (i.e. the target attribute of the a link) @default 'blank'
   * self: Current page load, i.e. the current response to the same HTML 4 frame (or HTML5 browsing context). This value is the default, if no attribute is specified.
   * blank: New window opens, i.e. to a new unnamed HTML4 window or HTML5 browser context
   * parent: Loads the response to the parent HTML4 frame of the current frame or the parent browsing context of the current HTML5 browsing context. If there is no parent frame or browsing context, this option behaves in the same way as _self.
   * top: IHTML4: Loads the response into the full, original window, eliminating all other frames. HTML5: Loads the response into the top-level browsing context (i.e., the browsing context, which is an ancestor of the current one, and has no parent). If there is no parent frame or browsing context, this option behaves the same way as _self
   * 
   * @example
   * openUrl('/foo', { bar: 123 })
   */
  openUrl(url: string | RouteUrl, query?: RouteQuery, target: 'blank' | 'self' | 'parent' | 'top' = 'blank') {
    const anchorDom = document.createElement('a')
    anchorDom.setAttribute('href', this.formatUrl(url, query))
    anchorDom.setAttribute('target', '_' + target)
    anchorDom.click()
  }

  /**
   * add history record
   * 
   * @example
   * pushHistory('/foo', { bar: 123 })
   */
  pushHistory(url: string | RouteUrl, query?: RouteQuery) {
    history.pushState(undefined, '', this.formatUrl(url, query))
  }

  /**
   * replace history record
   * 
   * @example
   * replaceHistory('/foo', { bar: 123 })
   */
  replaceHistory(url: string | RouteUrl, query?: RouteQuery) {
    history.replaceState(undefined, '', this.formatUrl(url, query))
  }

  /**
   * back history record
   * 
   * @example
   * backHistory()
   */
  backHistory(delta: number = 1) {
    history.go(-delta)
  }

  /**
   * forward history record
   * 
   * @example
   * forwardHistory()
   */
  forwardHistory(delta: number = 1) {
    history.go(delta)
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
  private getTrackMeta(action: string, sn?: string) {
    return [
      action,
      sn || '',
      this.id,
      this.data.id,
      this.data.path,
      this.data.search,
      this.data.hash,
      this.data.query.r || ''
    ].join(TRACK_JOIN_SYMBOL)
  }

  /**
   * base track method
   * @param action tracking action, such as click, impr, pv, etc.
   * @param sn scene number, A custom string to distinguish burying site
   * @param params tracking other params
   */
  private track(action: string, sn?: string, params?: TrackParams) {
    this.__track__({
      t: this.getTrackMeta(action, sn),
      ...params,
    })
  }

  /**
   * page view tracking (with performace data)
   * @param data tracking data
   */
  trackPv(data?: TrackParams) {
    this.track('pv', undefined, {
      p: getPerfLog(),
      d: data,
    })
  }

  /**
   * impression tracking
   * @param sn scene number, A custom string to distinguish burying site
   * @param data tracking data
   */
  trackImpr(sn: string, data?: TrackParams) {
    if (sn) {
      this.track('ips', sn, {
        d: data
      })
    }
  }

  /**
   * click action tracking
   * @param sn scene number, A custom string to distinguish burying site
   * @param data tracking data
   */
  trackClick(sn: string, data?: TrackParams) {
    if (sn) {
      this.track('clk', sn, {
        d: data
      })
    }
  }

  /**
   * information tracking
   * @param info information data
   * @param data other tracking data
   */
  trackInfo(info?: any, data?: TrackParams) {
    if (info) {
      this.track('inf', undefined, {
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
  trackError(error?: Error, data?: TrackParams) {
    if (error) {
      this.track('err', undefined, {
        e: error,
        d: data,
      })
    }
  }
}
