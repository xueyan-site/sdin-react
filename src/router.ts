import Page from './page'
import { REFERENCE_JOIN_SYMBOL } from './constants'
import { stringToUrl, urlToString } from './route-utils'
import type { RouteUrl, RouteQuery } from './route-utils'

interface RouterProps {
  page: Page
}

export default class Router {
  /**
   * page information
   */
  readonly page: Page

  constructor(props: RouterProps) {
    this.page = props.page
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
    url.query.r = [this.page.viewId, sn, sid, sidx].join(REFERENCE_JOIN_SYMBOL)
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
   * push('/foo', { bar: 123 })
   */
  push(url: string | RouteUrl, query?: RouteQuery) {
    history.pushState(undefined, '', this.formatUrl(url, query))
  }

  /**
   * replace history record
   * 
   * @example
   * replace('/foo', { bar: 123 })
   */
  replace(url: string | RouteUrl, query?: RouteQuery) {
    history.replaceState(undefined, '', this.formatUrl(url, query))
  }

  /**
   * back history record
   * 
   * @example
   * back()
   */
  back(delta: number = 1) {
    history.go(-delta)
  }

  /**
   * forward history record
   * 
   * @example
   * forward()
   */
  forward(delta: number = 1) {
    history.go(delta)
  }
}
