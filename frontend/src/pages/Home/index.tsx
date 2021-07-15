import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import SubHeader from "../../components/SubHeader";
import DragAndDrop from "../../components/DragAndDrop";
import ProjectSelectModal from "../../components/SelectProjectModal";
import ProjectCreateModal from "../../components/ProjectCreateModal";
import { ILocalStorageUser } from "../../interfaces";
import api from "../../service";

const Home: React.FC = () => {

  const history = useHistory();

  const [numberProjects, setNumberProjects] = useState([]);

  const renderModalSelector = () => {
    const modal = numberProjects.length
      ? <ProjectSelectModal />
      : <ProjectCreateModal />;

    return modal;
  };

  useEffect(() => {
    const { user: localUser }: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));
    
    api.post("/projects", { username: localUser.username })
      .then(({ data }) => setNumberProjects(data))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const isAuth: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

    if (!isAuth || !isAuth.valid)
      history.push("/not_authorized");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SubHeader />
      <DragAndDrop />
      {renderModalSelector()}
    </>
  );
}

export default Home;
