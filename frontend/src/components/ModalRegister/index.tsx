import React, { useState } from 'react';
import { Modal, Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IModalResgiter } from "../../interfaces";

const ModalRegister: React.FC<IModalResgiter> = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { visible, onCancel } = props;

  const onFinish = () => {
    if (password.trim() === confirmPassword.trim()) {
      const data = { username, password, confirmPassword, };
      console.log(data);
    };
  };

  return (
    <>
      {
        visible && (
          <Modal
            title="Cadastro"
            centered
            visible={visible}
            onCancel={() => onCancel()}
            footer={[
              <Form.Item
                key={1}
                style={{ margin: 0, }}
              >
                <Row
                  align="middle"
                  justify="end"
                  gutter={[8, 0]}
                >
                  <Col
                    span={6}
                  >
                    <Button
                      type="default"
                      style={{ width: "100%" }}
                      onClick={() => onCancel()}
                    >
                      Cancelar
                    </Button>
                  </Col>
                  <Col
                    span={6}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      onClick={() => onFinish()}
                      disabled={!(username.trim() && password.trim() && confirmPassword.trim())}
                    >
                      Concluir
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            ]}
          >
            <Row
              justify="center"
              align="middle"
              style={{ height: "100%", }}
            >
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Por favor, insira seu username!' }]}
                >
                  <Input
                    onChange={(e) => setUsername(e.target.value)}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Nome de Usuário"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Senha, no minimo 4 dígitos', min: 4, }]}
                >
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Senha"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={[{ required: true, message: 'Confirme sua senha', min: 4 }]}
                >
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirme a Senha"
                  />
                </Form.Item>
              </Form>
            </Row>
          </Modal>
        )
      }
    </>
  );
}

export default ModalRegister;
