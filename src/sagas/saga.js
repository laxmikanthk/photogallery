import { takeLatest, put } from "redux-saga/effects";

import { Constants } from "../constants";

// function* updateName(actiion) {
//   yield put({ type: Constants.UPDATE_NAME_START, model: actiion.model });
// }

// function* updateNameWatcher() {
//   yield takeLatest(Constants.UPDATE_NAME, updateName);
// }

function* CreateAnnotation(source) {
  yield put({ type: Constants.CREATE_ANNOTATION_SUCESS, payload: source.model });  
}

function* UploadImage(source) {
  yield put({ type: Constants.UPLOAD_IMAGE_SUCESS, payload: source.model });  
  
}
export default function* rootSaga() {
  yield takeLatest(Constants.UPLOAD_IMAGE, UploadImage);   
  yield takeLatest(Constants.CREATE_ANNOTATION, CreateAnnotation);   
  // yield takeLatest(Constants.UPDATE_NAME, updateNameWatcher);   
  // yield takeLatest(Constants.UPDATE_NAME_START, updateName); 
}
