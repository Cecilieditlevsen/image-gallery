import React from 'react'

type Props = {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className="mx-auto max-w-3xl px-6">{children}</div>
}
