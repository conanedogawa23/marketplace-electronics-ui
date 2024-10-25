import Image from 'next/image';
import type React from 'react';

// icons
import CsvIcon from '../../../../public/assets/file-type-icons/csv-icon.png';
import DocIcon from '../../../../public/assets/file-type-icons/doc-icon.png';
import DefaultFileIcon from '../../../../public/assets/file-type-icons/file-default-icon.png';
import ImageIcon from '../../../../public/assets/file-type-icons/image-icon.png';
import JsonIcon from '../../../../public/assets/file-type-icons/json-icon.png';
import PdfIcon from '../../../../public/assets/file-type-icons/pdf-icon.png';
import PptIcon from '../../../../public/assets/file-type-icons/ppt-icon.png';
import TxtIcon from '../../../../public/assets/file-type-icons/txt-icon.png';
import WordIcon from '../../../../public/assets/file-type-icons/word-icon.png';
import XlsIcon from '../../../../public/assets/file-type-icons/xls-icon.png';
import ZipIcon from '../../../../public/assets/file-type-icons/zip-icon.png';

// Type definition for the function's return type
type FileIconProps = {
    file?: File;
    href?: string;
};

export const FileIcon: React.FC<FileIconProps> = ({ file, href }) => {
    const fileType = file?.type;
    const fileName = file?.name;
    const extension = href?.split('.').pop()?.toLowerCase();
    if (extension) {
        switch (extension) {
            case 'pdf':
                return <Image width={40} src={PdfIcon} alt={href as string} />;
            case 'doc':
            case 'docx':
                return <Image width={40} src={WordIcon} alt={href as string} />;
            case 'xls':
            case 'xlsx':
                return <Image width={40} src={XlsIcon} alt={href as string} />;
            case 'ppt':
            case 'pptx':
                return <Image width={40} src={PptIcon} alt={href as string} />;
            case 'csv':
                return <Image width={40} src={CsvIcon} alt={href as string} />;
            case 'json':
                return <Image width={40} src={JsonIcon} alt={href as string} />;
            case 'zip':
                return <Image width={40} src={ZipIcon} alt={href as string} />;
            case 'txt':
                return <Image width={40} src={TxtIcon} alt={href as string} />;
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'bmp':
                return (
                    <Image width={40} src={ImageIcon} alt={href as string} />
                );
            default:
                return (
                    <Image
                        width={40}
                        src={DefaultFileIcon}
                        alt={href as string}
                    />
                );
        }
    }

    if (file) {
        switch (fileType) {
            case 'application/pdf':
                return (
                    <Image width={40} src={PdfIcon} alt={fileName as string} />
                );
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return (
                    <Image width={40} src={WordIcon} alt={fileName as string} />
                );
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return (
                    <Image width={40} src={XlsIcon} alt={fileName as string} />
                );
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return (
                    <Image width={40} src={PptIcon} alt={fileName as string} />
                );
            case 'text/csv':
                return (
                    <Image width={40} src={CsvIcon} alt={fileName as string} />
                );
            case 'application/json':
                return (
                    <Image width={40} src={JsonIcon} alt={fileName as string} />
                );
            case 'application/zip':
                return (
                    <Image width={40} src={ZipIcon} alt={fileName as string} />
                );
            case 'application/msword':
                return (
                    <Image width={40} src={DocIcon} alt={fileName as string} />
                );
            case 'text/plain':
                return (
                    <Image width={40} src={TxtIcon} alt={fileName as string} />
                );
            default:
                return (
                    <Image
                        width={40}
                        src={DefaultFileIcon}
                        alt={fileName as string}
                    />
                );
        }
    }
};
