import { Component } from 'react'
import type { ErrorInfo } from 'react'
import type { Page } from './page'

interface ErrorBoundaryProps {
  page: Page
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
    this.props.page.tracker.err(error, errorInfo)
    console.error(error)
  }

  render() {
    return this.state.error 
      ? null
      : this.props.children
  }
}

/**
 * 初始化错误追踪机制
 */
export function initialErrorTracker(page: Page) {
  /**
   * 错误处理
   */
  let prevError: any = undefined
  const errHandler = (event: ErrorEvent) => {
    const err = event.error instanceof Error 
      ? event.error.message 
      : (event.error || event.message)
    if (prevError !== err) {
      prevError = err
      page.tracker.err(event.error, {
        file: event.filename,
        line: event.lineno,
        col: event.colno,
        msg: event.message
      })
    }
  }
  window.addEventListener('error', errHandler)
  /**
   * 未捕获异常处理
   */
  let prevReason: any = undefined
  const rejectHandler = (event: PromiseRejectionEvent) => {
    const err = event.reason instanceof Error 
      ? event.reason.message 
      : event.reason
    if (prevReason !== err) {
      prevReason = err
      page.tracker.err(event.reason)
    }
  }
  window.addEventListener('unhandledrejection', rejectHandler)
  /**
   * 清除监听器
   */
  return () => {
    window.removeEventListener('error', errHandler)
    window.removeEventListener('unhandledrejection', rejectHandler)
  }
}
