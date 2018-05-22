using Newtonsoft.Json;
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

        public async Task<string> GetStreamUrlAsync(string url)
        {
            Uri soundCloudUrl = new Uri(url);
            url = $"https://m.soundcloud.com{soundCloudUrl.LocalPath}";
            string html = await Client.GetStringAsync(url);
            string streamJsonUrl = "https://" + $"api.soundcloud.com/i1/tracks/{GetTrackId(html)}/streams?client_id={GetClientId(html)}&format=json&app_version={GetAppVersion(html)}";
            Models.SoundCloudJSONResponse jsonResult = JsonConvert.DeserializeObject<Models.SoundCloudJSONResponse>(await Client.GetStringAsync(streamJsonUrl));

            return jsonResult?.HttpUrl;
        }

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

        #endregion
    }
}
