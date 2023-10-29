import { IPhotoRepo } from "model/entities";
import { IValidator } from "shared/utils/validator";

export class ClientController {
  constructor(private readonly clientRepo: IPhotoRepo, private readonly validator: IValidator) {}
}
