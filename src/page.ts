import Store from 'xueyan-react-store'
import { track, getPerfLog } from './track'
import { stringToUrl, urlToString } from './route'
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
    url.query.r = [this.id, sn, sid, sidx].join(',')
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
   * base track method
   * @param a tracking action, such as click, impr, pv, etc.
   * @param k tracking key, A custom string to distinguish burying site
   * @param params tracking data
   * 
   * t field contains following information:
   * 1 action tracking action, such as click, impr, pv, etc.
   * 2 key    tracking key, location flag
   * 3 view   view id, current view page flag, a random string
   * 4 id     page id
   * 5 path   url path
   * 6 search url search string
   * 7 hash   url hash
   * 8 refer  page refer
   */
  track(a: string, k?: string, params?: TrackParams) {
    this.__track__(this, {
      ...params,
      t: [
        a,
        k || '',
        this.id,
        this.data.id,
        this.data.path,
        this.data.search,
        this.data.hash,
        this.data.query.r || ''
      ].join(';')
    })
  }

  /**
   * page view tracking (with performace data)
   * @param params tracking data
   */
  trackPv(params?: TrackParams) {
    this.track('pv', undefined, {
      ...params,
      p: getPerfLog()
    })
  }

  /**
   * impression tracking
   * @param k tracking key, A custom string to distinguish burying site
   * @param params tracking data
   */
  trackImpr(k: string, params?: TrackParams) {
    k && this.track('ips', k, params)
  }

  /**
   * click action tracking
   * @param k tracking key, A custom string to distinguish burying site
   * @param params tracking data
   */
  trackClick(k: string, params?: TrackParams) {
    k && this.track('clk', k, params)
  }

  /**
   * information tracking
   * @param k tracking key, A custom string to distinguish burying site
   * @param info information data
   * @param params other tracking data
   */
  trackInfo(info?: any, params?: TrackParams) {
    info && this.track('inf', undefined, {
      ...params,
      i: info
    })
  }

  /**
   * error tracking
   * @param k tracking key, A custom string to distinguish burying site
   * @param error error data
   * @param params other tracking data
   */
  trackError(error?: Error, params?: TrackParams) {
    error && this.track('err', undefined, {
      ...params,
      e: error
    })
  }
}
