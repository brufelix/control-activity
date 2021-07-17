import React, { useState } from 'react';
import { Modal, Row, Col, Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import api from '../../service';
import { IModalResgiter, IResponseResgisterUser } from "../../interfaces";

const openNotification = (msg: string, des: string, typeNotification: string) => {
  if (typeNotification === "success") {
    notification['success']({
      message: msg,
      description: des,
      placement: "topRight",
      duration: 5.0,
    })
  } else {
    notification['warning']({
      message: msg,
      description: des,
      placement: "topRight",
      duration: 5.0,
    })
  }
};

const ModalRegister: React.FC<IModalResgiter> = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { visible, onCancel } = props;

  const title = (<h3 style={{ color: "gray", margin: 0 }} >Cadastro</h3>);

  const onFinish = () => {
    if (password.trim() === confirmPassword.trim()) {
      const data = { username, password };
      api.post<IResponseResgisterUser>("/user/create", data)
        .then(res => {
          if (res.status === 200 && res.data.created) {
            openNotification("Cadastro realizado", "Usuário criando com sucesso.", "success");
            onCancel();
          } else if (res.data.message === "user_already_exists") {
            openNotification("Erro ao criar usuário :/", "Usuário já existe.", "warning");
          } else {
            openNotification("Erro :|", "Contate o suporte.", "warning");
          }
        })
    } else {
      openNotification("Verifique a senha -_-", "As senhas não são iguais", "warning");
    }
  };

  return (
    <>
      {
        visible && (
          <Modal
            title={title}
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
                    onPressEnter={() => {
                      username.trim() && password.trim()
                        && confirmPassword.trim() && onFinish()
                    }}
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
                    onPressEnter={() => {
                      username.trim() && password.trim()
                        && confirmPassword.trim() && onFinish()
                    }}
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
                    onPressEnter={() => {
                      username.trim() && password.trim()
                        && confirmPassword.trim() && onFinish()
                    }}
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
