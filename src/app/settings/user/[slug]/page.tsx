const UserSettings: React.FC<{ params: { slug: string } }> = ({ params }) => {
    return <div>UserSettings : {params.slug}</div>;
};

export default UserSettings;
