'use client'

import GridList from "@/components/gridlist/GridList"
import data from "@/lib/data"
import { useParams } from "next/navigation"
import React, { use } from "react"

const Page = () => {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <>
      <GridList data={data} />
    </>
  )
}
export default Page