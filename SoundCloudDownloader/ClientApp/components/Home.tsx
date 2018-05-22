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
    public componentWillMount() {
        this.startToDownload();
    }

    private startToDownload() {
        this.props.downloadMusic("https://soundcloud.com/indre-dromantaite/sex-on-fire-vijay-sofia-zlatko-edit");
    }

    public render() {
        return <div>
            {this.props.isLoading ? <p>Loading...</p> : <p>{this.props.downloadUrl}</p>}
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.downloader, // Selects which state properties are merged into the component's props
    DownloaderStore.actionCreators                 // Selects which action creators are merged into the component's props
)(DownloaderPage) as typeof DownloaderPage;
