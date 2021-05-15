import React from 'react';

import DragAndDrop from "../../components/DragAndDrop";
import { IHome } from '../../interfaces';

const Home: React.FC<IHome> = (props) => {
  return (
    <DragAndDrop
      setCount={(number: number) => props.setCount(number)}
    />
  );
}

export default Home;
