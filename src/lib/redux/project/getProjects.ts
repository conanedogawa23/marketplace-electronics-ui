import { gql } from 'graphql-request';

import {
    type GetProjectItemListResponse,
    type GetProjectListResponse,
    type ProjectDetailsProps,
    type ProjectItemList,
    type ProjectList,
} from '@/lib/redux/project/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const getProjectsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getProjectList: builder.query<
            ProjectList,
            {
                page?: number;
                filters?: {
                    name?: string;
                };
            }
        >({
            providesTags: [GRAPHQL_TAGS.Projects],
            query: ({ page, filters } = {}) => ({
                document: gql`
                    query ProjectList(
                        $filters: ProjectInput
                        $first: Int
                        $after: Int
                    ) {
                        projectList(
                            filters: $filters
                            first: $first
                            after: $after
                        ) {
                            projects {
                                name
                                owner {
                                    firstName
                                    lastName
                                }
                                budget
                                state
                                uuid
                                stage
                                client {
                                    name
                                }
                            }
                            hasMore
                        }
                    }
                `,
                variables: {
                    first: 50,
                    after: page ? page * 50 : 0,
                    filters: filters ? filters : {},
                },
            }),
            transformResponse: (response: GetProjectListResponse) =>
                response.projectList,
        }),
        getProjectItemList: builder.query<
            ProjectItemList,
            {
                projectId?: string;
                page?: number;
                filters?: {
                    name?: string;
                };
            }
        >({
            providesTags: [GRAPHQL_TAGS.Projects],
            query: ({ page, projectId, filters } = {}) => ({
                document: gql`
                    query ProjectItemsList(
                        $projectId: String!
                        $filters: ProjectItemFilters
                        $first: Int
                        $after: Int
                    ) {
                        projectItemsList(
                            projectId: $projectId
                            filters: $filters
                            first: $first
                            after: $after
                        ) {
                            hasMore
                            projectItems {
                                name
                                description
                                status
                                uuid
                                quantity
                            }
                        }
                    }
                `,
                variables: {
                    first: 50,
                    after: page ? page * 50 : 0,
                    projectId: projectId ? projectId : null,
                    filters: filters ? filters : {},
                },
            }),
            transformResponse: (response: GetProjectItemListResponse) =>
                response.projectItemsList,
        }),
        getProjectDetailsUsingUuid: builder.query<
            ProjectDetailsProps,
            {
                uuid: string;
            }
        >({
            providesTags: [GRAPHQL_TAGS.Projects],
            query: ({ uuid }) => ({
                document: gql`
                    query Query($uuid: String!) {
                        project(uuid: $uuid) {
                            name
                            owner {
                                firstName
                                lastName
                            }
                            budget
                            stage
                            address
                            uuid
                        }
                    }
                `,
                variables: { uuid },
            }),
            transformResponse: (response: any) => response.project,
        }),

        getProjectAutcompleteOptions: builder.query<
            any,
            {
                filters?: {
                    name?: string;
                };
            }
        >({
            providesTags: [GRAPHQL_TAGS.Projects],
            query: ({ filters } = {}) => ({
                document: gql`
                    query ProjectList($filters: ProjectInput) {
                        projectList(filters: $filters) {
                            projects {
                                name
                            }
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            transformResponse: (response: any) => response.projectList.projects,
        }),
        getProjectItemAutcompleteOptions: builder.query<
            any,
            {
                projectId?: string;
                filters?: {
                    name?: string;
                };
            }
        >({
            providesTags: [GRAPHQL_TAGS.Projects],
            query: ({ filters, projectId } = {}) => ({
                document: gql`
                    query ProjectItemsList(
                        $projectId: String!
                        $filters: ProjectItemFilters
                    ) {
                        projectItemsList(
                            projectId: $projectId
                            filters: $filters
                        ) {
                            projectItems {
                                name
                            }
                        }
                    }
                `,
                variables: {
                    filters: filters ? filters : {},
                    projectId: projectId ? projectId : null,
                },
            }),
            transformResponse: (response: any) =>
                response.projectItemsList.projectItems,
        }),
    }),
});

export const {
    useGetProjectListQuery,
    useGetProjectItemListQuery,
    useGetProjectDetailsUsingUuidQuery,
    useGetProjectAutcompleteOptionsQuery,
    useGetProjectItemAutcompleteOptionsQuery,
} = getProjectsAPI;
