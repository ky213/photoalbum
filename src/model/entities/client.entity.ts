import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { IRoles } from "../types/common";
import { Photo } from "./photo.entity";
import { ClientDTO } from "model/DTOs";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  lastName: string;

  @Column({ type: "varchar", nullable: false })
  fullName: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: "enum", enum: IRoles, default: IRoles.USER })
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}

@Entity()
export class Client extends User {
  @Column({ type: "varchar", default: "/default-avatar.png" })
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.client)
  photos: Photo[];

  static async findClientBy(key: string, value: string) {
    return this.createQueryBuilder("client")
      .where(`client.${key} = :${key}`, { [key]: value })
      .getOne();
  }

  static async findClientPassword(key: string, value: string) {
    return this.createQueryBuilder("client")
      .where(`client.${key} = :${key}`, { [key]: value })
      .addSelect("client.password")
      .getOne();
  }

  static async loadClientInfo(id: number | string) {
    return this.createQueryBuilder("client")
      .where(`client.id = ${id}`)
      .leftJoinAndSelect("client.photos", "photo")
      .getMany();
  }

  static async registerNewClient(clientData: ClientDTO) {
    const newClient: Client = new Client();

    newClient.firstName = clientData.firstName;
    newClient.lastName = clientData.lastName;
    newClient.fullName = clientData.firstName + " " + clientData.lastName;
    newClient.email = clientData.email;
    newClient.password = clientData.password;
    newClient.avatar = clientData.avatar;
    newClient.role = clientData.role;
    newClient.active = clientData.active;

    //set photos
    const newPhotos = [];

    for (const { name, url } of clientData.photos) {
      let newPhoto = new Photo();
      newPhoto.name = name;
      newPhoto.url = url;
      newPhoto = await newPhoto.save();

      newPhotos.push(newPhoto);
    }

    newClient.photos = newPhotos;

    return await newClient.save();
  }
}
