import React from 'react'
import { PageDoc } from 'com/page-doc'
import { ClassIcon, HookFunctionIcon, ComponentIcon } from 'sicon'
import pkg from '../../../package.json'
import type { PageProps } from 'sdin-react'
import type { Collection } from 'ark-doc'

const CLASS_ICON = <ClassIcon color="var(--red)" />
const HOOK_ICON = <HookFunctionIcon color="var(--green)" />
const COMPONENT_ICON = <ComponentIcon color="var(--blue)" />

const COLLECTIONS: Collection<string,string>[] = [
  {
    value: '9999',
    label: '指南',
    contents: [
      {
        value: '0006',
        label: '用法',
        content: () => import('./0006')
      }
    ]
  },
  {
    value: '9998',
    label: '接口文档',
    contents: [
      {
        value: '0001',
        label: 'usePage',
        icon: HOOK_ICON,
        content: () => import('./0001')
      },
      {
        value: '0005',
        label: 'Page',
        icon: CLASS_ICON,
        content: () => import('./0005')
      },
      {
        value: '0003',
        label: 'Router',
        icon: CLASS_ICON,
        content: () => import('./0003')
      },
      {
        value: '0004',
        label: 'Tracker',
        icon: CLASS_ICON,
        content: () => import('./0004')
      },
      {
        value: '0002',
        label: 'Impression',
        icon: COMPONENT_ICON,
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