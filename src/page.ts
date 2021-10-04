import { random } from 'xueyan-react-store'
import { RouteStringQuery, stringToUrl } from './route-utils'
import Router from './router'
import Tracker from './tracker'

/**
 * page meta
 */
export interface PageMeta {
  /**
   * page id
   */
  id: string
  /**
   * page name
   */
  name: string
  /**
   * page url full path, start with '/'
   */
  pagePath: string
  /**
   * page url public path, start and end with '/'
   */
  publicPath: string
  /**
   * page url suffix path, not start with '/'
   */
  privatePath: string
}

/**
 * page
 */
export default class Page {
  /**
   * page id
   */
  readonly id: string

  /**
   * page name
   */
  readonly name: string

  /**
   * page url full path, start with '/'
   */
  readonly pagePath: string

  /**
   * page url public path, start and end with '/'
   */
  readonly publicPath: string

  /**
   * page url suffix path, not start with '/'
   */
  readonly privatePath: string

  /**
   * current view id
   */
  readonly viewId: string

  /**
   * @example 'https://xxx.yy:zz/aa/bb/cc?mm=11&n=22#tt'
   */
  readonly url: string

  /**
   * @example 'https://xxx.yy:zz'
   */
  readonly domain: string

  /**
   * a plain object
   * @example {mm:11,n:22}
   */
  readonly query: RouteStringQuery

  /**
   * no '://'
   * @example 'https'
   */
  readonly protocol: string

  /**
   * no 'https://', has port
   * @example 'xxx.yy:zz'
   */
  readonly host: string

  /**
   * has '/'
   * @example '/aa/bb/cc'
   */
  readonly path: string

  /**
   * no '?'
   * @example 'mm=11&n=22'
   */
  readonly search: string

  /**
   * no '#'
   * @example 'tt'  
   */
  readonly hash: string

  /**
   * router object
   */
  readonly router: Router

  /**
   * tracker object
   */
  readonly tracker: Tracker
  
  constructor(meta: PageMeta) {
    this.id = meta.id
    this.name = meta.name
    this.pagePath = meta.pagePath
    this.publicPath = meta.publicPath
    this.privatePath = meta.privatePath
    this.viewId = random()
    const url = stringToUrl(location.href)
    this.url = url.url
    this.domain = url.domain
    this.query = url.query
    this.protocol = url.protocol
    this.host = url.host
    this.path = url.path
    this.search = url.search
    this.hash = url.hash
    this.router = new Router({ page: this })
    this.tracker = new Tracker({ page: this })
  }
}
