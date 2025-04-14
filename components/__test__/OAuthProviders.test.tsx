import { render, screen } from "@testing-library/react";

import OAuthProviders from "../OAuthProviders";

describe("OAuthProviders", () => {
  it("renders all five provider buttons", () => {
    render(<OAuthProviders />);

    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("Microsoft")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  it("renders all SVG icons", () => {
    render(<OAuthProviders />);

    // Check that all SVGs are rendered
    const svgs = document.querySelectorAll("svg");
    expect(svgs.length).toBe(5);
  });
});
