import { Avatar, Box, Button, Input, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type UserForm } from '../utils/types';

export type ProfilePictureProps = {
    form: UseFormReturn<UserForm>;
};

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ form }) => {
    const { register } = form;
    const hiddenInputRef = useRef<HTMLInputElement>();

    const [preview, setPreview] = useState<string>();

    const { ref: registerRef, ...rest } = register('image');

    const handleUploadedFile = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const file = (event.target as HTMLInputElement)?.files?.[0];

        if (!file) {
            return;
        }

        const urlImage = URL.createObjectURL(file);

        setPreview(urlImage);
    };

    const onUpload = () => {
        hiddenInputRef.current?.click();
    };

    const uploadButtonLabel = preview ? 'Change image' : 'Upload image';

    return (
        <Box width={'300px'}>
            <Typography variant='subtitle2'>Profile picture</Typography>

            <Input
                hidden
                type='file'
                {...rest}
                onChange={handleUploadedFile}
                ref={(e) => {
                    registerRef(e);
                    hiddenInputRef.current = e as HTMLInputElement;
                }}
            />

            <Avatar src={preview} sx={{ width: 80, height: 80 }} />

            <Button variant='text' onClick={onUpload}>
                {uploadButtonLabel}
            </Button>
        </Box>
    );
};

export default ProfilePicture;
