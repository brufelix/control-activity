import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import ModalRegister from '../../components/ModalRegister';
import "./index.css";

const NormalLoginForm = () => {

    const history = useHistory();
    const [show, setShow] = useState(false);

    const onFinish = (values: any) => {
        console.log(values);
        history.push("home");
    };

    return (
        <>
            <ModalRegister
                visible={show}
                onCancel={() => setShow(false)}
            />
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
                            placeholder="Nome de Usuário"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Senha"
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
                                    onClick={() => setShow(true)}
                                >
                                    Registra-se agora
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Row>
        </>
    );
};

export default NormalLoginForm;
