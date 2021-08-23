//= Structures & Data
// Own
import GenericDoc from "./GenericDoc";
import GenericQuery from "./GenericQuery";
// Others
import { ObjectID as MongoID } from "mongodb";

type CheckFunction = (doc: GenericDoc) => boolean;

export default class QuerySolver {
  private collectionName: string;
  private checkers: CheckFunction[];

  constructor(query: GenericQuery, collectionName: string) {
    this.checkers = [];
    this.collectionName = collectionName;

    for (const queryField in query) {
      const fields: any = [];
      let isFunction = false;
      const queryValue = query[queryField];

      if (queryField.startsWith("$")) {
        isFunction = true;
      } else {
        fields.push(...queryField.split("."));
      }

      let valueCheckerFunction: Function;

      if (!isFunction) {
        if (
          typeof queryValue === "object" &&
          queryValue !== null &&
          !Array.isArray(queryValue)
        ) {
          if (queryValue.constructor.name === "ObjectID") {
            valueCheckerFunction = (value: any): boolean =>
              new MongoID(queryValue).equals(new MongoID(value));
          } else {
            const valueCheckerFunctions: Function[] = [];

            if (queryValue.$exists !== undefined) {
              valueCheckerFunctions.push((value: any) => {
                if (queryValue.$exists) {
                  return value !== undefined;
                } else {
                  return value === undefined;
                }
              });
            }

            valueCheckerFunction = (value: any): boolean => {
              for (
                let i = 0, length = valueCheckerFunctions.length;
                i < length;
                ++i
              ) {
                if (!valueCheckerFunctions[i](value)) return false;
              }

              return true;
            };
          }
        } else {
          valueCheckerFunction = (value: any): boolean => value === queryValue;
        }
      }

      this.checkers.push((doc: GenericDoc): boolean => {
        let fieldValue: any;
        let currentDoc: GenericDoc = doc;

        console.log(
          `db:col#${this.collectionName}:qs:query#'${JSON.stringify(
            query
          )}':fields#'${JSON.stringify(fields)}'`
        );

        for (let i = 0, length = fields.length; i < length; ++i) {
          if (i === fields.length - 1) {
            fieldValue = currentDoc[fields[i]];
          } else if (currentDoc[fields[i]] !== undefined) {
            if (
              currentDoc[fields[i]] === null ||
              typeof currentDoc[fields[i]] !== "object" ||
              Array.isArray(currentDoc[fields[i]])
            ) {
              return false;
            } else {
              currentDoc = currentDoc[fields[i]];
            }
          } else {
            return false;
          }
        }

        console.log(
          `db:col#${this.collectionName}:qs:query#'${JSON.stringify(
            query
          )}':fieldValue#'${JSON.stringify(fieldValue)}'`
        );

        return valueCheckerFunction(fieldValue);
      });
    }
  }

  isMatching(doc: GenericDoc): boolean {
    for (let i = 0, length = this.checkers.length; i < length; ++i) {
      if (!this.checkers[i](doc)) return false;
    }

    return true;
  }
}
