using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoundCloudDownloader.Models
{
    public class DownloadTrackModel
    {
        public string Title { get; set; }
        public string ArtistName { get; set; }
        public string PlayerEmbed { get; set; }
        public string ImageUrl { get; set; }
        public string PreviewUrl { get; set; }
        public string DownloadUrl { get; set; }
    }
}
