import React from 'react';
import {Spinner} from "@nextui-org/react";
const SpinLoading: React.FC = () => {
    return (
        <div className={'loader'}>
            <Spinner size="lg" />
        </div>
    );
};

export default SpinLoading;