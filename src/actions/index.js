import { Constants } from "../constants";

const CREATEANNOTAIONAction = model => ({
  type: Constants.CREATE_ANNOTATION,
  model: model
});

const UPLOADIMAGEAction = model => (
  {
  type: Constants.UPLOAD_IMAGE_SUCESS,
  model: model
});

const SAVE_SELECTED_IMG_ID_Action = model => (
  {
  type: Constants.SAVE_SELECTED_IMG_ID,
  model: model
});


export {CREATEANNOTAIONAction, UPLOADIMAGEAction, SAVE_SELECTED_IMG_ID_Action };
