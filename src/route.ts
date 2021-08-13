/**
 * 路由查询参数
 */
export interface RouteQuery {
  [key: string]: string | number | boolean | undefined
}

/**
 * 路由查询参数（纯字符串形态）
 */
export interface RouteStringQuery {
  [key: string]: string | undefined
}

/**
 * 路由URL对象
 */
export interface RouteUrl {
  url: string // 'https://xxx.yy:zz/aa/bb/cc?mm=11&n=22#tt'
  domain: string // 'https://xxx.yy:zz'
  query: RouteStringQuery // {mm:11,n:22}
  protocol: string // 'https'
  host: string // 'xxx.yy:zz'
  path: string // '/aa/bb/cc'
  search: string // 'mm=11&n=22'
  hash: string // 'tt'
}

/**
 * 将字符串转换为query对象
 */
export function stringToQuery(urlStr: string): RouteStringQuery {
  const query: RouteStringQuery = {}
  if (urlStr) {
    const queryStr = (urlStr.split('?')[1] || '').split('#')[0]
    const segments = queryStr.split('&')
    segments.forEach(seg => {
      if (seg) {
        const [k, v] = seg.split('=')
        if (k) {
          query[k] = decodeURIComponent(v)
        }
      }
    })
  }
  return query
}

/**
 * 将query对象转换成字符串
 */
export function queryToString(query: RouteQuery, prefix: string = '?') {
  let segments: string[] = []
  Object.keys(query).forEach(k => {
    if (k) {
      const v: any = query[k]
      if (v || v === 0) {
        segments.push(k + '=' + encodeURIComponent(v))
      }
    }
  })
  return segments.length > 0 ? prefix + segments.join('&') : ''
}

/**
 * 将字符串转换为query对象
 */
export function stringToUrl(urlStr: string, query?: RouteQuery): RouteUrl {
  /**
   * 从第一个?开始分割，解析出前后两部分
   */
  let prev = urlStr
  let next = ''
  for (let i = 0; i < urlStr.length; i++) {
    if (urlStr[i] === '?') {
      prev = urlStr.slice(0, i)
      next = urlStr.slice(i + 1)
      break
    }
  }
  /**
   * 从第一个#开始分割，解析出search、hash
   */
  let search: string = next
  let hash: string = ''
  if (next) {
    for (let i = 0; i < next.length; i++) {
      if (next[i] === '#') {
        search = next.slice(0, i)
        hash = next.slice(i + 1)
        break
      }
    }
  }
  /**
   * 将search解析成query对象
   */
  const query2: RouteStringQuery = {}
  if (next) {
    const segments = search.split('&')
    for (let i = 0; i < segments.length; i++) {
      const [k, v] = segments[i].split('=')
      query2[k] = decodeURIComponent(v)
    }
  }
  if (query) {
    Object.assign(query2, query)
    search = queryToString(query2, '')
  }
  /**
   * 解析出protocol
   */
  let protocol: string = ''
  next = prev
  if (prev) {
    const idx = prev.indexOf('://')
    if (idx >= 0) {
      protocol = prev.slice(0, idx) || 'https'
      next = prev.slice(idx + 3)
    }
  }
  /**
   * 解析出host、path
   */
  let host: string = ''
  let path: string = next
  if (next) {
    let hasDot: boolean = false
    for (let i = 0; i < next.length; i++) {
      if (!hasDot && next[i] === '.') {
        hasDot = true
      }
      if (next[i] === '/') {
        if (hasDot) {
          host = next.slice(0, i)
          path = next.slice(i)
        }
        break
      }
    }
  }
  if (path[0] !== '/') {
    path = '/' + path
  }
  /**
   * 拼接domain
   */
  let domain: string = ''
  if (protocol && host) {
    domain = protocol + '://' + host
  } else {
    protocol = 'https'
    host = location.host
    domain = protocol + '://' + location.host
  }
  /**
   * 拼接url
   */
  let urlStr2: string = domain + path
  if (search) {
    urlStr2 = urlStr2 + '?' + search
  }
  if (hash) {
    urlStr2 = urlStr2 + '#' + hash
  }
  /**
   * 返回结果
   */
  return {
    url: urlStr2,
    domain,
    query: query2,
    protocol,
    host,
    path,
    search,
    hash
  }
}

/**
 * 将字符串转换为query对象
 */
export function urlToString(url: RouteUrl, query?: RouteQuery): string {
  let urlStr: string = url.domain + url.path
  if (query) {
    urlStr = urlStr + queryToString(Object.assign({}, url.query, query))
  } else {
    urlStr = urlStr + queryToString(url.query)
  }
  if (url.hash) {
    urlStr = urlStr + '#' + url.hash
  }
  return urlStr
}
