import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DownloaderState {
    isLoading: boolean;
    downloadUrl?: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface DownloadedUrlAction {
    type: 'DOWNLOADED_URL';
    downloadUrl: string;
}

interface DownloadingUrlAction {
    type: 'DOWNLOADING_URL';
    isLoading: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = DownloadingUrlAction | DownloadedUrlAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    downloadMusic: (url: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({
            type: 'DOWNLOADING_URL', isLoading: true
        });
        let fetchTask = fetch(`api/downloader/create?url=${url}`)
            .then(response => response.json() as Promise<string>)
            .then(data => {
                dispatch({ type: 'DOWNLOADED_URL', downloadUrl: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

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
