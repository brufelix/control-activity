import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Modal, Button, Select, Row, } from "antd";

import { ILocalStorageUser } from "../../interfaces";
import api from '../../service';
import "./index.css";

const SelectProject: React.FC = (props) => {

  const history = useHistory();

  const { Option } = Select;

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState(false);
  const [projects, setProjects] = useState([]);

  const options = (
    projects.map(project => <Option value={project._id}>{project.title}</Option>)
  );

  const title = <h3 style={{ color: "gray", margin: 0 }} >Selecione o Projeto</h3>;

  const handleClickConfirm = () => {
    localStorage.setItem("@selected_project", selectedProjectId);
    history.go(0);
  };

  const footerButton = [
    <Button key={1} type="primary" onClick={() => handleClickConfirm()} >
      Confirmar
    </Button>,
  ];

  const handleChangeProjectSelect = (value: string) => {
    setSelectedProjectId(value);
  };

  useEffect(() => {
    const selected = localStorage.getItem("@selected_project") || false;

    setSelectedProject(!!selected);
  }, []);

  useEffect(() => {
    const { user: localUser }: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

    api.post("/projects", { username: localUser.username })
      .then(({ data }) => setProjects(data))
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        !selectedProject && (
          <Modal visible={true} title={title} footer={footerButton} centered >
            <Row style={{ width: "100%" }} >
              <Select
                style={{ width: "100%", marginTop: "20px" }}
                onChange={handleChangeProjectSelect}
              >
                {options}
              </Select>
            </Row>
          </Modal>
        )
      }
    </>
  );
};

export default SelectProject;