import React from 'react';


type ProfilePageProps = {
    params: {
        id: string
    }
}
const ProfilePage = ({params} : ProfilePageProps) => {
    return (
        <div>
            портфолио {params.id}
        </div>
    );
};

export default ProfilePage;