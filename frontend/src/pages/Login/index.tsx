import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from "../../hooks/auth";
import "./index.css";

const NormalLoginForm = () => {

    const { isAuth,setIsAuth } = useAuth();

    const onFinish = (values: any) => {
        console.log(isAuth);
        setIsAuth(true);
        console.log(isAuth);
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{ height: "100%", }}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor, insira seu username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Row
                        align="middle"
                        justify="center"
                        gutter={[0, 8]}
                    >
                        <Col
                            span={24}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                            >
                                Entrar
                            </Button>
                        </Col>
                        <Col
                            span={24}
                        >
                            <Button
                                type="default"
                                style={{ width: "100%" }}
                            >
                                Registra-se agora
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default NormalLoginForm;
