'use client'

import GridList from "@/components/GridList"
import TableList from "@/components/TableList"
import { useDisplay } from "@/context/DisplayContext"
import React, { use } from "react"

const Page = ({ params }: { params: Promise<{ slug: string, subslug: string }> }) => {
  const { slug, subslug } = use(params)
  const { displayWay } = useDisplay()

  return (
    <>
      {displayWay === 'list' ? <TableList /> : <GridList />}
    </>
  )
}
export default Page