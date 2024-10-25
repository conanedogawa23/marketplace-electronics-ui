export interface GetProjectListResponse {
    projectList: ProjectList;
}

export interface ProjectList {
    hasMore: boolean;
    projects: Project[];
}
export interface Project {
    client: {
        name: string;
    };
    name: string;
    owner: {
        firstName: string;
        lastName: string;
    };
    budget: string;
    uuid: string;
    stage: string;
}
export interface GetProjectItemListResponse {
    projectItemsList: ProjectItemList;
}

export interface ProjectItemList {
    hasMore: boolean;
    projectItems: ProjectItem[];
}

export interface ProjectItem {
    name: string;
    status: string;
    description: string;
    quantity: string;
    uuid: string;
}

export interface ProjectDetailsProps {
    name: string;
    owner: {
        firstName: string;
        lastName: string;
    };
    budget: string;
    stage: string;
    address: string;
    uuid: string;
}
