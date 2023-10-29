import { Request, Response } from "express";

import { Client } from "model/entities";
import { Validator } from "shared/utils/validator";
import { ClientDTO } from "model/DTOs";

export class ClientController {
  constructor(private readonly clientRepo: typeof Client, private readonly validator: typeof Validator) {}

  async handlRegister(req: Request, res: Response): Promise<void> {
    try {
      const { errors, validData } = await this.validator.validate<typeof ClientDTO>(ClientDTO, req.body);
      const existingClient = await this.clientRepo.findClientBy("email", validData.email);
    } catch (error) {}
  }
}
