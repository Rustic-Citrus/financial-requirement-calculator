import { describe, it } from "jsr:@std/testing/bdd";
import { assertThrows } from "jsr:@std/assert";
import { Validator } from "../../src/service/validator.service.ts";

describe("Validator Service tests", () => {
  it("throws an error if the received value is a number less than 0", () => {
    // Assemble
    // Set three randomly chosen values for values less than 0.
    const testValues: number[] = [-13657, -78254, -35101];

    // Act & Assert
    // Check that each negative value causes an error to be thrown.
    testValues.forEach((value) => {
      assertThrows(() => {
        Validator.isPositiveNum(value);
      });
    });
  });
});
