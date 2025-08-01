import "@testing-library/jest-dom";
import "whatwg-fetch";
import { render, screen } from "@testing-library/react";
import Card from "../component/Card";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { SessionProvider } from "next-auth/react";
const job = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Corp",
  location: "Remote",
  description: "Job description",
  categories: ["Engineering", "Full-time"],
  opType: "Remote",
  logoUrl: "https://example.com/logo.png",
  isBookmarked: false,
};

describe("Card", () => {
  it("renders job title, company, and location", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <Card {...job} />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/)).toBeInTheDocument();
    expect(screen.getByText(/Remote/)).toBeInTheDocument();
  });

  it("shows default values when job data is missing", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <Card id="empty-job" mark={false} />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Social Media Assistant")).toBeInTheDocument();
    expect(
      screen.getByText(/Young Men Chiristian Association/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Addis Ababa, Ethiopia/)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /company image/i })).toHaveAttribute(
      "src",
      expect.stringContaining("pexels")
    );
  });
});
