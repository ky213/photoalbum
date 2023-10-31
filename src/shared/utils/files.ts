import { promises as fs, existsSync } from "fs";

import { DIR } from "config/constants";
import { ClientDTO } from "model/DTOs";

export class Files {
  constructor() {}

  static async uploadPhotos(client: ClientDTO): Promise<ClientDTO> {
    const clientDir = DIR.PRIVATE + "/" + client.email;

    if (!existsSync(clientDir)) await fs.mkdir(clientDir);

    for (const photo of client.photos) {
      const filePath = "/" + photo.name + "." + photo.extension;

      await fs.writeFile(clientDir + filePath, photo.data, "base64");
      photo.url = "/photos/" + client.email + filePath;
      photo.data = "";
    }

    return client;
  }
}
