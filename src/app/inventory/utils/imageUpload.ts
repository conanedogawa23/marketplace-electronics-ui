import { toast } from 'react-toastify';

type ImageId = string[] | string;

export const handleImageUpload = async (
    productImage: File | null,
): Promise<string | null | undefined> => {
    if (!productImage) {
        toast.error('No image selected');
        return null;
    }
    const uploadUrl =
        'http://aa8e454d952dc445481fff77ddb8401b-2027329443.us-east-2.elb.amazonaws.com/files/upload';

    const formData = new FormData();
    formData.append('files', productImage);
    formData.append('description', 'checking the file test 1');

    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result?.data?.uploadedAttachments) {
            return result.data.uploadedAttachments;
        } else {
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
    }
};
