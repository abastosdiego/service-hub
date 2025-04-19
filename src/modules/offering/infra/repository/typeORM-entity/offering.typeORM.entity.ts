import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "offerings" })
export class OfferingTypeORMEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ length: 36 })
  supplierId: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "decimal", nullable: true })
  price?: number;

  @Column({ type: "int", nullable: true })
  estimatedDuration?: number;
}