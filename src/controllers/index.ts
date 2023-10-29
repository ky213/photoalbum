import { Client } from "model/entities";
import { ClientController } from "./client.controller";
import { Validator } from "shared/utils/validator";

const clientController = new ClientController(Client, Validator);

export { clientController };
