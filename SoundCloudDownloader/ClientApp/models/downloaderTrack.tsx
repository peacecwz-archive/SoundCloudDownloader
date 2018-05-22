export default class DownloadTrackModel {
    constructor(obj: any) {
        this.title = obj.title;
        this.playerEmbed = obj.playerEmbed;
        this.imageUrl = obj.imageUrl;
        this.previewUrl = obj.previewUrl;
        this.downloadUrl = obj.downloadUrl;
    }

    title: string;
    playerEmbed: string;
    imageUrl: string;
    previewUrl: string;
    downloadUrl: string;
}