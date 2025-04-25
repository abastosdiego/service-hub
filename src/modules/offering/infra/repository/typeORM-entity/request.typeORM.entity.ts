import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RequestPeriod, RequestStatus } from '../../../domain/entity/request.entity';

@Entity('requests') // Nome da tabela no banco de dados
export class RequestTypeORMEntity {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column({ type: 'uuid' })
    customerId: string;

    @Column({ type: 'uuid' })
    offeringId: string;

    @Column({ type: 'timestamp' })
    requestedDate: Date;

    @Column({ type: 'enum', enum: RequestPeriod }) // Define o enum para o campo period
    period: RequestPeriod;

    @Column({ type: 'enum', enum: RequestStatus }) // Define o enum para o campo status
    status: RequestStatus;

    @Column({ type: 'timestamp', nullable: true }) // Campo opcional
    approvedDate?: Date;

    @Column({ type: 'boolean', default: false }) // Define o valor padrão como false
    feedbackProvided: boolean;
}