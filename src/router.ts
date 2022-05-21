import { Page } from './page'
import { REFERENCE_JOIN_SYMBOL } from './constants'
import { stringToUrl, urlToString } from './route-utils'
import type { RouteUrl, RouteQuery } from './route-utils'

interface RouterProps {
  page: Page
}

export class Router {
  /** 当前路由所属的 page 对象 */
  readonly page: Page

  constructor(props: RouterProps) {
    this.page = props.page
  }

  /**
   * 将字符串格式化成标准的 URL 字符串
   * 它会补齐传入的字符串中缺失的部分，并确保 URL 查询参数都进行了编码
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
   * 改变当前 URL (通过修改 location.href)
   * 
   * @example
   * changeUrl('/foo', { bar: 123 })
   */
  changeUrl(urlOrStr: string | RouteUrl, query?: RouteQuery) {
    location.href = this.formatUrl(urlOrStr, query)
  }

  /**
   * 替换当前 URL (通过 location.replace 方法)
   * 
   * @example
   * replaceUrl('/foo', { bar: 123 })
   */
  replaceUrl(urlOrStr: string | RouteUrl, query?: RouteQuery) {
    location.replace(this.formatUrl(urlOrStr, query))
  }

  /**
   * 打开一个新的 URL (通过点击 \<a\> 元素)
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
  openUrl(urlOrStr: string | RouteUrl, query?: RouteQuery, target: 'blank' | 'self' | 'parent' | 'top' = 'blank') {
    const anchorDom = document.createElement('a')
    anchorDom.setAttribute('href', this.formatUrl(urlOrStr, query))
    anchorDom.setAttribute('target', '_' + target)
    anchorDom.click()
  }

  /**
   * 添加一条 URL 记录
   * 
   * @example
   * push('/foo', { bar: 123 })
   */
  push(urlOrStr: string | RouteUrl, query?: RouteQuery) {
    history.pushState(undefined, '', this.formatUrl(urlOrStr, query))
  }

  /**
   * 替换当前 URL 记录
   * 
   * @example
   * replace('/foo', { bar: 123 })
   */
  replace(urlOrStr: string | RouteUrl, query?: RouteQuery) {
    history.replaceState(undefined, '', this.formatUrl(urlOrStr, query))
  }

  /**
   * 跳转至后几条 URL 记录
   * 
   * @example
   * forward()
   */
  forward(delta: number = 1) {
    history.go(delta)
  }

  /**
   * 回退至前几条 URL 记录
   * 
   * @example
   * back()
   */
  back(delta: number = 1) {
    history.go(-delta)
  }
}
