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
  const [showModal, setShowModal] = useState(false);

  const renderModalSelector = () => {
    const modal = numberProjects.length
      ? <ProjectSelectModal />
      : <ProjectCreateModal projectsNumbers={numberProjects.length || 0} />;

    return modal;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("@isAutenticate"));

    if (data) {
      const { user: localUser }: ILocalStorageUser = data;

      api.post("/projects", { username: localUser.username })
        .then(({ data }) => setNumberProjects(data))
        .then(() => setShowModal(true));
    }
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
      {showModal && renderModalSelector()}
    </>
  );
}

export default Home;
