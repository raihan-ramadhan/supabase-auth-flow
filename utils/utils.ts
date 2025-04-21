export type ErrorObject = {
  string: string[] | undefined;
};

export function logErrorMessages(errorObject: ErrorObject) {
  // Extract all error messages from the object
  const errors: string[] = [];

  for (const key in errorObject) {
    const value = errorObject[key as keyof ErrorObject];
    if (Array.isArray(value)) {
      errors.push(...value);
    }
  }

  // Combine all error messages into a single sentence
  const errorSentence = errors.join(", ") + ".";

  // Log the combined sentence to the console
  return errorSentence;
}
