import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import DownloadTrackModel from '../models/downloaderTrack';

export interface DownloaderState {
    isLoading: boolean;
    track: DownloadTrackModel;
}

interface DownloadedUrlAction {
    type: 'DOWNLOADED_URL';
    track: DownloadTrackModel;
}

interface DownloadingUrlAction {
    type: 'DOWNLOADING_URL';
    isLoading: boolean;
}

type KnownAction = DownloadingUrlAction | DownloadedUrlAction;


export const actionCreators = {
    downloadMusic: (url: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({
            type: 'DOWNLOADING_URL',
            isLoading: true
        });
        let fetchTask = fetch(`api/downloader/create?url=${url}`)
            .then(response => response.json() as Promise<string>)
            .then(data => {
                dispatch({
                    type: 'DOWNLOADED_URL',
                    track: new DownloadTrackModel(data)
                });
            });

        addTask(fetchTask);
    }
};

const unloadedState: DownloaderState = {
    isLoading: false,
    track: new DownloadTrackModel({})
};

export const reducer: Reducer<DownloaderState> = (state: DownloaderState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'DOWNLOADING_URL':
            return {
                isLoading: true,
                track: new DownloadTrackModel({})
            };
        case 'DOWNLOADED_URL':
            return {
                track: action.track,
                isLoading: false
            };
        default:
            break;
    }

    return state || unloadedState;
};
