import { PERF_JOIN_SYMBOL } from './constants'

/**
 * Get client performance logs
 * 
 * performance.timing.navigationStart 从同一个浏览器的上一个页面卸载 unload 结束时的时间戳（精确到毫秒）
 * performance.timing.unloadEventStart unload 事件执行时的时间戳。如果没有上一个页面，或者如果先前的页面或所需的重定向之一不是同一个来源, 这个值会返回0
 * performance.timing.unloadEventEnd unload 事件执行完的时间戳。如果没有上一个页面，或者如果先前的页面或所需的重定向之一不是同一个来源, 这个值会返回0
 * performance.timing.redirectStart 第一个HTTP重定向开始时得时间戳。如果没有上一个页面，或者如果先前的页面或所需的重定向之一不是同一个来源, 这个值会返回0
 * performance.timing.redirectEnd 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个字节直接被收到的时间）的时间戳
 * performance.timing.fetchStart 表征了浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前
 * performance.timing.domainLookupStart 表征了域名查询开始的时间戳。如果使用了持续连接，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart 一致
 * performance.timing.domainLookupEnd 表征了域名查询结束的时间戳。如果使用了持续连接，或者这个信息存储到了缓存或者本地资源上，这个值将和 PerformanceTiming.fetchStart 一致
 * performance.timing.connectStart 返回HTTP请求开始向服务器发送时的时间戳。如果使用持久连接，则返回值等同于 fetchStart 属性的值
 * performance.timing.secureConnectionStart 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0
 * performance.timing.connectEnd 返回浏览器与服务器之间的连接建立时的时间戳。如果建立的是持久连接，则返回值等同于 fetchStart 属性的值。连接建立指的是所有握手和认证过程全部结束
 * performance.timing.requestStart 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳
 * performance.timing.responseStart 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间
 * performance.timing.responseEnd 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳
 * performance.timing.domLoading 返回当前网页DOM结构开始解析时（即 Document.readyState 属性变为 loading 、相应的 readystatechange 事件触发时）的时间戳
 * performance.timing.domInteractive 返回当前网页DOM结构结束解析、开始加载内嵌资源时（即 Document.readyState 属性变为 interactive 、相应的 readystatechange 事件触发时）的时间戳
 * performance.timing.domContentLoadedEventStart 返回当解析器发送 DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳
 * performance.timing.domContentLoadedEventEnd 返回当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳
 * performance.timing.domComplete 返回当前文档解析完成，即 Document.readyState 变为 complete 且相对应的 readystatechange 被触发时的时间戳
 * performance.timing.loadEventStart 返回该页面下，load 事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0
 * performance.timing.loadEventEnd 返回当 load 事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0
 * 页面完全加载耗时 timing.loadEventEnd - timing.navigationStart 
 * 页面白屏时间 time.domLoading - timing.navigationStart
 * 首屏时间 Date.now() - timing.navigationStart
 * 可交互 timing.domContentLoadedEventEnd - timing.navigationStart
 * 准备耗时 timing.domainLookupStart - timing.navigationStart
 * 重定向耗时 timing.redirectEnd - timing.redirectStart
 * DNS解析耗时 timing.domainLookupEnd - timing.domainLookupStart
 * ip连接耗时 timing.connectEnd - timing.connectStart
 * 首包耗时 timing.responseStart - timing.requestStart
 * 完整包加载耗时 timing.responseEnd - (timing.requestStart ? timing.requestStart : timing.fetchStart)),
 * dom处理 timing.domComplete - timing.domLoading
 * 资源加载耗时 info.duration
 * 当前页面文件大小 navigasitonInfo ? navigasitonInfo.transferSize : 0
 */
export function getPerfLog(): string {
  const perf = window.performance
  if (!perf) return ''
  const timing: PerformanceNavigationTiming = perf.getEntriesByType('navigation')[0] as any
  if (!timing) return ''
  const memory = (perf as any).memory || {}
  return [
    timing.type, // 怎么进入这个页面的
    perf.timeOrigin, // 客户端记录的最初开始时间
    Date.now() - perf.timeOrigin, // 当前时间距离开始的差值（可交互时间）
    // --------------------
    timing.startTime, // 开始时间
    timing.duration, // 经过时间
    // --------------------
    timing.unloadEventStart,
    timing.unloadEventEnd,
    // --------------------
    timing.redirectCount,
    timing.redirectStart,
    timing.redirectEnd,
    // --------------------
    timing.fetchStart,
    timing.domainLookupStart,
    timing.domainLookupEnd,
    // --------------------
    timing.connectStart,
    timing.secureConnectionStart,
    timing.connectEnd,
    // --------------------
    timing.requestStart,
    timing.responseStart,
    timing.responseEnd,
    // --------------------
    timing.domInteractive,
    timing.domContentLoadedEventStart,
    timing.domContentLoadedEventEnd,
    timing.domComplete,
    // --------------------
    timing.loadEventStart,
    timing.loadEventEnd,
    timing.workerStart,
    timing.transferSize,
    timing.encodedBodySize,
    timing.decodedBodySize,
    timing.nextHopProtocol,
    // --------------------
    memory.usedJSHeapSize, // 被使用的 JS 堆栈内存
    memory.totalJSHeapSize, // 当前 JS 堆栈内存总大小
    memory.jsHeapSizeLimit, // 内存大小限制
  ].map((v: any) => {
    if (typeof v === 'number') {
      const i = Number(v.toFixed(2))
      return i > 0 ? i : ''
    } else {
      return v || ''
    }
  }).join(PERF_JOIN_SYMBOL)
}
