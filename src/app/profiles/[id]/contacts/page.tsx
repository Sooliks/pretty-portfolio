import React from 'react';

type InformationPageProps = {
    params: {
        id: string
    }
}
const InformationPage = ({params}:InformationPageProps) => {
    return (
        <div>
            контакты {params.id}
        </div>
    );
};

export default InformationPage;