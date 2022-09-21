import addHours from "date-fns/addHours"
import getHours from "date-fns/getHours"
import startOfToday from "date-fns/startOfToday"

import { faker } from "@faker-js/faker"
import { build, oneOf, perBuild } from "@jackfranklin/test-data-bot"

import { AvailabilityForm } from "../components/availability-form"
import { Availability, AvailabilityFormValues, AvailabilityOptions } from "../types"

const availabilityBuilder = build<Availability>({
  fields: {
    id: perBuild(() => faker.database.mongodbObjectId()),
    name: perBuild(() => faker.internet.userName()),
    uid: perBuild(() => faker.database.mongodbObjectId()),
    available: oneOf("good", "notgood", "maybe"),
    comment: perBuild(() => faker.lorem.text()),
    date: new Date(),
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

describe("AvailabilityForm.cy.ts", () => {
  it("create: calls onSubmitCallback with form values", () => {
    const formValues = availabilityForm();
    const selectedOption = AvailabilityOptions.find(
      (o) => o.value === formValues.available
    );
    const fromTime = getHours(formValues.time[0]!) + "00";
    const untilTime = getHours(formValues.time[1]!) + "00";

    const submitSpy = cy.spy().as("submitSpy");

    cy.mount(<AvailabilityForm submitCallback={submitSpy} />);

    cy.findByLabelText(/name/i).type(formValues.name);
    cy.findByLabelText(/availability/i).click();
    cy.findByText(selectedOption!.label).click();
    cy.findByLabelText(/appointment time/i).type(fromTime + untilTime);
    cy.findByLabelText(/your comment/i).type(formValues.comment);

    cy.findByRole("button", { name: /send/i }).click();

    cy.get("@submitSpy").should("have.been.calledOnceWith", formValues);
  });

  it("create: doesn't call onSubmitCallback with missing required values", () => {
    const submitSpy = cy.spy().as("submitSpy");

    cy.mount(<AvailabilityForm submitCallback={submitSpy} />);

    cy.findByRole("button", { name: /send/i }).click();

    cy.get("@submitSpy").should("not.have.been.calledOnce");
    cy.contains(/name is required/i).should("exist");
    cy.contains(/this field is required/i).should("exist");
  });

  it("edit: renders form with expected values of selected availability", () => {
    const selectedAvailability = availabilityBuilder();

    const submitSpy = cy.spy().as("submitSpy");

    cy.mount(
      <AvailabilityForm
        submitCallback={submitSpy}
        selectedAvailability={selectedAvailability}
      />
    );

    cy.findByRole("button", { name: /send/i }).click();

    cy.get("@submitSpy").should("have.been.calledOnceWith", {
      name: selectedAvailability.name,
      available: selectedAvailability.available,
      time: [selectedAvailability.fromTime, selectedAvailability.untilTime],
      comment: selectedAvailability.comment,
    });
  });
});
