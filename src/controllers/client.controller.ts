import { NextFunction, Request, Response } from "express";

import { Client } from "model/entities";
import { Validator } from "shared/utils/validator";
import { ClientDTO } from "model/DTOs";

export class ClientController {
  constructor(private readonly clientRepo: typeof Client, private readonly validator: typeof Validator) {}

  async handlRegister(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { errors, DTO: clientDTO } = await this.validator.validate<typeof ClientDTO>(ClientDTO, req.body);

      if (errors.length) return res.status(400).json({ message: "client info not valid", errors });

      const existingClient = await this.clientRepo.findClientBy("email", req.body.email);

      if (existingClient) return res.status(400).json({ message: "client with this email already exists" });

      const newClient = await this.clientRepo.registerNewClient(clientDTO as ClientDTO);

      return res.status(201).json({});
    } catch (error) {
      next(error);
    }
  }
}
