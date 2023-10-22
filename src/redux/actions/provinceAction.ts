import axios from "axios";
import { Dispatch } from "redux";
import * as type from "../type";

export const getAllProvince = () => async(dispatch: Dispatch) => {
    await axios.get(`https://vapi.vnappmob.com/api/province/`)
    .then(res => {
      dispatch({type: type.GET_PROVINCE, payload: res.data.results})
    })
    .catch(err => console.log('error', err))
  }

export const getDistrict = (provinceId: string) => async(dispatch: Dispatch) => {
  await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
    .then(res => {
      dispatch({type: type.GET_DISTRICT, payload: res.data.results})
    })
    .catch(err => console.log('error', err))
}

export const getWard = (districtId: string) => async(dispatch: Dispatch) => {
  await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
    .then(res => {
      dispatch({type: type.GET_WARD, payload: res.data.results})
    })
    .catch(err => console.log('error', err))
}