import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactVar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 13, nullable: false })
  cellphone: string;
}
