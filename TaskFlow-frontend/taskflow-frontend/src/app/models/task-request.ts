export interface TaskRequest {
    title: string;
    description: string;
    priority: string;
    status: string;
    startDate: string;
    dueDate: string;
    createdByUserId: number;
    assignedToUserId: number;
    tagIds: number[];
}
