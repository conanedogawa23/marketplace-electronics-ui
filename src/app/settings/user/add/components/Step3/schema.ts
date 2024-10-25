export enum ProjectPermissions {
    owner = 'owner',
    teamMember = 'team-member',
    guestUser = 'guest-user',
    reporter = 'reporter',
    purchaser = 'purchaser',
    taskCreator = 'task-creator',
}

export const PROJECT_PERMISSIONS = [
    { id: ProjectPermissions.owner, name: 'Owner' },
    { id: ProjectPermissions.teamMember, name: 'Team Member' },
    { id: ProjectPermissions.guestUser, name: 'Guest User' },
    { id: ProjectPermissions.reporter, name: 'Reporter' },
    { id: ProjectPermissions.purchaser, name: 'Purchaser' },
    { id: ProjectPermissions.taskCreator, name: 'Task Creator' },
] as const;
