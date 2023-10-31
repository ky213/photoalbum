import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { Client, User } from "model/entities";
import { Validator } from "shared/utils/validator";
import { ClientDTO } from "model/DTOs";
import { Files } from "shared/utils/files";
import HttpException from "shared/utils/http-exceptions";

export class ClientController {
  constructor(private readonly clientRepo: typeof Client, private readonly validator: typeof Validator) {}

  async handlRegister(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      let { errors, DTO: clientDTO } = await this.validator.validate<typeof ClientDTO>(ClientDTO, req.body);
      //TODO: add file validation
      if (errors.length) return next(new HttpException(400, { message: "client info not valid", errors }));

      const existingClient = await this.clientRepo.findClientBy("email", req.body.email);

      if (existingClient) return next(new HttpException(400, { message: "client with this email already exists" }));

      // upload photos
      clientDTO = await Files.uploadPhotos(clientDTO as ClientDTO);

      //hash the passwrod
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(clientDTO.password, salt);

      clientDTO.password = hashedPassword;

      // register client
      const newClient = await this.clientRepo.registerNewClient(clientDTO as ClientDTO);

      return res.status(201).json({ id: newClient.id });
    } catch (error) {
      next(error);
    }
  }

  async handleGetlient(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      //@ts-ignore //TODO: to be fixed
      const clientInfo = await this.clientRepo.loadClientInfo(req.user.id);

      return res.json(clientInfo);
    } catch (error) {
      next(error);
    }
  }
}
