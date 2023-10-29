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

  @Column({ nullable: false })
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
  @Column({ type: "varchar" })
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  static async findClientBy(key: string, value: string) {
    return this.createQueryBuilder("client")
      .where(`client.${key} = :${key}`, { [key]: value })
      .getOne();
  }

  static async registerNewClient(clientData: ClientDTO) {
    const newClient = Object.assign(new Client(), clientData);

    //set full name
    newClient.fullName = newClient.firstName + " " + newClient.lastName;

    return await newClient.save();
  }
}
