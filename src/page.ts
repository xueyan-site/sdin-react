import Store from 'xueyan-react-store'
import { track, getPerfLog } from './track'
import { stringToUrl, urlToString } from './route'
import type { StoreOptions } from 'xueyan-react-store'
import type { TrackParams } from './track'
import type { RouteQuery, RouteUrl } from './route'

export const PAGE_STORE_KEY = 'PAGE'

/**
 * page meta
 */
export interface PagePartData {
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
   * page track url path, has '/'
   */
  trackPath: string
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
export interface PageData extends RouteUrl, PagePartData {}

export class PageStore extends Store<PageData> {
  constructor(defaultData: PageData, options?: StoreOptions) {
    super(PAGE_STORE_KEY, defaultData, options)
  }

  /**
   * 将url格式化成标准形态
   * 
   * 它会为给定的URL补齐没有的域名，确保URL参数都被encode过
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
   * 修改当前URL（通过操作location来实现）
   * 
   * @example
   * changeUrl('/foo', { bar: 123 })
   */
  changeUrl(url: string | RouteUrl, query?: RouteQuery) {
    location.href = this.formatUrl(url, query)
  }

  /**
   * 替换当前URL（通过操作location来实现）
   * 
   * @example
   * replaceUrl('/foo', { bar: 123 })
   */
  replaceUrl(url: string | RouteUrl, query?: RouteQuery) {
    location.replace(this.formatUrl(url, query))
  }

  /**
   * 打开指定URL（通过操作a链接来实现）
   * 
   * @param target 打开的方式（即a链接的target属性） @default 'blank'
   * self: 当前页面加载，即当前的响应到同一HTML 4 frame（或HTML5浏览上下文）。此值是默认的，如果没有指定属性的话。
   * blank: 新窗口打开，即到一个新的未命名的HTML4窗口或HTML5浏览器上下文
   * parent: 加载响应到当前框架的HTML4父框架或当前的HTML5浏览上下文的父浏览上下文。如果没有parent框架或者浏览上下文，此选项的行为方式与 _self 相同。
   * top: IHTML4中：加载的响应成完整的，原来的窗口，取消所有其它frame。 HTML5中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有parent）。如果没有parent框架或者浏览上下文，此选项的行为方式相同_self
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
   * 增加当前历史记录
   * 
   * @example
   * pushHistory('/foo', { bar: 123 })
   */
  pushHistory(url: string | RouteUrl, query?: RouteQuery) {
    history.pushState(undefined, '', this.formatUrl(url, query))
  }

  /**
   * 替换当前历史记录
   * 
   * @example
   * replaceHistory('/foo', { bar: 123 })
   */
  replaceHistory(url: string | RouteUrl, query?: RouteQuery) {
    history.replaceState(undefined, '', this.formatUrl(url, query))
  }

  /**
   * 回退历史记录
   * 
   * @example
   * backHistory()
   */
  backHistory(delta: number = 1) {
    history.go(-delta)
  }

  /**
   * 前进历史记录
   * 
   * @example
   * forwardHistory()
   */
  forwardHistory(delta: number = 1) {
    history.go(delta)
  }

  /**
   * 通用打点方法
   * @param a 动作，即打点的类别，如点击、曝光等
   * @param k 埋点关键字，自定义的一个字符串，用于区分埋点
   * @param params 其它打点信息
   * 
   * t参数拆解后，可得到如下信息：
   * 1 action 打点动作，如点击、曝光等
   * 2 key    打点信息的关键字，自定义的一个字符串，用于区分埋点
   * 3 view   浏览标识，代表当次访问页面唯一符号
   * 4 id     页面的ID，用于标识页面的名称
   * 5 path   页面Path
   * 6 search 页面search，页面访问时的query字符串
   * 7 hash   页面hash
   * 8 refer  页面的来源
   */
  track(a: string, k?: string, params?: TrackParams) {
    if (this.data.trackPath) {
      track(this, {
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
  }

  /**
   * 页面浏览时打点（会顺带附上页面的性能数据）
   * @param params 打点信息
   */
  trackPv(params?: TrackParams) {
    this.track('pv', undefined, {
      ...params,
      p: getPerfLog()
    })
  }

  /**
   * 曝光时打点
   * @param k 埋点关键字，自定义的一个字符串，用于区分埋点
   * @param params 其它打点信息
   */
  trackImpr(k: string, params?: TrackParams) {
    k && this.track('ips', k, params)
  }

  /**
   * 点击时打点
   * @param k 埋点关键字，自定义的一个字符串，用于区分埋点
   * @param params 其它打点信息
   */
  trackClick(k: string, params?: TrackParams) {
    k && this.track('clk', k, params)
  }

  /**
   * 信息打点
   * @param k 埋点关键字，自定义的一个字符串，用于区分埋点
   * @param info 信息
   * @param params 其它打点信息
   */
  trackInfo(info?: any, params?: TrackParams) {
    info && this.track('inf', undefined, {
      ...params,
      i: info
    })
  }

  /**
   * 错误打点
   * @param k 埋点关键字，自定义的一个字符串，用于区分埋点
   * @param error 错误信息
   * @param params 其它打点信息
   */
  trackError(error?: Error, params?: TrackParams) {
    error && this.track('err', undefined, {
      ...params,
      e: error
    })
  }
}
