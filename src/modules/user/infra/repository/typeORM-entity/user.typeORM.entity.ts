import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'users'})
export class UserTypeORMEntity {
    @PrimaryColumn({length: 36})
    id: string;

    @Column({length: 200, nullable: false})
    name: string;

    @Column({length: 200, nullable: false})
    email: string;

    @Column({length: 200, nullable: true})
    password: string;

    @Column({length: 20, nullable: true})
    phone: string
}