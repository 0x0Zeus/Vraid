import Footer from "@/components/layout/Footer"
import SubMenu from "@/components/layout/SubMenu"
import { DisplayProvider } from "@/context/DisplayContext"

const MainLayout = ({ params, children }: { params: { slug: string }, children: React.ReactNode }) => {
  const { slug } = params

  return (
    <>
      <SubMenu param={slug} />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
