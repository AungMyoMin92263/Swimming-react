import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import axios from "axios";

export interface S3FileUploadAction {
  type: ActionTypes.uploadFileS3;
  payload: any;
}

export const fileUploadToS3 = (file: any, path: string) => {
  // return {
  //     type: ActionTypes.selectedMenu,
  //     payload: menu
  // };
  return async (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.loading, payload: true })
    let fileextinson = file.name.split(".").pop().toLowerCase();
    let validFormats = ['jpg', 'png', 'jpeg', 'gif'];
    let res: any = { image: "" }
    if (validFormats.indexOf(fileextinson) == -1) {
      dispatch({ type: ActionTypes.loading, payload: true })
      return false;
    } else {
      let imgNameRes: any
      let signUrl: any = await apiServer.get('s3-image/signurl?path=' + path + '&image_type=' + fileextinson)

      try {
        let header = { headers: { "Content-Type": "image/jpeg" } }
        imgNameRes = await axios.put(signUrl.data.url, file, header)
        res.image = signUrl.data.key;
        dispatch<S3FileUploadAction>({
          type: ActionTypes.uploadFileS3,
          payload: res.image,
        });
        dispatch({ type: ActionTypes.loading, payload: false })
      } catch (e) {
        console.log(e)
        dispatch({ type: ActionTypes.loading, payload: false })
      }

    }
  };
};