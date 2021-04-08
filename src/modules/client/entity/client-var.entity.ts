import { argonSalt } from "./../../../config/env.config";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { randomBytes } from "crypto";
import * as argon2 from "argon2";

@Entity()
export class ClientVar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = randomBytes(argonSalt);
    this.password = await argon2.hash(this.password, { salt });
  }
}
