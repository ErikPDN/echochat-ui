import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    return Array.isArray(message) ? message[0] : message || error.message;
  }
};
