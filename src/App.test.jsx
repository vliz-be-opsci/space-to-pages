import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import App from "./App";
import { Navigation } from "./components/navigation";
import TableFile from "./components/table";

vi.mock("axios");

describe("App smoke tests", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: "# Mock Readme" });
  });

  it("renders App within HashRouter without crashing", async () => {
    const { container } = render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    expect(container.querySelector("#menu")).toBeInTheDocument();
    expect(await screen.findByText("Mock Readme")).toBeInTheDocument();
  });

  it("renders Navigation with brand and expected links", () => {
    render(
      <Navigation
        data={{
          logo: "img/logo.png",
          markdown_about_us: "README.md",
          TData: [],
        }}
        crates={[{ name: "Test Crate" }]}
        profiles={[]}
        books={[{ title: "Book 1" }]}
        results={[{ title: "Result 1" }]}
      />
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Data explorer")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Publications")).toBeInTheDocument();
    expect(screen.getByText("results")).toBeInTheDocument();
    expect(screen.getByText("docs")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders TableFile with filtering, pagination, and CSV download button", () => {
    const columns = [
      { Header: "station.name", accessor: "station.name" },
      { Header: "value", accessor: "value" },
    ];
    const data = Array.from({ length: 12 }, (_, idx) => ({
      "station.name": `Station ${idx + 1}`,
      value: String(idx + 100),
    }));

    render(<TableFile data={data} columns={columns} filename="observations" />);

    expect(
      screen.getByRole("button", { name: "Download Current Rows" })
    ).toBeInTheDocument();
    expect(screen.getByText("Station 1")).toBeInTheDocument();
    expect(screen.queryByText("Station 12")).not.toBeInTheDocument();

    const filterInputs = screen.getAllByPlaceholderText(/Search 12 records/i);
    fireEvent.change(filterInputs[0], { target: { value: "Station 12" } });

    expect(screen.getByText("Station 12")).toBeInTheDocument();
    expect(screen.queryByText("Station 1")).not.toBeInTheDocument();
  });
});
