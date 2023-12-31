"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

interface ModalState {
  isModalOpen: boolean;
  roomModalOpen: boolean;
  openParticipants: boolean;
  latestInputRef: any;
  inputRef: any;
  focus: boolean;
  isUserModalOpen: boolean;
  isRoomInfo: boolean;
  checker: boolean;
  showAccount: boolean;
  showFriends: boolean;
  showRoom: boolean;
  setShowRoom: Dispatch<SetStateAction<boolean>>;
  setShowFriends: Dispatch<SetStateAction<boolean>>;
  setShowAccount: Dispatch<SetStateAction<boolean>>;
  setChecker: Dispatch<SetStateAction<boolean>>;
  setRoomInfo: Dispatch<SetStateAction<boolean>>;
  setUserModalOpen: Dispatch<SetStateAction<boolean>>;
  setRoomModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setFocus: Dispatch<SetStateAction<boolean>>;
  setParticipants: Dispatch<SetStateAction<boolean>>;
}

const StateContext = createContext<ModalState | null>(null);
export function StateProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isRoomInfo, setRoomInfo] = useState(false);
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [openParticipants, setParticipants] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [checker, setChecker] = useState(false);
  const [focus, setFocus] = useState(false);
  const latestInputRef = useRef(null);
  const inputRef = useRef(null);
  return (
    <StateContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        roomModalOpen,
        setRoomModalOpen,
        openParticipants,
        setParticipants,
        latestInputRef,
        inputRef,
        focus,
        isUserModalOpen,
        setUserModalOpen,
        setFocus,
        isRoomInfo,
        setRoomInfo,
        checker,
        setChecker,
        showAccount,
        setShowAccount,
        showFriends,
        setShowFriends,
        showRoom,
        setShowRoom,
      }}
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
