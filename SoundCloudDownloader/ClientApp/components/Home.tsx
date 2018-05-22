import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as DownloaderStore from '../store/Downloader';

type DownloaderProps =
    DownloaderStore.DownloaderState       
    & typeof DownloaderStore.actionCreators   
    & RouteComponentProps<{ }>; 

class DownloaderPage extends React.Component<DownloaderProps, {}> {
    public componentWillMount() {
        this.startToDownload();
    }

    private startToDownload() {
        this.props.downloadMusic("https://soundcloud.com/peacecwz/skrillex-diplo-vs-florence-the-machine-where-are-u-now-vs-you-got-the-love-peacecwz-mashup");
    }

    public render() {
        return <div>
            {this.props.isLoading ? <p>Loading...</p> : <p>{this.props.downloadUrl}</p>}
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.downloader, 
    DownloaderStore.actionCreators                
)(DownloaderPage) as typeof DownloaderPage;
