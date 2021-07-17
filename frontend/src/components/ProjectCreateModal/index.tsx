import React, { useEffect, useState } from 'react';
import { Modal, Button, notification, Input, Row, Col } from "antd";
import { useHistory } from "react-router-dom";

import api from '../../service';
import { ILocalStorageUser, IModalCreateProject, IUser } from '../../interfaces';

const openNotification = () => {
  notification.warning({
    message: `Campo de descrição vazio`,
    description: `Preencha o campo da descrição com o nome do projeto, que deseja criar...`,
    placement: "topRight",
    duration: 5.0,
  });
};

const ProjectCreateModal: React.FC<IModalCreateProject> = (props) => {

  const history = useHistory();

  const { projectsNumbers } = props;

  const [user, setUser] = useState({} as IUser);
  const [selectedProject, setSelectedProject] = useState(false);
  const [description, setDescription] = useState("");

  const handleClickCreate = () => {
    if (description.trim()) {
      if (user) {
        api.post("/project/create", { username: user.username, title: description, })
          .then(res => {
            const { message } = res.data;

            if (res.status === 200 && message === "project_created") {
              localStorage.setItem("@selected_project", res.data.projectId);
              history.go(0);
            }
          })
      }
    } else {
      openNotification()
    }
  };

  const title = (<h3 style={{ color: "gray", margin: 0 }} >Crie um projeto</h3>);

  const footerButton = [
    <Button
      key={0}
      type="primary"
      onClick={() => { description.trim() && handleClickCreate() }}
    >
      Criar
    </Button>
  ];

  useEffect(() => {
    const selected = localStorage.getItem("@selected_project") || false;

    setSelectedProject(!!selected);
  }, []);

  useEffect(() => {
    const { user: localUser }: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

    setUser(localUser);

  }, []);

  return (
    <>
      {
        !(selectedProject) && (projectsNumbers === 0) && (
          <Modal visible={true} title={title} footer={footerButton} centered >
            <Row style={{ width: "100%", padding: "20px 0 0 0" }} >

              <Col span={24} style={{ marginTop: "10px", }} >
                <Input
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Digite o título do projeto..."
                  onPressEnter={() => description.trim() && handleClickCreate()}
                />
              </Col>

            </Row>
          </Modal>
        )
      }
    </>
  );
}

export default ProjectCreateModal;