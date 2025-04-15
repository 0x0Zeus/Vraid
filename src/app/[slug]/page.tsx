'use client'

import { useRouter } from "next/navigation"
import { use, useEffect } from "react"

const Page = ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = use(params)
  const router = useRouter()
  useEffect(() => {
    router.push(`/${slug}/all`)
  })

  return (
    <div className="max-h-fit">
      
    </div>
  )
}

export default Page