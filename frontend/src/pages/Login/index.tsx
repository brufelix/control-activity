import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { IResponseAuth } from '../../interfaces';
import ModalRegister from '../../components/ModalRegister';
import api from '../../service';
import "./index.css";

const openNotification = () => {
  notification.warning({
    message: `Erro na autenticação`,
    description: `Usuário ou senha inválido`,
    placement: "topRight",
    duration: 3.0,
  });
};

const NormalLoginForm = () => {

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const onFinish = (values: { username: string, password: string }) => {
    const { username, password } = values;
    api.post<IResponseAuth>("/user/auth", { username, password })
      .then(res => {
        if (res.status === 200 && res.data && res.data.valid) {
          localStorage.setItem("@isAutenticate", JSON.stringify(res.data));
          history.push("/home");
          history.go(0);
        } else {
          openNotification();
        }
      });
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
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPass(e.target.value)}
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
                  disabled={!(username.trim() && pass.trim())}
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
