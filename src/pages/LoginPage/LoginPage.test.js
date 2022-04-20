import { fireEvent, render, act, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";

// import App from "../../App";
// import Login from "./LoginPage";

import App from "../../App";
import AuthContext from "../../contexts/AuthContext";
import Autntext from "../../contexts/AuthContext";
import Login from "./LoginPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// jest.mock("axios", () => ({
//   get: jest.fn((_url) => {
//     return new Promise((resolve) => {
//       url = _url;
//       resolve(true);
//     });
//   }),
// }));

// beforeAll(() => {
//   jest.clearAllMocks();
// });

/**
 * Componentes existem
 * (OK) Testar inputs values
 * (OK) Testar submit
 * (OK) Testar erros Submit
 * Testar mousedown no inputAdornment
 */

describe("LoginPage", () => {
  const EMPTY_STRING = ""

  const MOCK_USER = {
    id: 0,
    name: "usuario",
    email: "usuario@gmail.com",
    password: "usuario",
  }
 
  const MOCK_FETCH = {
    data: [
      MOCK_USER
    ]
  }

  const MOCK_EMAIL = "usuario@gmail.com"

  test("renders learn react link", () => {
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario",
        },
      ],
    };

    render(<Login />);
    const linkElement = screen.getByText(/Bem vindo de volta/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders learn react link", () => {
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario", 
        },
      ],
    };
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["", () => null]);

    render(<Login />);
  });

  test("renders learn react link", () => {
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario",
        },
      ],
    };
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [true, () => null])
      .mockImplementationOnce(() => ["", () => null])
      .mockImplementationOnce(() => ["", () => null]);
    render(<Login />);
  });

  test("renders learn react link", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => ["usuario@gmail.com", () => null])
      .mockImplementationOnce(() => ["usuario", () => null])
      .mockImplementation((x) => [x, () => null]);
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario",
        },
      ],
    };
    const authContextMock = {
      setAuthenticatedUser: jest.fn(),
    };
    jest.spyOn(axios, "get").mockResolvedValue(fetchMock);

    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={authContextMock}>
        <Login />
      </AuthContext.Provider>
    );
    const handleLogin = jest.fn();

    const loginInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/");
  });

  test("renders learn react link", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => ["usuario123@gmail.com", () => null])
      .mockImplementationOnce(() => ["usuario", () => null])
      .mockImplementation((x) => [x, () => null]);
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario",
        },
      ],
    };
    const authContextMock = {
      setAuthenticatedUser: jest.fn(),
    };
    jest.spyOn(axios, "get").mockResolvedValue(fetchMock);

    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={authContextMock}>
        <Login />
      </AuthContext.Provider>
    );
    const handleLogin = jest.fn();

    const loginInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/");
  });

  test("renders learn react link", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => ["usuario123@gmail.com", () => null])
      .mockImplementationOnce(() => ["usuario", () => null])
      .mockImplementation((x) => [x, () => null]);
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario",
        },
      ],
    };
    const authContextMock = {
      setAuthenticatedUser: jest.fn(),
    };
    jest.spyOn(axios, "get").mockResolvedValue(fetchMock);

    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={authContextMock}>
        <Login />
      </AuthContext.Provider>
    );
    const handleLogin = jest.fn();

    const loginInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/");
  });


  test("renders learn react link", () => {
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, () => null])
      .mockImplementationOnce(() => ["usuario123@gmail.com", () => null])
      .mockImplementationOnce(() => ["usuario", () => null])
      .mockImplementation((x) => [x, () => null]);
    const fetchMock = {
      data: [
        {
          id: 0,
          name: "usuario",
          email: "usuario@gmail.com",
          password: "usuario",
        },
      ],
    };
    const authContextMock = {
      setAuthenticatedUser: jest.fn(),
    };
    jest.spyOn(axios, "get").mockResolvedValue(fetchMock);

    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={authContextMock}>
        <Login />
      </AuthContext.Provider>
    );

    const loginInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const loginButton = getByTestId("login-button");
    fireEvent.click(loginButton);

    expect(window.location.pathname).toBe("/");
  });
});
