import React from 'react';
import { Result, Button } from 'antd';

const NotAuthorized: React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Desculpe, esta página não existe."
            extra={<Button type="primary" href="/">Voltar</Button>}
        />
    );
}

export default NotAuthorized;