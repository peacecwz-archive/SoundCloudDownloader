import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DownloaderStore from '../store/Downloader';

// At runtime, Redux will merge together...
type DownloaderProps =
    DownloaderStore.DownloaderState        // ... state we've requested from the Redux store
    & typeof DownloaderStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ }>; // ... plus incoming routing parameters

class DownloaderPage extends React.Component<DownloaderProps, {}> {

    public render() {
        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.downloader, // Selects which state properties are merged into the component's props
    DownloaderStore.actionCreators                 // Selects which action creators are merged into the component's props
)(DownloaderPage) as typeof DownloaderPage;
