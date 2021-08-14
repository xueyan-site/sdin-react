import React, { useEffect, Fragment } from 'react'
import { createProvider, useData, useStore } from 'xueyan-react-store'
import { PageStore, PAGE_STORE_KEY } from './page'
import { stringToUrl } from './route'
import type { PageData, PageMeta, PageOptions } from './page'

export function usePage() {
  return useData<PageData>(PAGE_STORE_KEY)
}

export function usePager() {
  return useStore<PageStore>(PAGE_STORE_KEY)
}

export interface PageProviderProps extends PageOptions {
  page: PageMeta
}

export const PageProvider = createProvider(
  ({ page, ...options }: PageProviderProps) => {
    return new PageStore(
      Object.assign(page, stringToUrl(location.href)),
      options
    )
  },
  props => {
    useEffect(() => props.store.trackPv(), [])
    return <Fragment>{props.children}</Fragment>
  }
)
