import React from 'react';
import { Result, Button } from 'antd';

const NotAuthorized: React.FC = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Desculpe, você não está autorizado a acessar esta página."
            extra={<Button type="primary" href="/login">Voltar</Button>}
        />
    );
}

export default NotAuthorized;