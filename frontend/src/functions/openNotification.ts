import { notification } from "antd";

export const openNotification = (number: number) => {
  notification.warning({
    message: `Atividades atrasadas :(`,
    description: `Você possui ${number} atividade(s) atrasada(s)`,
    placement: "topLeft",
    duration: 4.5
  });
};
