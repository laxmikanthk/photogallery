import { Constants } from "../constants";
const initialState = {
  CurrentSelectedID:"0",
  TimeStamep: new Date().getTime().toString(),  
  imageData: [
    {
      id: 1,
      url:
        "https://source.unsplash.com/1600x900/?water",
      name: "",
      annotation:[]
    },
    {
      id: 2,
      url:
        "https://source.unsplash.com/1600x900/?nature",
      name: "",
      annotation:[]
    },
    {
      id: 3,
      url:
        "https://source.unsplash.com/WLUHO9A_xik/1600x900",
      name: "",
      annotation:[]
    },
    {
      id: 4,
      url:
        "https://source.unsplash.com/1600x900/daily/",
      name: "",
      annotation:[]
    },
    {
      id: 5,
      url:
          "https://source.unsplash.com/1600x900/weekly?water/",
      name: "",
      annotation:[]
    }
  ]
};

const UPLOAD_IMAGE_SUCESS = (state, action) => {    
  const { model } = action;
  return {
    ...state,
    imageData: [...state.imageData, model.fileinfo]
  };
 };
 const CREATE_ANNOTATION_SUCESS = (state, action) => {    
  // 
  const { payload } = action;
   const{imageData}= state;
   if(imageData && imageData.length > 0 && payload.fileinfo)
   {
    if(imageData != null && imageData.length > 0)
    {
      (imageData).forEach(e => {
        // 
        if(e.id != null && e.id ==  payload.fileinfo.id)
        {
         e = payload.fileinfo; 
          return;
        };
      });
    }
   }
   return {
       ...state,
       TimeStamep: new Date().getTime().toString(),      
   }
 };

 const SAVE_SELECTED_IMG_ID_Action_SUCESS = (state, action) => {    
   return {
       ...state,
       CurrentSelectedID : action.model      
   }
 };

 export function Reducer(state = initialState, action) {
  switch (action.type) {
    case Constants.UPDATE_NAME_START:
      return {
        ...state,
        loading: true
      };
    case Constants.UPLOAD_IMAGE_SUCESS:
        return UPLOAD_IMAGE_SUCESS(state, action);
    case Constants.CREATE_ANNOTATION_SUCESS:
        return  CREATE_ANNOTATION_SUCESS(state, action);
    case Constants.SAVE_SELECTED_IMG_ID :
        return  SAVE_SELECTED_IMG_ID_Action_SUCESS(state, action);
    default:
      return state;
  }
}