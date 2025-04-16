import { use } from "react"
import Footer from "@/components/layout/Footer"
import SubMenu from "@/components/layout/SubMenu"
import { DisplayProvider } from "@/context/DisplayContext"

const MainLayout = ({ params, children }: { params: Promise<{ slug: string }>, children: React.ReactNode }) => {
  const { slug } = use(params)

  return (
    <>
      <SubMenu param={slug} />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
