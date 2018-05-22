using Newtonsoft.Json;
using SoundCloudDownloader.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SoundCloudDownloader.Services
{
    public class SoundCloudService : ISoundCloudService
    {
        private HttpClient _client;

        public HttpClient Client
        {
            get
            {
                if (_client == null)
                {
                    _client = new HttpClient();
                    _client.DefaultRequestHeaders.TryAddWithoutValidation("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36");
                }
                return _client;
            }
        }

        public async Task<DownloadTrackModel> GetStreamUrlAsync(string url)
        {
            Uri soundCloudUrl = new Uri(url);
            url = $"https://m.soundcloud.com{soundCloudUrl.LocalPath}";
            string html = await Client.GetStringAsync(url);
            string streamJsonUrl = "https://" + $"api.soundcloud.com/i1/tracks/{GetTrackId(html)}/streams?client_id={GetClientId(html)}&format=json&app_version={GetAppVersion(html)}";
            SoundCloudModel jsonResult = JsonConvert.DeserializeObject<SoundCloudModel>(await Client.GetStringAsync(streamJsonUrl));

            return new DownloadTrackModel()
            {
                Title = GetTitle(html),
                PreviewUrl = jsonResult.PreviewUrl,
                DownloadUrl = jsonResult.HttpUrl,
                PlayerEmbed = GetPlayer(html),
                ImageUrl = GetCoverImageUrl(html)
            };
        }

        #region MeteData Methods

        private string GetTitle(string html)
        {
            return GetMetaContent(html, "description");
        }

        private string GetPlayer(string html)
        {
            return GetMetaContent(html, "twitter:player");
        }

        private string GetCoverImageUrl(string html)
        {
            return GetMetaContent(html, "twitter:image:src");
        }

        #endregion

        #region Helpers

        private string GetClientId(string html)
        {
            string clientId = html.Substring(html.IndexOf(@"{client_id:""")).Replace(@"{client_id:""", "");
            return clientId.Substring(0, clientId.IndexOf("\"")).Replace("\"", "");
        }

        private string GetTrackId(string html)
        {
            string trackId = html.Substring(html.IndexOf(@"content=""soundcloud://sounds:")).Replace(@"content=""soundcloud://sounds:", "");
            return trackId.Substring(0, trackId.IndexOf("\"")).Replace("\"", "");
        }

        private string GetAppVersion(string html)
        {
            string appVersion = html.Substring(html.IndexOf("A.start('")).Replace("A.start('", "");
            return appVersion.Substring(0, appVersion.IndexOf("'")).Replace("'", "");
        }

        private string GetMetaContent(string html, string propertyName)
        {
            string start_key = $@"<meta property=""{propertyName}"" content=""";
            string titleMeta = html.Substring(html.IndexOf(start_key)).Replace(start_key, "");
            return titleMeta.Substring(0, titleMeta.IndexOf(@"""")).Replace(@"""", "");
        }

        #endregion
    }
}
