import { fireEvent, render, screen } from "@testing-library/react";

import FormButton from "@/components/FormButton";

describe("FormButton", () => {
  const mockIcon = <svg data-testid="test-icon" />;
  const mockOnClick = jest.fn();
  const defaultProps = {
    name: "Magic Link",
    icon: mockIcon,
    onClick: mockOnClick,
    idx: 0 as 0 | 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with provided props", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    expect(screen.getByText("Magic Link")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("with")).toBeInTheDocument();

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("calls the onClick handler with the correct index when clicked", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(0); // zero is argument
  });

  it("calls the onClick handler with index 1 when provided", () => {
    render(<FormButton {...defaultProps} idx={1} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(1);
  });

  it("has correct button attributes", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("has correct style appearance on light and dark mode", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "active:bg-neutral-200 dark:active:bg-neutral-700 dark:hover:bg-neutral-900 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-border cursor-pointer outline-none"
    );
  });

  it("has correct text position", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("flex justify-center");
  });

  it("has correct style appearance on light and dark mode", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "active:bg-neutral-200 dark:active:bg-neutral-700 dark:hover:bg-neutral-900 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-border cursor-pointer outline-none"
    );
  });

  it("has correct text position", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("flex justify-center");
  });

  it("The button has a style position: relative; so the icon can be positioned correctly", () => {
    render(<FormButton {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("relative");
  });

  it("icon positioned correctly", () => {
    render(<FormButton {...defaultProps} />);

    const iconSpan = screen.getByTestId("icon-container");

    expect(iconSpan).toHaveClass("absolute left-3 top-1/2 -translate-y-1/2");
  });

  it("black icon can be see on dark mode", () => {
    render(<FormButton {...defaultProps} />);
    const iconSpan = screen.getByTestId("icon-container");

    expect(iconSpan).toHaveClass("dark:drop-shadow dark:drop-shadow-neutral-500");
  });
});
