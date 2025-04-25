import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'customers'})
export class CustomerTypeORMEntity {
    @PrimaryColumn({length: 36})
    id: string;

    @Column({length: 200, nullable: false})
    name: string;

    @Column({length: 200, nullable: false})
    email: string;

    @Column({length: 20, nullable: true})
    phone: string
}