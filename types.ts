// Locale option
export type LocaleOption = "nl" | "en";

// Application error
export type AppError = {
  message: string;
  path: string;
};

// Category field of the user
export type CategoryField = {
  subscriptionEnd?: string | null;
  demoEnd?: string | null;
  pauseEnd?: string | null;
};
