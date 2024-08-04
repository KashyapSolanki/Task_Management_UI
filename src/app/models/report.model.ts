export interface ReportRequest {
    startDate: string;
    endDate: string;
}

export interface TaskReport {
    teamLeaderId: number;
    teamLeaderName: string;
    totalTasks: number;
    completedTasks: number;
}