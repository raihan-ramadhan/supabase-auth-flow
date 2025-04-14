import { render, screen } from "@testing-library/react";

import OAuthButton from "../OAuthButton";

describe("OAuthButton", () => {
  it("renders correctly with provided props", () => {
    const mockIcon = <svg data-testid="mock-icon" />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("with")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("has correct button attributes", () => {
    const mockIcon = <svg />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("has correct style appearance on light and dark mode", () => {
    const mockIcon = <svg />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "active:bg-neutral-200 dark:active:bg-neutral-700 dark:hover:bg-neutral-900 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-border cursor-pointer outline-none"
    );
  });

  it("has correct text position", () => {
    const mockIcon = <svg />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("flex justify-center");
  });

  it("The button has a style position: relative; so the icon can be positioned correctly", () => {
    const mockIcon = <svg />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("relative");
  });

  it("icon positioned correctly", () => {
    const mockIcon = <svg />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    const iconSpan = screen.getByTestId("icon-container");

    expect(iconSpan).toHaveClass("absolute left-3 top-1/2 -translate-y-1/2");
  });

  it("black icon can be see on dark mode", () => {
    const mockIcon = <svg />;
    render(<OAuthButton name="Google" icon={mockIcon} />);

    const iconSpan = screen.getByTestId("icon-container");

    expect(iconSpan).toHaveClass("dark:drop-shadow dark:drop-shadow-neutral-500");
  });
});
