import { use } from "react"
import Footer from "@/components/layout/Footer"

const MainLayout = ({ params, children }: { params: Promise<{ slug: string }>, children: React.ReactNode }) => {
  const { slug } = use(params)

  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
