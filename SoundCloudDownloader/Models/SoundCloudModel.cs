using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoundCloudDownloader.Models
{
    public class SoundCloudModel
    {
        [JsonProperty("http_mp3_128_url")]
        public string HttpUrl { get; set; }
        [JsonProperty("hls_mp3_128_url")]
        public string HlsUrl { get; set; }
        [JsonProperty("preview_mp3_128_url")]
        public string PreviewUrl { get; set; }
    }
}
