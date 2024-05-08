import React from 'react';

type InformationPageProps = {
    params: {
        id: string
    }
}
const InformationPage = ({params}:InformationPageProps) => {
    return (
        <div>
            информация {params.id}
        </div>
    );
};

export default InformationPage;