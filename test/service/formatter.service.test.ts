import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { Formatter } from "../../src/service/formatter.service.ts";
import { GBP_REGEX } from "../../src/constants.ts";

describe("Formatter Service tests", () => {
  describe("buildPoundStr tests", () => {
    it("returns a string formatted to 2 decimal places with a British pound sterling symbol prefix", () => {
      // Assemble
      // Set three random positive numbers.
      const testValues: number[] = [19035, 32560.50227, 68082.68];

      // Initialise an empty array to store string outputs.
      const actualStrings: string[] = [];

      // Act
      // Iterate through test values and store string outputs in array.
      testValues.forEach((value) => {
        actualStrings.push(Formatter.buildPoundStr(value));
      });

      // Assert
      // Iterate through actual strings and check whether they have a pound symbol and are to two decimal places.
      actualStrings.forEach((output) => {
        console.log(output);
        expect(output).toMatch(GBP_REGEX);
      });
    });
  });
});
