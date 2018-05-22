import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface DownloaderState {
    isLoading: boolean;
    downloadUrl?: string;
}

interface DownloadedUrlAction {
    type: 'DOWNLOADED_URL';
    downloadUrl: string;
}

interface DownloadingUrlAction {
    type: 'DOWNLOADING_URL';
    isLoading: boolean;
}


type KnownAction = DownloadingUrlAction | DownloadedUrlAction;


export const actionCreators = {
    downloadMusic: (url: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({
            type: 'DOWNLOADING_URL', isLoading: true
        });
        let fetchTask = fetch(`api/downloader/create?url=${url}`)
            .then(response => response.json() as Promise<string>)
            .then(data => {
                console.log(data);
                dispatch({ type: 'DOWNLOADED_URL', downloadUrl: data });
            });

        addTask(fetchTask);
    }
};

const unloadedState: DownloaderState = { downloadUrl: "", isLoading: false };

export const reducer: Reducer<DownloaderState> = (state: DownloaderState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'DOWNLOADING_URL':
            return {
                isLoading: true
            };
        case 'DOWNLOADED_URL':
            return {
                downloadUrl: action.downloadUrl,
                isLoading: false
            };
        default:
            break;
    }

    return state || unloadedState;
};
