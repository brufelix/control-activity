import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import ProjectSelectModal from "../../components/SelectProjectModal";
import DragAndDrop from "../../components/DragAndDrop";
import SubHeader from "../../components/SubHeader";
import { ILocalStorageUser } from "../../interfaces";

const Home: React.FC = () => {

  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    const isAuth: ILocalStorageUser = JSON.parse(localStorage.getItem("@isAutenticate"));

    if (!isAuth || !isAuth.valid)
      history.push("/not_authorized");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ProjectSelectModal
        visible={visible}
        onCancel={() => closeModal()}
        setVisible={(boolean: boolean) => setVisible(boolean)}
      />
      <SubHeader />
      <DragAndDrop />
    </>
  );
}

export default Home;
