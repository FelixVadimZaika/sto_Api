export enum ProfileActionTypes {
    GET_PROFILE = "GET_PROFILE"
}

export interface IProfileModel {
    id: number;
    name: string;
    email: string;
    emailVerifiedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileState {
    profile: IProfileModel;
}

export interface FetchProfileAction {
    type: ProfileActionTypes.GET_PROFILE,
    payload: IProfileModel
}

export type ProfileActions = FetchProfileAction;