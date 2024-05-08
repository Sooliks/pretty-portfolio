import React from 'react';


type SettingsPageProps = {
    params: {
        id: string
    }
}
const SettingsPage = ({params}:SettingsPageProps) => {
    return (
        <div>
            настройки {params.id}
        </div>
    );
};

export default SettingsPage;