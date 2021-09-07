import { Component } from 'react'
import type { ErrorInfo } from 'react'
import type { PageStore } from './page'

interface ErrorBoundaryProps {
  store: PageStore
}

interface ErrorBoundaryState {
  error: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { error: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.store.trackError(error, errorInfo)
    console.error(error)
  }

  render() {
    return this.state.error 
      ? null
      : this.props.children
  }
}

/**
 * 记录是否被初始化
 * 以保证该过程在页面中只会被执行一次
 */
let isInitialized: boolean = false

/**
 * 上次发送的报错信息
 * 用以去重，防止多次发送相同的错误
 */
let prevError: any = undefined
let prevReason: any = undefined

/**
 * 初始化错误追踪机制
 */
export function initialErrorTracker(store: PageStore) {
  if (isInitialized) {
    return
  }
  isInitialized = true
  window.addEventListener('error', event => {
    const err = event.error instanceof Error 
      ? event.error.message 
      : (event.error || event.message)
    if (prevError !== err) {
      prevError = err
      store.trackError(event.error, {
        file: event.filename,
        line: event.lineno,
        col: event.colno,
        msg: event.message
      })
    }
  })
  window.addEventListener('unhandledrejection', event => {
    const err = event.reason instanceof Error 
      ? event.reason.message 
      : event.reason
    if (prevReason !== err) {
      prevReason = err
      store.trackError(event.reason)
    }
  })
}
