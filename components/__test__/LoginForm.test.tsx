import { fireEvent, render, screen } from "@testing-library/react";

import LoginForm from "@/components/LoginForm";

describe("LoginForm", () => {
  it("default render", () => {
    render(<LoginForm />);
    const buttons = screen.getAllByTestId("form-button");
    expect(buttons.length).toBe(1);
    expect(buttons[0]).toHaveTextContent("Continue");
    expect(buttons[0]).toHaveTextContent("with");
    expect(buttons[0]).toHaveTextContent("Email And Password");

    const formTitle = screen.getByTestId("form-title");
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toHaveTextContent("Magic Link");
    expect(formTitle).not.toHaveTextContent("Email And Password");

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Password")).not.toBeInTheDocument();

    expect(screen.getByText("Send Link")).toBeInTheDocument();
  });

  it("toggles to Email and Password form when button clicked", () => {
    render(<LoginForm />);
    const toggleButton = screen.getByRole("button", { name: /Email And Password/i });
    fireEvent.click(toggleButton);

    const buttons = screen.getAllByTestId("form-button");
    expect(buttons.length).toBe(1);
    expect(buttons[0]).toHaveTextContent("Continue");
    expect(buttons[0]).toHaveTextContent("with");
    expect(buttons[0]).toHaveTextContent("Magic Link");

    const formTitle = screen.getByTestId("form-title");
    expect(formTitle).toHaveTextContent("Email And Password");
    expect(formTitle).not.toHaveTextContent("Magic Link");

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("toggles back to Magic Link form", () => {
    render(<LoginForm />);
    const emailPwdButton = screen.getByRole("button", { name: /Email And Password/i });
    fireEvent.click(emailPwdButton);

    const magicLinkButton = screen.getByRole("button", { name: /Magic Link/i });
    fireEvent.click(magicLinkButton);

    expect(screen.getByText("Magic Link")).toBeInTheDocument();
    expect(screen.getByText("Send Link")).toBeInTheDocument();
  });

  it("submit button render correctly", () => {
    render(<LoginForm />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toHaveTextContent("Send Link");

    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
