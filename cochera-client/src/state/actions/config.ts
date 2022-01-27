import { Error } from ".";
import { ActionSettingsType } from "../action-types/config";

export interface Settings {
  rateprice: number;
}

export interface SettingsState {
  settings: Settings | null,
  loading: Boolean,
  error: Error | null,
}

interface RetrieveAction {
  type: ActionSettingsType.GET_SETTINGS,
  payload: Settings
}
interface SettingsError {
  type: ActionSettingsType.SETTINGS_ERROR,
  payload: Error
}
interface UpdateSettingsAction {
  type: ActionSettingsType.UPDATE_SETTINGS,
  payload: Settings
}
interface ClearSettings {
  type: ActionSettingsType.CLEAR_SETTINGS,
}

export type SettingsAction = RetrieveAction | SettingsError | UpdateSettingsAction | ClearSettings;