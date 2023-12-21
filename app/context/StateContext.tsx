"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ModalState {
  isModalOpen: boolean;
  roomModalOpen: boolean;
  setRoomModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const StateContext = createContext<ModalState | null>(null);
export function StateProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  return (
    <StateContext.Provider
      value={{ isModalOpen, setModalOpen, roomModalOpen, setRoomModalOpen }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useModalState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("state contexxt must be used with provider");
  }
  return context;
}
