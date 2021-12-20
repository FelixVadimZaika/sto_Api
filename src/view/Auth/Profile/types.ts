export enum ProfileActionTypes {
    GET_PROFILE = "GET_PROFILE"
}

export interface IProfileModel {
    name: string;
    email: string;
}

export interface ProfileState {
    profile: IProfileModel;
}

export interface FetchProfileAction {
    type: ProfileActionTypes.GET_PROFILE,
    payload: IProfileModel
}

export type ProfileActions = FetchProfileAction;