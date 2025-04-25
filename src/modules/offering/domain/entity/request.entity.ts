export class Request {
    id: string;
    customerId: string;
    serviceId: string;
    requestedDate: Date;
    period: RequestPeriod;
    status: RequestStatus;
    approvedDate?: Date;
    feedbackProvided: boolean;
}

export enum RequestPeriod {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    NIGHT = 'night',
}

export enum RequestStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    COMPLETED = 'completed',
}