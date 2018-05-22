using SoundCloudDownloader.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoundCloudDownloader.Services
{
    public interface ISoundCloudService
    {
        Task<DownloadTrackModel> GetStreamUrlAsync(string url);
    }
}
