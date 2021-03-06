import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Select } from "antd";

import { ILocalStorageUser, IProject } from '../../interfaces';
import api from '../../service';

const SelectProject: React.FC = () => {

  const { Option } = Select;

  const history = useHistory();

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState("");
  const [mount, setMount] = useState(false);

  const options = (
    projects.length && projects.map((project, index) => <Option value={project._id} key={index}>{project.title}</Option>)
  );

  const handleClick = (projectId: string) => {
    localStorage.setItem("@selected_project", projectId);
    history.go(0);
  };

  const updatedCurrentProject = (projects: IProject[] = []) => {
    const projectId = localStorage.getItem("@selected_project");

    const selectedProject = projects.filter && projects.filter(project => project._id === projectId);

    if (selectedProject && selectedProject.length)
      setCurrentProject(selectedProject[0].title);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("@isAutenticate"));
    if (data) {
      const { user: localUser }: ILocalStorageUser = data;

      api.post("/projects", { username: localUser.username })
        .then(({ data: projects }) => {
          updatedCurrentProject(projects);

          setProjects(projects);
        })
        .then(() => setMount(true));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {mount && (
        <Select
          style={{ width: "100%" }}
          onChange={handleClick}
          defaultValue={currentProject}
          placeholder="Selecionador de Projetos"
        >
          {options}
        </Select>
      )
      }
    </>
  );
}

export default SelectProject;