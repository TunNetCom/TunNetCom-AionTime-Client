"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

import { SignInModal, useSignInModal } from "./sign-in-modal";
import { SignUpModal, useSignUpModal } from "./sign-up-modal";

interface ModalContextType {
  setShowSignInModal: (show: boolean) => void;
  setShowSignUpModal: (show: boolean) => void;
}

const ModalContext = createContext<ModalContextType>({
  setShowSignInModal: () => {},
  setShowSignUpModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { setShowSignInModal, SignInModal: SignInModalComponent } = useSignInModal();
  const { setShowSignUpModal, SignUpModal: SignUpModalComponent } = useSignUpModal();

  const value = useMemo(
    () => ({
      setShowSignInModal,
      setShowSignUpModal,
    }),
    [setShowSignInModal, setShowSignUpModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <SignInModalComponent />
      <SignUpModalComponent />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalContext };
