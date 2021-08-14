import React, { useEffect, Fragment } from 'react'
import { createProvider, useData, useStore } from 'xueyan-react-store'
import { PageStore, PAGE_STORE_KEY } from './page'
import { stringToUrl } from './route'
import type { PageData, PagePartData } from './page'

export function usePage() {
  return useData<PageData>(PAGE_STORE_KEY)
}

export function usePager() {
  return useStore<PageStore>(PAGE_STORE_KEY)
}

export const PageProvider = createProvider(
  (props: { page: PagePartData }) => {
    return new PageStore({
      ...props.page,
      ...stringToUrl(location.href)
    })
  },
  props => {
    useEffect(() => props.store.trackPv(), [])
    return <Fragment>{props.children}</Fragment>
  }
)
