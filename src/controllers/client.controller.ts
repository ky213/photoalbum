import { NextFunction, Request, Response } from "express";

import { Client } from "model/entities";
import { Validator } from "shared/utils/validator";
import { ClientDTO } from "model/DTOs";
import { Files } from "shared/utils/files";

export class ClientController {
  constructor(private readonly clientRepo: typeof Client, private readonly validator: typeof Validator) {}

  async handlRegister(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let { errors, DTO: clientDTO } = await this.validator.validate<typeof ClientDTO>(ClientDTO, req.body);
      //TODO: add file validation
      if (errors.length) return res.status(400).json({ message: "client info not valid", errors });

      const existingClient = await this.clientRepo.findClientBy("email", req.body.email);

      if (existingClient) return res.status(400).json({ message: "client with this email already exists" });

      // upload photos
      clientDTO = await Files.uploadPhotos(clientDTO as ClientDTO);

      // register client
      const newClient = await this.clientRepo.registerNewClient(clientDTO as ClientDTO);

      return res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }
}
