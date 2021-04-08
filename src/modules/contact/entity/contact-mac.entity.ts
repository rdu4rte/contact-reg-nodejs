import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactMac {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  cellphone: string;
}
