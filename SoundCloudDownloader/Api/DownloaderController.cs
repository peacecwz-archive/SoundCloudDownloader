using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SoundCloudDownloader.Services;

namespace SoundCloudDownloader.Api
{
    [Produces("application/json")]
    [Route("api/downloader")]
    public class DownloaderController : Controller
    {
        private readonly ISoundCloudService _soundCloudService;
        public DownloaderController(ISoundCloudService soundCloudService)
        {
            this._soundCloudService = soundCloudService;
        }

        [HttpGet("create")]
        public async Task<IActionResult> Create(string url)
        {
            return Ok(await _soundCloudService.GetStreamUrlAsync(url));
        }
    }
}