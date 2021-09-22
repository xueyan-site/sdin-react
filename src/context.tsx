import React, { useEffect, createElement } from 'react'
import { useData, useStore } from 'xueyan-react-store'
import { PageStore } from './page'
import { stringToUrl } from './route'
import { ErrorBoundary, initialErrorTracker } from './error'
import { PAGE_STORE_KEY } from './constants'
import type { PageData } from './page'

/**
 * page data hook
 */
export function usePage() {
  return useData<PageData>(PAGE_STORE_KEY)
}

/**
 * page store hook
 */
export function usePager() {
  return useStore<PageStore>(PAGE_STORE_KEY)
}

export interface PageProps {
  pager: PageStore,
  page: PageData
}

/**
 * 页面的Store
 */
let store: PageStore = undefined as any

/**
 * 创建store，以及初始化错误追踪机制
 */
if (!store) {
  store = new PageStore(Object.assign(
    (window as any).XT_PAGE, 
    stringToUrl(location.href)
  ))
  delete (window as any).XT_PAGE;
  initialErrorTracker(store)
}

/**
 * page data and store provider  
 * please don't use it in your project  
 * we've integrated it into xueyan-typescript-cli  
 */
export function PageProvider({
  Content
}: {
  Content: React.ComponentType<PageProps>
}) {
  useEffect(() => store.trackPv(), [])
  return createElement(store.Provider, {
    children: props => (
      <ErrorBoundary store={props.store as any}>
        <Content page={props.data} pager={props.store as any} />
      </ErrorBoundary>
    )
  })
}
