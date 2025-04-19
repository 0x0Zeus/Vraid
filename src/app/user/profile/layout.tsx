import Footer from "@/components/layout/Footer";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default ProfileLayout;
