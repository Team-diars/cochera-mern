import { ActionSettingsType } from "../action-types/config";
import { SettingsAction, SettingsState } from "../actions/config";

const initialState: SettingsState = {
  settings: null,
  loading: true,
  error: null
}

const reducer = (state: SettingsState = initialState ,action: SettingsAction) => {
  switch(action.type){
    case ActionSettingsType.SETTINGS_ERROR:
    case ActionSettingsType.GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
      }
    case ActionSettingsType.CLEAR_SETTINGS:
      return {
        ...state,
        settings: null,
        loading: false,
      }
    case ActionSettingsType.SETTINGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading:false
      }
    default:
      return state;
  }
}
export default reducer;