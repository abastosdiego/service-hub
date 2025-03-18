interface ServiceRequest {
    id: string;
    customerId: string;
    serviceId: string;
    requestedDate: Date;
    period: 'morning' | 'afternoon' | 'night';
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'feedbackProvided';
    approvedDate?: Date;
}