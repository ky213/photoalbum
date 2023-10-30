import { IPhotoRepo } from "model/entities";
import { Validator } from "shared/utils/validator";

export class ClientController {
  constructor(private readonly clientRepo: IPhotoRepo, private readonly validator: typeof Validator) {}
}
