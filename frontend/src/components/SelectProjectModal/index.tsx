import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal, Button, notification, Select, Input, Row, Col, Typography } from "antd";

import { ILocalStorageUser, IModalSelectProject, IUser } from "../../interfaces";
import api from '../../service';
import "./index.css";

const openNotification = () => {
  notification.warning({
    message: `Campo de descrição vazio`,
    description: `Preencha o campo da descrição com o nome do projeto, que deseja criar...`,
    placement: "topRight",
    duration: 5.0,
  });
};

const SelectProject: React.FC<IModalSelectProject> = (props) => {

  const history = useHistory();

  const { Option } = Select;
  const { visible, onCancel, setVisible } = props;

  const [user, setUser] = useState({} as IUser);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState("");

  const options = (
    projects.map(project => <Option value={project._id}>{project.title}</Option>)
  );

  const handleClickCreate = () => {
    if (description.trim()) {
      if (user) {
        api.post("/project/create", { username: user.username, title: description, })
          .then(res => {
            const { message } = res.data;

            if (res.status === 200 && message === "project_created") {
              localStorage.setItem("@selected_project", res.data.projectId);
              onCancel();
            }
          })
      }
    } else {
      openNotification()
    }
  };

  const handleClickConfirm = () => {
    localStorage.setItem("@selected_project", selectedProjectId);
    history.go(0);
  };

  const handleChangeProjectSelect = (value: string) => {
    setSelectedProjectId(value);
  };

  useEffect(() => {
    const selected = localStorage.getItem("@selected_project") || false;

    setSelectedProject(!!selected);
  }, []);

  useEffect(() => {
    const { user: localUser }: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

    setUser(localUser);

    api.post("/projects", { username: localUser.username })
      .then(({ data }) => setProjects(data))
      .then(() => setVisible(true));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        !selectedProject && visible && (
          <Modal
            visible={visible}
            title={<h3 style={{ color: "gray", margin: 0 }} >Selecione o Projeto</h3>}
            footer={[
              <Button
                key={1}
                type="primary"
                onClick={() => {
                  projects.length
                    ? handleClickConfirm()
                    : handleClickCreate();
                }}
              >
                {projects.length ? "Confirmar" : "Criar"}
              </Button>
            ]}
            centered
          >
            {
              projects.length
                ? (
                  <Row
                    style={{ width: "100%" }}
                  >
                    <Select
                      style={{ width: "100%", marginTop: "20px" }}
                      onChange={handleChangeProjectSelect}
                    >
                      {options}
                    </Select>
                  </Row>
                )
                : (
                  <Row
                    style={{ width: "100%", padding: "20px 0 0 0" }}
                  >
                    <Typography.Text code >
                      Você não possui vinculo com nenhum projeto, deseja criar ?
                    </Typography.Text>
                    <Col
                      span={24}
                      style={{ marginTop: "10px", }}
                    >
                      <Input
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Digite o título do projeto..."
                        onPressEnter={() => handleClickCreate()}
                      />
                    </Col>
                  </Row>
                )
            }
          </Modal>
        )
      }
    </>
  );
};

export default SelectProject;