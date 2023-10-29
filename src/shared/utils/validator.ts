import { validate, ValidationError, ValidationSchema } from "class-validator";
import { plainToClass } from "class-transformer";
import { IAnyObject } from "model/types/common";

export interface ValidationResult {
  errors: ValidationError[];
  validData: IAnyObject;
}

export class Validator {
  constructor() {}

  static async validate<T>(schema: any, newData: IAnyObject): Promise<ValidationResult> {
    try {
      const errors = await validate(plainToClass(schema, newData));

      return { errors, validData: newData };
    } catch (error) {
      throw error;
    }
  }
}
