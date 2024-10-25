import { CircularProgress } from '@mui/material';
import {
    GridActionsCellItem,
    GridDeleteIcon,
    type GridRowParams,
} from '@mui/x-data-grid';

import { useDeleteUserNewMutation } from '@/lib/redux/user/deleteUser';
import { type User } from '@/lib/redux/user/types';

export type DeleteUserActionProps = {
    params: GridRowParams<User>;
};
export const DeleteUserAction: React.FC<DeleteUserActionProps> = ({
    params,
}) => {
    const [deleteUserMutation, { isLoading: isDeletingUser }] =
        useDeleteUserNewMutation();

    return (
        <GridActionsCellItem
            key={params.id + 'delete'}
            icon={
                isDeletingUser ? (
                    <CircularProgress color='secondary' size={30} />
                ) : (
                    <GridDeleteIcon />
                )
            }
            label='Delete'
            onClick={() => {
                deleteUserMutation({ id: params.id.toString() });
            }}
        />
    );
};

export default DeleteUserAction;
