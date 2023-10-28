import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { db } from "config/database";
import { Roles } from "../types/common";
import { Photo } from "./photo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 25, nullable: false })
  lastName: string;

  @Column({
    generatedType: "STORED",
    asExpression: `'firstName' || ' ' || 'lastName'`,
  })
  fullName: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "enum", enum: Roles, default: Roles.USER })
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
}
