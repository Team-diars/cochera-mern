import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { Dispatch } from "react"
import { ActionType } from "../action-types"
import { ActionSettingsType } from "../action-types/config"
import { Action } from "../actions"
import { Settings, SettingsAction } from "../actions/config"

interface ConfigResponse {
  ok: boolean,
  settings: Settings
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getSettings = () => async(dispatch: Dispatch<SettingsAction | Action>) => {
  dispatch({
    type: ActionSettingsType.CLEAR_SETTINGS,
  })
  try {
    const res = await axios.get<ConfigResponse>("http://localhost:8000/api/settings/",config);
    dispatch({
      type: ActionSettingsType.GET_SETTINGS,
      payload: res.data.settings
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ActionSettingsType.SETTINGS_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateSettings = (formData: Settings) => async(dispatch: Dispatch<SettingsAction | Action>) => {
  try {
    const res = await axios.post<ConfigResponse>("http://localhost:8000/api/settings/",config);
    dispatch({
      type: ActionSettingsType.UPDATE_SETTINGS,
      payload: res.data.settings
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ActionSettingsType.SETTINGS_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}