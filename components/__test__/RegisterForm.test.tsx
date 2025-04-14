import { render, screen } from "@testing-library/react";

import RegisterForm from "@/components/RegisterForm";

describe("RegisterForm", () => {
  it("default render", () => {
    render(<RegisterForm />);
    const formTitle = screen.getByTestId("form-title");
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toHaveTextContent("Register");

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Create Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();

    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();

    expect(screen.getByText("Register Now")).toBeInTheDocument();
  });

  it("submit button render correctly", () => {
    render(<RegisterForm />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toHaveTextContent("Register");

    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
