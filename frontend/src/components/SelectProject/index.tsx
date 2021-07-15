import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Select } from "antd";

import { ILocalStorageUser } from '../../interfaces';
import api from '../../service';

const SelectProject: React.FC = () => {

    const history = useHistory();
    const { Option } = Select;

    const [selectedProject, setSelectedProject] = useState("");
    const [projects, setProjects] = useState([]);

    const options = (
        projects.map((project, index) => <Option value={project._id} key={index}>{project.title}</Option>)
    );

    const handleClick = (projectId: string) => {
        localStorage.setItem("@selected_project", projectId);
        history.go(0);
    };

    const getCurrentProject = () => {
        const projectId = localStorage.getItem("@selected_project");

        const selectedProject: any = projects.filter(item => item._id === projectId);

        if (selectedProject[0]) {
            const project = selectedProject[0];

            const el = document.getElementsByClassName("ant-select-selection-item");
            const span = el.item(0);

            setSelectedProject(project.title);
            span.innerHTML = project.title;
        };

    };

    useEffect(() => {
        getCurrentProject();
        // eslint-disable-next-line
    }, [projects]);

    useEffect(() => {
        const { user: localUser }: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

        api.post("/projects", { username: localUser.username })
            .then(({ data }) => setProjects(data));
        // eslint-disable-next-line
    }, []);

    return (
        <Select
            style={{ width: "100%" }}
            onChange={handleClick}
            defaultValue={selectedProject}
            placeholder="Selecionador de Projetos"
        >
            {options}
        </Select>
    );
}

export default SelectProject;