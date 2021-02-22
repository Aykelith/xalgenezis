//= Functions & Modules
// Own
import numberOfObjectsWithProperty from "../utils/numberOfObjectsWithProperty";
// xalgenezis
import GenezisGeneralError from "@aykelith/xalgenezis-generalerror";

/**
 * @name OnEmptyResponseStopAfterProperty
 * @type {String}
 * @value "stopAfter"
 */
const OnEmptyResponseStopAfterProperty = "stopAfter";

/**
 * @description If `onEmptyResponse` is available check if one function has the property `[OnEmptyResponseStopAfterProperty]=true`
 * @description Also checks that maximum one function has the above property
 *
 * @param {RequestFunction[]} array The array of functions to search for `[OnEmptyResponseStopAfterProperty]`
 *
 * @returns {Number} the number of times
 * @throws {GenezisGeneralError} if the property appears multiple time with `true` value
 */
export default (array: any) => {
  let stopAfter = false;

  if (array) {
    let numberOfFunctionsWithStopAfter = numberOfObjectsWithProperty(
      array,
      OnEmptyResponseStopAfterProperty,
      true
    );
    if (numberOfFunctionsWithStopAfter > 1) {
      throw new GenezisGeneralError("2223");
    } else if (numberOfFunctionsWithStopAfter) {
      stopAfter = true;
    }
  }

  return stopAfter;
};

