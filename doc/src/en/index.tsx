import React from 'react'
import { PageDoc } from 'com/page-doc'
import pkg from '../../../package.json'
import type { PageProps } from 'xueyan-react'
import type { DocumentInfo } from 'xueyan-react-doc'

const DOCUMENTS: DocumentInfo<string,string>[] = [
  {
    value: 'a',
    label: 'collection 1',
    contents: [
      {
        value: 'aa',
        label: 'chapter 1: introduction',
        content: () => import('./aa-introduction')
      }
    ]
  }
]

export default function Index(props: PageProps) {
  return (
    <PageDoc 
      {...props}
      language="en"
      version={pkg.version}
      documents={DOCUMENTS}
      name={pkg.name}
      description="English description"
    />
  )
}
