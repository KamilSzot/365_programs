function onYouTubeIframeAPIReady() {
    var tag = document.getElementById("youtube-audio");        
    var start = 60.4;
    var end = 66.9;
    var r = new YT.Player("youtube-audio", {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 0,
            controls: 0
        },
        events: {
            onReady: function(e) {
                r.loadVideoById({
                    videoId: tag.dataset.video,
                    startSeconds: start,
                    endSeconds: end,
                    suggestedQuality: "small"
                })
            },
            onStateChange: function(e) {
                if(e.data === YT.PlayerState.CUED) {
                    r.playVideo();
                }
                if(e.data === YT.PlayerState.ENDED) {
                    r.seekTo(start);
                }
            }
        }
    })
    var kitten = document.getElementById('kitten');
    window.onfocus = () => { r.playVideo(); kitten.style.display = 'block'; }
    window.onblur = () => { r.pauseVideo(); kitten.style.display = 'none'; }

    var oldVolume = 0;
    var speaker = document.getElementById('speaker');
    speaker.onclick = () => {
        var newVolume = oldVolume;
        oldVolume = r.getVolume();
        r.setVolume(newVolume);
        if(newVolume == 0) {
            speaker.style.filter = 'blur(5px)';
        } else {
            speaker.style.filter = '';
        }
    }
}