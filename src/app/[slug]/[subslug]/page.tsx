'use client'

import GridList from "@/components/gridlist/GridList"
import TableList from "@/components/TableList"
import { useDisplay } from "@/context/DisplayContext"
import data from "@/lib/data"
import React, { use } from "react"

const Page = ({ params }: { params: Promise<{ slug: string, subslug: string }> }) => {
  const { slug, subslug } = use(params)
  const { displayWay } = useDisplay()

  return (
    <>
      {displayWay === 'list' ? <TableList data={data} /> : <GridList data={data} />}
    </>
  )
}
export default Page