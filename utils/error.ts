import { toast } from "../hooks/use-toast";

export const handleError = (error: unknown) => {
  let errorMessage;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }
  toast({
    variant: "destructive",
    title: "Error",
    description: errorMessage || "Something went wrong.",
  });
};
