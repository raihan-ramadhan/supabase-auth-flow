import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "@/components/Input";

describe("Input Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(<Input placeholder="Test input" />);
    const inputElement = screen.getByPlaceholderText("Test input");
    expect(inputElement).toBeInTheDocument();
  });

  it("applies class and custom className properly", () => {
    render(<Input className="test-class" data-testid="test-input" />);
    const inputElement = screen.getByTestId("test-input");
    expect(inputElement).toHaveClass("test-class");
    expect(inputElement).toHaveClass(
      "w-full rounded-2xl border border-border py-3 px-3 block outline-none focus-visible:ring-2 focus-visible:ring-border"
    );
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="ref-input" />);
    expect(ref.current).toBe(screen.getByTestId("ref-input"));
  });

  it("handles different input types", () => {
    render(<Input type="password" data-testid="password-input" />);
    expect(screen.getByTestId("password-input")).toHaveAttribute("type", "password");
  });

  it("handles user input correctly", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} data-testid="input-field" />);
    const inputElement = screen.getByTestId("input-field");

    await user.type(inputElement, "Hello");
    expect(handleChange).toHaveBeenCalled();
    expect(inputElement).toHaveValue("Hello");
  });

  it("passes other props through to the input element", () => {
    render(<Input data-testid="props-input" disabled placeholder="Test placeholder" id="test-id" name="test-name" />);
    const inputElement = screen.getByTestId("props-input");

    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveAttribute("placeholder", "Test placeholder");
    expect(inputElement).toHaveAttribute("id", "test-id");
    expect(inputElement).toHaveAttribute("name", "test-name");
  });
});
