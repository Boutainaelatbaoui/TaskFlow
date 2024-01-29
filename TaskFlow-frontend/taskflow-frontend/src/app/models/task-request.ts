export interface TaskRequest {
    title: string;
    description: string;
    priority: string;
    startDate: string;
    dueDate: string;
    createdByUserId: number;
    assignedToUserId: number;
    tagIds: number[];
}
