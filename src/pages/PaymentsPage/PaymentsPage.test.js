import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import PaymentsPage from "./PaymentsPage";

jest.mock("axios", () => ({
  get: jest.fn((_url) => {
    return new Promise((resolve) => {
      url = _url;
      resolve(true);
    });
  }),
}));

test("renders learn react link", () => {
  const fetchMock = {
    data: [
      {
        id: 1,
        name: "Client Name",
        username: "cname0",
        title: "Intern",
        value: 11.11,
        date: "2022-02-22T05:53:20Z",
        image: "",
        isPaid: true,
      },
    ],
  };

  jest.mock("moment", () => ({
    format: jest.fn((value) => {
      return value;
    }),
  }));

  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [fetchMock.data, () => null]);

  jest.spyOn(axios, "get").mockResolvedValue(fetchMock);

  render(<PaymentsPage />);
  const linkElement = screen.getByText(/Meus Pagamentos/i);
  expect(linkElement).toBeInTheDocument();
});
