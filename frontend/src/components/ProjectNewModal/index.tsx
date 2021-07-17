import React, { useEffect, useState } from 'react';
import { Modal, Button, notification, Input, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

import api from '../../service';
import { ILocalStorageUser, IModalNewProject, IUser } from '../../interfaces';

const openNotification = () => {
  notification.warning({
    message: `Campo de descrição vazio`,
    description: `Preencha o campo da descrição com o nome do projeto, que deseja criar...`,
    placement: "topRight",
    duration: 5.0,
  });
};

const ProjectCreateModal: React.FC<IModalNewProject> = (props) => {

  const { visible, setVisible } = props;
  const history = useHistory();

  const [user, setUser] = useState({} as IUser);
  const [description, setDescription] = useState("");

  const handleClickCreate = () => {
    if (description.trim()) {
      if (user) {
        api.post("/project/create", { username: user.username, title: description, })
          .then(res => {
            const { message } = res.data;

            if (res.status === 200 && message === "project_created") {
              localStorage.setItem("@selected_project", res.data.projectId);
              history.push("/home");
              history.go(0);
            }
          })
      }
    } else {
      openNotification()
    }
  };

  const title = (<h3 style={{ color: "gray", margin: 0 }} >Crie um novo projeto</h3>);

  const footerButton = [
    <Button key={1} type="primary" onClick={() => handleClickCreate()} >
      Criar
    </Button>
  ];

  useEffect(() => {
    const { user: localUser }: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

    setUser(localUser);

  }, []);

  return (
    <>
      {
        <Modal visible={visible} title={title} onCancel={() => setVisible(false)} footer={footerButton} centered >
          <Row style={{ width: "100%", padding: "20px 0 0 0" }} >

            <Col span={24} style={{ marginTop: "10px", }} >
              <Input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite o título do projeto..."
                onPressEnter={() => handleClickCreate()}
              />
            </Col>

          </Row>
        </Modal>
      }
    </>
  );
}

export default ProjectCreateModal;