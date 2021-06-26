import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import DragAndDrop from "../../components/DragAndDrop";
import SubHeader from "../../components/SubHeader";

const Home: React.FC = () => {

    const history = useHistory();

    useEffect(() => {
        const isAuth = JSON.parse(localStorage.getItem("@isAutenticate"));

        console.log(isAuth);
        if (!isAuth || !isAuth.valid)
            history.push("/not_authorized");
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <SubHeader />
            <DragAndDrop />
        </>
    );
}

export default Home;
