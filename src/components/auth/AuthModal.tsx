"use client";

import { useState } from "react";
import RegisterModal from "../modal/RegisterModal";

const AuthModal = ({ param }: { param: 'login' | 'register' }) => {
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  const handleRegisterModal = (open: boolean) => {
    setRegisterModal(open);
  }

  return (
    <>
      <RegisterModal open={registerModal} handleRegisterModal={handleRegisterModal} param={param} />
    </>
  );
};

export default AuthModal;
