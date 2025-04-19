import Footer from "@/components/layout/Footer";

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default PortfolioLayout;
