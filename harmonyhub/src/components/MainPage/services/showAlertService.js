import { sMainController } from "../../../store"

export const showAlert = (message) => {
  if (sMainController.value.callAlertFunction) {
    sMainController.value.callAlertFunction(message, false);
  }
}

export const showErrorMessage = () => {
  if (sMainController.value.callAlertFunction) {
    sMainController.value.callAlertFunction("Something went wrong. Please try again later.", true);
  }
}