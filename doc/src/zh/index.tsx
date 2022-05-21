import React from 'react'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'xueyan-react'
import type { Collection } from 'xueyan-react-doc'

const COLLECTIONS: Collection<string,string>[] = [
  {
    value: '9999',
    label: '接口文档',
    contents: [
      {
        value: '0001',
        label: 'usePage hook',
        content: () => import('./0001')
      },
      {
        value: '0003',
        label: 'Router 对象',
        content: () => import('./0003')
      },
      {
        value: '0004',
        label: 'Tracker 对象',
        content: () => import('./0004')
      },
      {
        value: '0002',
        label: 'Impression 组件',
        content: () => import('./0002')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="zh"
      version={pkg.version}
      collections={COLLECTIONS}
      name={pkg.name}
      description={pkg.description}
    />
  )
}
