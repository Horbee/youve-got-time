import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { AvailabilityForm } from "./AvailabilityForm"

function setup() {}

test("doesn't call onSubmitCallback with missing required values", async () => {
  const user = userEvent.setup();

  const submitCallbackMock = jest.fn();

  render(<AvailabilityForm submitCallback={submitCallbackMock} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const availabilityInput = screen.getByRole("searchbox", {
    name: /availability/i,
  });

  const timeInput = screen.getByLabelText(/appointment time/i);

  const commentInput = screen.getByRole("textbox", { name: /your comment/i });

  const sendBtn = screen.getByRole("button", { name: /send/i });

  expect(nameInput).toHaveValue("");
  expect(availabilityInput).toHaveValue("");
  expect(timeInput).toHaveValue("");
  expect(commentInput).toHaveValue("");

  await user.click(sendBtn);

  expect(submitCallbackMock).not.toHaveBeenCalled();
});
