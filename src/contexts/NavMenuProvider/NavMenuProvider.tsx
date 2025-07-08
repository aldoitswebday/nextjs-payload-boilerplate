"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Navigation menu context type
type NavMenuContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// Create context
const NavMenuContext = createContext<NavMenuContextType | undefined>(undefined);

type NavMenuProviderProps = {
  children: ReactNode;
};

export const NavMenuProvider = ({ children }: NavMenuProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Open the navigation menu
  const open = () => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      scrollToTop();
      setIsOpen(true);
    }
  };

  // Close the navigation menu
  const close = () => {
    if (isOpen) {
      document.body.style.overflow = "";
      scrollToTop();
      setIsOpen(false);
    }
  };

  // Toggle between the open and closed navigation menu states
  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  // Close the navigation menu when the window is resized
  useEffect(() => {
    const closeAfterResize = () => {
      document.body.style.overflow = "";
      setIsOpen(false);
    };

    window.addEventListener("resize", closeAfterResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", closeAfterResize);
    };
  }, []);

  // Provide the navigation menu context
  return (
    <NavMenuContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </NavMenuContext.Provider>
  );
};

// Hook to access the navigation menu context
export const useNavMenu = () => {
  const context = useContext(NavMenuContext);

  if (!context) {
    throw new Error("useNavMenu must be used within a NavMenuProvider");
  }

  return context;
};
