import addHours from "date-fns/addHours";
import getHours from "date-fns/getHours";
import startOfToday from "date-fns/startOfToday";

import { faker } from "@faker-js/faker";
import { build, oneOf, perBuild } from "@jackfranklin/test-data-bot";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  Availability,
  AvailabilityFormValues,
  AvailabilityOptions,
  AvailableTypes,
} from "../../types";
import { AvailabilityForm } from "./AvailabilityForm";

const availabilityBuilder = build<Availability>({
  fields: {
    id: perBuild(() => faker.database.mongodbObjectId()),
    name: perBuild(() => faker.internet.userName()),
    uid: perBuild(() => faker.database.mongodbObjectId()),
    available: oneOf("good", "notgood", "maybe"),
    comment: perBuild(() => faker.lorem.text()),
    date: startOfToday(),
    fromTime: perBuild(() => addHours(startOfToday(), 15)),
    untilTime: perBuild(() => addHours(startOfToday(), 16)),
  },
});

const availabilityForm = build<AvailabilityFormValues>({
  fields: {
    name: perBuild(() => faker.name.fullName()),
    available: oneOf("good", "notgood", "maybe"),
    comment: perBuild(() => faker.lorem.text()),
    time: perBuild(() => [
      addHours(startOfToday(), 14),
      addHours(startOfToday(), 16),
    ]),
  },
});

function formMocks() {
  global.ResizeObserver = jest.fn().mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  return {
    submitCallbackMock: jest.fn(),
  };
}

function getInputs() {
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const availabilityInput = screen.getByLabelText(/availability/i);
  const timeInput = screen.getByLabelText(/appointment time/i);
  const commentInput = screen.getByRole("textbox", { name: /your comment/i });
  const sendBtn = screen.getByRole("button", { name: /send/i });

  return { nameInput, availabilityInput, timeInput, commentInput, sendBtn };
}

function setup(selectedAvailability?: Availability) {
  // jest.setTimeout(10000);
  const mocks = formMocks();
  const user = userEvent.setup();

  const ui = render(
    <AvailabilityForm
      submitCallback={mocks.submitCallbackMock}
      selectedAvailability={selectedAvailability}
    />
  );

  const formValues = availabilityForm();
  const inputs = getInputs();

  const selectAvailability = async (value?: AvailableTypes) => {
    let selectedOption;
    if (value) {
      selectedOption = AvailabilityOptions.find((o) => o.value === value);
    } else {
      selectedOption = oneOf(...AvailabilityOptions).call();
    }

    await user.click(inputs.availabilityInput);
    await user.click(screen.getByText(selectedOption!.label));
  };

  const typeHours = async (fromDate: Date, untilDate: Date) => {
    const fromTime = getHours(fromDate) + "00";
    const untilTime = getHours(untilDate) + "00";
    await user.type(inputs.timeInput, fromTime + untilTime);
  };

  return {
    user,
    formValues,
    ...mocks,
    ...inputs,
    selectAvailability,
    typeHours,
    ...ui,
  };
}

test("create: doesn't call onSubmitCallback with missing required values", async () => {
  const {
    user,
    submitCallbackMock,
    nameInput,
    availabilityInput,
    timeInput,
    commentInput,
    sendBtn,
  } = setup();

  expect(nameInput).toHaveValue("");
  expect(availabilityInput).toHaveValue("");
  expect(timeInput).toHaveValue("");
  expect(commentInput).toHaveValue("");

  await user.click(sendBtn);

  expect(submitCallbackMock).not.toHaveBeenCalled();
});

test("create: calls onSubmitCallback with form values", async () => {
  const {
    user,
    formValues,
    submitCallbackMock,
    nameInput,
    selectAvailability,
    typeHours,
    commentInput,
    sendBtn,
  } = setup();

  await user.type(nameInput, formValues.name);
  await selectAvailability(formValues.available!);
  await user.type(commentInput, formValues.comment);
  await typeHours(formValues.time[0]!, formValues.time[1]!);

  await user.click(sendBtn);

  expect(submitCallbackMock).toHaveBeenCalledTimes(1);
  expect(submitCallbackMock).toHaveBeenCalledWith(formValues);
}, 10000);

test("edit: renders form with expected values of selected availability", async () => {
  const selectedAvailability = availabilityBuilder();
  const { nameInput, commentInput, availabilityInput, timeInput } =
    setup(selectedAvailability);

  const selectedOption = AvailabilityOptions.find(
    (o) => o.value === selectedAvailability.available
  );

  expect(nameInput).toHaveValue(selectedAvailability.name);
  expect(availabilityInput).toHaveValue(selectedOption?.label);
  expect(timeInput).toHaveValue(selectedAvailability.fromTime!.getHours() + "");
  expect(commentInput).toHaveValue(selectedAvailability.comment);
});

test("edit: calls onSubmit with expected values of selected availability", async () => {
  const selectedAvailability = availabilityBuilder();
  const { submitCallbackMock, user, sendBtn } = setup(selectedAvailability);

  await user.click(sendBtn);

  expect(submitCallbackMock).toHaveBeenCalledTimes(1);
  expect(submitCallbackMock).toHaveBeenCalledWith({
    name: selectedAvailability.name,
    available: selectedAvailability.available,
    time: [selectedAvailability.fromTime, selectedAvailability.untilTime],
    comment: selectedAvailability.comment,
  });
});

test("edit: calls onSubmitCallback with edited values", async () => {
  const selectedAvailability = availabilityBuilder();
  const {
    user,
    formValues,
    submitCallbackMock,
    nameInput,
    selectAvailability,
    typeHours,
    commentInput,
    sendBtn,
  } = setup(selectedAvailability);

  await user.clear(nameInput);
  await user.type(nameInput, formValues.name);

  await selectAvailability(formValues.available!);

  await user.clear(commentInput);
  await user.type(commentInput, formValues.comment);
  await typeHours(formValues.time[0]!, formValues.time[1]!);

  await user.click(sendBtn);

  expect(submitCallbackMock).toHaveBeenCalledTimes(1);
  expect(submitCallbackMock).toHaveBeenCalledWith(formValues);
}, 10000);
