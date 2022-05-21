import { random } from 'xueyan-react-store'
import { RouteStringQuery, stringToUrl } from './route-utils'
import { Router } from './router'
import { Tracker } from './tracker'

export interface PageMeta {
  /** 页面ID */
  id: string
  /** 页面名称 */
  name: string
  /** 预设的页面路径（以 / 开始，不以 / 结尾，比如 /aa/bb/cc）*/
  pagePath: string
  /** 预设的页面路径前缀（以 / 开始，以 / 结尾，比如 /aa/bb/）*/
  publicPath: string
  /** 预设的页面路径后缀（不以 / 开始，不以 / 结尾，比如 cc）*/
  privatePath: string
}

export class Page {
  /** 页面ID */
  readonly id: string

  /** 页面名称 */
  readonly name: string

  /** 页面访问ID（用于打点统计） */
  readonly viewId: string

  /** 页面 URL （比如 https://xxx.yy:zz/aa/bb/cc?mm=11&n=22#tt）*/
  readonly url: string

  /** 页面 URL 中的协议+域名（比如 https://xxx.yy:zz）*/
  readonly domain: string

  /** 页面 URL 中的协议（比如 https，没有 ://）*/
  readonly protocol: string

  /** 页面 URL 中的域名+端口（比如 xxx.yy:zz，没有协议前缀）*/
  readonly host: string

  /** 页面 URL 中的路径（以 / 开始，比如 /aa/bb/cc/）*/
  readonly path: string

  /** 预设的页面路径（以 / 开始，不以 / 结尾，比如 /aa/bb/cc）*/
  readonly pagePath: string

  /** 预设的页面路径前缀（以 / 开始，以 / 结尾，比如 /aa/bb/）*/
  readonly publicPath: string

  /** 预设的页面路径后缀（不以 / 开始，不以 / 结尾，比如 cc）*/
  readonly privatePath: string
  
  /** 页面 URL 中的查询对象（比如 {mm:11,n:22}）*/
  readonly query: RouteStringQuery

  /** 页面 URL 中的查询字符串（比如 mm=11&n=22，没有 ?）*/
  readonly search: string

  /** 页面 URL 中的 Hash 字符串（比如 tt，没有 #）*/
  readonly hash: string

  /** 路由对象 */
  readonly router: Router

  /** 打点对象 */
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
