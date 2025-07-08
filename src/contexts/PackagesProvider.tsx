"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface Package {
  id: string;
  category: string;
  duration: string;
  price: string;
  image?: string;
  name?: string;
  discount?: boolean;
  discountPercentage?: number;
}

interface PackagesContextProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  packages: Package[];
  selectedPackage: Package | null;
  selectedPackageId: string | null;
  setSelectedPackage: (pkg: Package | null) => void;
  setSelectedPackageId: (id: string | null) => void;
  getPackagesByCategory: (category: string) => Package[];
}

const PackagesContext = createContext<PackagesContextProps | undefined>(
  undefined
);

// Static package data - you can replace this with API calls later
const PACKAGES_DATA: Package[] = [
  // Auto packages
  { id: "auto-1", category: "Auto", duration: "1 WEEK", price: "29", name: "Starter", discount: false, discountPercentage: 0 },
  { id: "auto-2", category: "Auto", duration: "1 MONTH", price: "99", name: "Basic", discount: true, discountPercentage: 50 },
  { id: "auto-3", category: "Auto", duration: "3 MONTHS", price: "249", name: "Premium", discount: false, discountPercentage: 0 },
  { id: "auto-4", category: "Auto", duration: "6 MONTHS", price: "399", name: "Ultimate", discount: false, discountPercentage: 0 },

  // Motor packages
  { id: "motor-1", category: "Motor", duration: "1 WEEK", price: "25", name: "Quick", discount: false, discountPercentage: 0 },
  { id: "motor-2", category: "Motor", duration: "1 MONTH", price: "89", name: "Standard", discount: false, discountPercentage: 0 },
  { id: "motor-3", category: "Motor", duration: "3 MONTHS", price: "229", name: "Advanced", discount: true, discountPercentage: 15 },
  { id: "motor-4", category: "Motor", duration: "6 MONTHS", price: "369", name: "Pro", discount: false, discountPercentage: 0 },

  // Moped packages
  { id: "moped-1", category: "Moped", duration: "1 WEEK", price: "22", name: "Light", discount: false, discountPercentage: 0 },
  { id: "moped-2", category: "Moped", duration: "1 MONTH", price: "79", name: "Simple", discount: false, discountPercentage: 0 },
  { id: "moped-3", category: "Moped", duration: "3 MONTHS", price: "199", name: "Complete", discount: false, discountPercentage: 0 },
  { id: "moped-4", category: "Moped", duration: "6 MONTHS", price: "339", name: "Master", discount: false, discountPercentage: 0 },
];

export const PackagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("Auto");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );

  const getPackagesByCategory = (category: string): Package[] => {
    return PACKAGES_DATA.filter((pkg) => pkg.category === category);
  };

  // Set default selected package (second one) when category changes
  useEffect(() => {
    const packagesInCategory = getPackagesByCategory(activeCategory);
    if (packagesInCategory.length >= 2) {
      const defaultPackage = packagesInCategory[1]; // Second package (index 1)
      setSelectedPackage(defaultPackage);
      setSelectedPackageId(defaultPackage.id);
    }
  }, [activeCategory]);

  return (
    <PackagesContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        packages: PACKAGES_DATA,
        selectedPackage,
        selectedPackageId,
        setSelectedPackage,
        setSelectedPackageId,
        getPackagesByCategory,
      }}
    >
      {children}
    </PackagesContext.Provider>
  );
};

export const usePackages = () => {
  const context = useContext(PackagesContext);

  if (!context) {
    throw new Error("usePackages must be used within a PackagesProvider");
  }

  return context;
};
