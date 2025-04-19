import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'suppliers'})
export class SupplierTypeORMEntity {
    @PrimaryColumn({length: 36})
    id: string;
}