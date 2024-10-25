interface Tag {
    label: string;
    color: string;
}

interface RenderTagsProps {
    tags: Tag[];
}

export const RenderTags: React.FC<RenderTagsProps> = ({ tags }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {tags?.map((tag, index) => (
                <span
                    key={index}
                    style={{
                        backgroundColor: tag.color,
                        color: 'white',
                        padding: '0 8px', // Adjusted padding to match the image
                        marginRight: '4px',
                        borderRadius: '16px', // Fully rounded ends to match the image
                        fontSize: '0.6rem',
                        lineHeight: '22px', // Fixed line height for consistent height of tags
                        textTransform: 'uppercase', // Uppercase text to match the image
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '22px', // Fixed height to match the image
                        border: 'none', // No border as tags have background color
                    }}
                >
                    {tag.label}
                </span>
            ))}
        </div>
    );
};
