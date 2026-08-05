import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const rawMessage = error.response?.data?.message;
    const message = Array.isArray(rawMessage)
      ? rawMessage[0]
      : (rawMessage ?? error.message);

    return status ? `${status} ${message}` : message;
  }

  return "An unexpected error occurred. Please try again later.";
};
