import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import { IAnyObject } from "model/types/common";

export interface IVlidationResult {
  DTO: IAnyObject;
  errors: ValidationError[];
}

export class Validator {
  constructor() {}
  /**
   * A validation method that can automatically handle all object types providing that a schema is defined.
   */
  static async validate<T>(schema: any, newData: IAnyObject): Promise<IVlidationResult> {
    try {
      const clientDTO: IAnyObject = plainToClass(schema, newData);
      const errors = await validate(clientDTO);

      return { errors, DTO: clientDTO };
    } catch (error) {
      throw error;
    }
  }
}
