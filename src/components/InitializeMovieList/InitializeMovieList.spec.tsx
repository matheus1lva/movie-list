import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InitializeMovieListForm from "./InitializeMovieList";

describe("InitializeMovieListForm", () => {
  // mock onSubmit function
  const mockSubmit = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<InitializeMovieListForm onSubmit={mockSubmit} />);
  });

  it("should show an error when the list name is less than 5 characters", async () => {
    const submitButton = screen.getByRole("button", { name: /Confirm/i });
    const listNameInput = screen.getByLabelText(/List Name/i);

    fireEvent.change(listNameInput, { target: { value: "Abc" } });
    fireEvent.click(submitButton);

    const error = await screen.findByText(
      /name must be at least 5 characters/i
    );
    expect(error).toBeInTheDocument();
  });

  test("Should show an error while selecting only one genre option", async () => {
    const select = screen.getByTestId("genres-select");
    const button = within(select).getByRole("button");
    const submitButton = screen.getByRole("button", { name: /Confirm/i });

    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    const options = within(listbox).getAllByRole("option");
    fireEvent.mouseDown(options[0]);
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Must select 2 genres")).toBeInTheDocument();
    });
  });
});
