import React, { useEffect, createContext, useContext, useMemo } from 'react'
import { ErrorBoundary, initialErrorTracker } from './error'
import { Page } from './page'

/**
 * 页面的Store
 */
let pageCache: Page | undefined
let pageContext: React.Context<Page> | undefined
let pageClosed: (() => void) | undefined

if (!(pageCache  && pageContext)) {
  pageCache = new Page((window as any).P_PAGE)
  delete (window as any).P_PAGE;
  pageContext = createContext<Page>(pageCache)
  pageClosed = initialErrorTracker(pageCache)
}

/**
 * page data hook
 */
export function usePage() {
  return useContext<Page>(pageContext as any)
}

export interface PageProps {
  page: Page
}

/**
 * page data and store provider  
 * please don't use it in your project  
 * we've integrated it into sdin  
 */
export function PageProvider({
  Content
}: {
  Content: React.ComponentType<PageProps>
}) {
  const [page, Context, remove] = useMemo(() => {
    if (pageCache && pageContext && pageClosed) {
      return [pageCache, pageContext, pageClosed]
    } else {
      const page = new Page((window as any).P_PAGE)
      delete (window as any).P_PAGE;
      const context = createContext<Page>(page)
      const remove = initialErrorTracker(page)
      return [page, context, remove]
    }
  }, [])

  useEffect(() => {
    page.tracker.pv()
    return remove
  }, [])

  return (
    <Context.Provider value={page}>
      <ErrorBoundary page={page}>
        <Content page={page} />
      </ErrorBoundary>
    </Context.Provider>
  )
}
