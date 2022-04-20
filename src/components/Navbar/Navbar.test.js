import { fireEvent, render, screen } from "@testing-library/react";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "./Navbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const authContextMock = {
  authenticatedUser: { name: "Dev" },
};

test("renders navbar", () => {
  render(
    <AuthContext.Provider value={authContextMock}>
      <Navbar />
    </AuthContext.Provider>
  );
  const avatarElement = screen.getByTestId("avatar-group");

  expect(avatarElement).toBeInTheDocument();
});

test("renders navbar", () => {
  render(
    <AuthContext.Provider value={authContextMock}>
      <Navbar />
    </AuthContext.Provider>
  );

  const avatarElement = screen.getByTestId("avatar-group");
  const handleClick = jest.fn();

  fireEvent.click(avatarElement, {});
  expect(handleClick).toHaveBeenCalled();
});
