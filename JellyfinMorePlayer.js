//by ai
// ==UserScript==
// @name         JellyfinMorePlayer
// @name:en      JellyfinMorePlayer
// @name:zh      JellyfinMorePlayer
// @name:zh-CN   JellyfinMorePlayer
// @namespace    nickhoo.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jellyfin.org
// @version      1.0.1
// @description:en jellyfin calls an external player, mobile style optimization + Safari compatibility, based on [Jellyfin Launch Potplayer](https://greasyfork.org/en/scripts/452398-jellyfinlaunchpotplayer).
// @description  jellyfin调用外部播放器，手机端样式优化 + Safari兼容，基于 [Jellyfin Launch Potplayer](https://greasyfork.org/en/scripts/452398-jellyfinlaunchpotplayer)改造。
// @description:zh-cn jellyfin调用外部播放器，手机端样式优化 + Safari兼容，基于 [Jellyfin Launch Potplayer](https://greasyfork.org/en/scripts/452398-jellyfinlaunchpotplayer)改造。
// @license      MIT
// @author       nickhoo.com
// @match        *://*/*
// @downloadURL https://update.greasyfork.org/scripts/481318/JellyfinMorePlayer.user.js
// @updateURL https://update.greasyfork.org/scripts/481318/JellyfinMorePlayer.meta.js
// ==/UserScript==

(function () {
    'use strict';

    let observer;
    let root;

    function init() {
        observer?.disconnect();
        root?.unmount();

        // 选择需要观察变动的节点
        const targetNode = document.querySelector(".mainAnimatedPages");
        // 观察器的配置
        const config = { attributes: false, childList: true, subtree: true };
        // 变动回调函数
        const callback = (mutationsList, observer) => {
            if (document.querySelector("#castCollapsible")) {
                observer?.disconnect();
                try {
                    loadPlayer();
                } catch (error) {
                    observer.observe(targetNode, config);
                    console.log(error);
                }
            }
        };

        // 创建并启动观察器
        observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    window.addEventListener("viewshow", (event) => {
        init();
    });

    // 绑定按钮事件并阻止冒泡
    function bindPlayerButton(buttonId, callback) {
        const btn = document.querySelector(`div#itemDetailPage:not(.hide) #${buttonId}`);
        if (btn) {
            // 移除可能触发内置播放的类
            btn.classList.remove("btnPlay");
            // 确保标题正确
            //btn.title = buttonId.replace('emby', '');
            // 绑定点击事件并阻止传播
            btn.onclick = function(e) {
                e.stopPropagation(); // 阻止事件冒泡到父元素
                e.preventDefault();  // 阻止默认行为
                callback();          // 执行外部播放逻辑
            };
        }
    }

    function loadPlayer() {
        let potplayer = document.querySelectorAll("div#itemDetailPage:not(.hide) #embyPot")[0];
        if (!potplayer) {
            let mainDetailButtons = document.querySelectorAll("div#itemDetailPage:not(.hide) .detailPageContent")[0];
            if (mainDetailButtons) {
                // 按钮HTML（移除了btnPlay类）
                let buttonhtml = `<div style="display:flex;flex-wrap:wrap;justify-content: center;">
                  <a id="embyPot" type="button" class="button-flat detailButton emby-button" title="Potplayer"> <div class="detailButton-content"> <span class="material-icons detailButton-icon icon-PotPlayer">　</span> </div> </a>
                  <a id="embyVlc" type="button" class="button-flat detailButton emby-button" title="VLC"> <div class="detailButton-content"> <span class="material-icons detailButton-icon icon-VLC">　</span> </div> </a>
                  <a id="embyIINA" type="button" class="button-flat detailButton emby-button" title="IINA"> <div class="detailButton-content"> <span class="material-icons detailButton-icon icon-IINA">　</span> </div> </a>
                  <a id="embyNPlayer" type="button" class="button-flat detailButton emby-button" title="NPlayer"> <div class="detailButton-content"> <span class="material-icons detailButton-icon icon-NPlayer">　</span> </div> </a>
                  <a id="embyMX" type="button" class="button-flat detailButton emby-button" title="MXPlayer"> <div class="detailButton-content"> <span class="material-icons detailButton-icon icon-MXPlayer">　</span> </div> </a>
                  <a id="embyInfuse" type="button" class="button-flat detailButton emby-button" title="InfusePlayer"> <div class="detailButton-content"> <span class="material-icons detailButton-icon icon-infuse">　</span> </div> </a>
                  </div>`;

                mainDetailButtons.insertAdjacentHTML('afterbegin', buttonhtml);

                // 批量绑定按钮事件
                bindPlayerButton('embyPot', embyPot);
                bindPlayerButton('embyIINA', embyIINA);
                bindPlayerButton('embyNPlayer', embyNPlayer);
                bindPlayerButton('embyMX', embyMX);
                bindPlayerButton('embyVlc', embyVlc);
                bindPlayerButton('embyInfuse', embyInfuse);

                // 设置图标
                document.querySelector("div#itemDetailPage:not(.hide) .icon-PotPlayer").style.cssText += 'background: url(https://cdn.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.2/embyWebAddExternalUrl/icons/icon-PotPlayer.webp)no-repeat;background-size: 100% 100%';
                document.querySelector("div#itemDetailPage:not(.hide) .icon-VLC").style.cssText += 'background: url(https://cdn.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.2/embyWebAddExternalUrl/icons/icon-VLC.webp)no-repeat;background-size: 100% 100%';
                document.querySelector("div#itemDetailPage:not(.hide) .icon-IINA").style.cssText += 'background: url(https://cdn.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.2/embyWebAddExternalUrl/icons/icon-IINA.webp)no-repeat;background-size: 100% 100%';
                document.querySelector("div#itemDetailPage:not(.hide) .icon-NPlayer").style.cssText += 'background: url(https://cdn.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.2/embyWebAddExternalUrl/icons/icon-NPlayer.webp)no-repeat;background-size: 100% 100%';
                document.querySelector("div#itemDetailPage:not(.hide) .icon-MXPlayer").style.cssText += 'background: url(https://cdn.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.2/embyWebAddExternalUrl/icons/icon-MXPlayer.webp)no-repeat;background-size: 100% 100%';
                document.querySelector("div#itemDetailPage:not(.hide) .icon-infuse").style.cssText += 'background: url(https://cdn.jsdelivr.net/gh/bpking1/embyExternalUrl@0.0.2/embyWebAddExternalUrl/icons/icon-infuse.webp)no-repeat;background-size: 100% 100%';
            }
        }
    }

    async function getItemInfo() {
        let userId = ApiClient._serverInfo.UserId;
        let itemId = /\?id=(\w*)/.exec(window.location.hash)[1];
        let response = await ApiClient.getItem(userId, itemId);
        // 处理剧集
        if (response.Type == "Series") {
            let seriesNextUpItems = await ApiClient.getNextUpEpisodes({ SeriesId: itemId, UserId: userId });
            console.log("nextUpItemId: " + seriesNextUpItems.Items[0].Id);
            return await ApiClient.getItem(userId, seriesNextUpItems.Items[0].Id);
        }
        // 处理季
        if (response.Type == "Season") {
            let seasonItems = await ApiClient.getItems(userId, { parentId: itemId });
            console.log("seasonItemId: " + seasonItems.Items[0].Id);
            return await ApiClient.getItem(userId, seasonItems.Items[0].Id);
        }
        // 处理单集或电影
        console.log("itemId:  " + itemId);
        return response;
    }

    function getSeek(position) {
        let ticks = position * 10000;
        let parts = []
            , hours = ticks / 36e9;
        (hours = Math.floor(hours)) && parts.push(hours);
        let minutes = (ticks -= 36e9 * hours) / 6e8;
        ticks -= 6e8 * (minutes = Math.floor(minutes)),
            minutes < 10 && hours && (minutes = "0" + minutes),
            parts.push(minutes);
        let seconds = ticks / 1e7;
        return (seconds = Math.floor(seconds)) < 10 && (seconds = "0" + seconds),
            parts.join(":"),
            parts.join(":")
    }

    function getSubPath(mediaSource) {
        let selectSubtitles = document.querySelector("select[is='emby-select']:not(.hide).selectSubtitles");
        let subTitlePath = '';
        // 返回选中的外挂字幕
        if (selectSubtitles && selectSubtitles.value > 0) {
            let SubIndex = mediaSource.MediaStreams.findIndex(m => m.Index == selectSubtitles.value && m.IsExternal);
            if (SubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[SubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${selectSubtitles.value}/Stream.${subtitleCodec}`;
            }
        }
        else {
            // 默认尝试返回第一个外挂中文字幕
            let chiSubIndex = mediaSource.MediaStreams.findIndex(m => m.Language == "chi" && m.IsExternal);
            if (chiSubIndex > -1) {
                let subtitleCodec = mediaSource.MediaStreams[chiSubIndex].Codec;
                subTitlePath = `/${mediaSource.Id}/Subtitles/${chiSubIndex}/Stream.${subtitleCodec}`;
            } else {
                // 尝试返回第一个外挂字幕
                let externalSubIndex = mediaSource.MediaStreams.findIndex(m => m.IsExternal);
                if (externalSubIndex > -1) {
                    let subtitleCodec = mediaSource.MediaStreams[externalSubIndex].Codec;
                    subTitlePath = `/${mediaSource.Id}/Subtitles/${externalSubIndex}/Stream.${subtitleCodec}`;
                }
            }
        }
        return subTitlePath;
    }

    async function getEmbyMediaInfo() {
        let itemInfo = await getItemInfo();
        let mediaSourceId = itemInfo.MediaSources[0].Id;
        let selectSource = document.querySelector("select[is='emby-select']:not(.hide).selectSource");
        if (selectSource && selectSource.value.length > 0) {
            mediaSourceId = selectSource.value;
        }
        let mediaSource = itemInfo.MediaSources.find(m => m.Id == mediaSourceId);
        let domain = `${ApiClient._serverAddress}/emby/videos/${itemInfo.Id}`;
        let subPath = getSubPath(mediaSource);
        let subUrl = subPath.length > 0 ? `${domain}${subPath}?api_key=${ApiClient.accessToken()}` : '';
        let streamUrl = `${domain}/stream.${mediaSource.Container}?api_key=${ApiClient.accessToken()}&Static=true&MediaSourceId=${mediaSourceId}`;
        let position = parseInt(itemInfo.UserData.PlaybackPositionTicks / 10000);
        let intent = await getIntent(mediaSource, position);
        console.log(streamUrl, subUrl, intent);
        return {
            streamUrl: streamUrl,
            subUrl: subUrl,
            intent: intent,
        }
    }

    async function getIntent(mediaSource, position) {
        let title = mediaSource.Path.split('/').pop();
        let externalSubs = mediaSource.MediaStreams.filter(m => m.IsExternal == true);
        let subs = '';
        let subs_name = '';
        let subs_filename = '';
        let subs_enable = '';
        if (externalSubs) {
            subs_name = externalSubs.map(s => s.DisplayTitle);
            subs_filename = externalSubs.map(s => s.Path.split('/').pop());
        }
        return {
            title: title,
            position: position,
            subs: subs,
            subs_name: subs_name,
            subs_filename: subs_filename,
            subs_enable: subs_enable
        };
    }

    async function embyPot() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        let poturl = `potplayer://${encodeURI(mediaInfo.streamUrl)} /sub=${encodeURI(mediaInfo.subUrl)} /current /title="${intent.title}" /seek=${getSeek(intent.position)}`;
        console.log(poturl);
        location.href = poturl;
    }

    async function embyVlc() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        let vlcUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=org.videolan.vlc;type=video/*;S.subtitles_location=${encodeURI(mediaInfo.subUrl)};S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        if (getOS() == "windows") {
            vlcUrl = `vlc://${encodeURI(mediaInfo.streamUrl)}`;
        }
        if (getOS() == 'ios') {
            vlcUrl = `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(mediaInfo.streamUrl)}&sub=${encodeURIComponent(mediaInfo.subUrl)}`;
        }
        console.log(vlcUrl);
        location.href = vlcUrl;
    }

    async function embyIINA() {
        let mediaInfo = await getEmbyMediaInfo();
        let iinaUrl = `iina://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1`;
        console.log(`iinaUrl= ${iinaUrl}`);
        location.href = iinaUrl;
    }

    async function embyMX() {
        let mediaInfo = await getEmbyMediaInfo();
        let intent = mediaInfo.intent;
        let mxUrl = `intent:${encodeURI(mediaInfo.streamUrl)}#Intent;package=com.mxtech.videoplayer.ad;S.title=${encodeURI(intent.title)};i.position=${intent.position};end`;
        console.log(mxUrl);
        location.href = mxUrl;
    }

    async function embyNPlayer() {
        let mediaInfo = await getEmbyMediaInfo();
        let nUrl = getOS() == 'macOS' ? `nplayer-mac://weblink?url=${encodeURIComponent(mediaInfo.streamUrl)}&new_window=1` : `nplayer-${encodeURI(mediaInfo.streamUrl)}`;
        console.log(nUrl);
        location.href = nUrl;
    }

    async function embyInfuse() {
        let mediaInfo = await getEmbyMediaInfo();
        let infuseUrl = `infuse://x-callback-url/play?url=${encodeURIComponent(mediaInfo.streamUrl)}`;
        console.log(`infuseUrl= ${infuseUrl}`);
        location.href = infuseUrl;
    }

    function getOS() {
        let u = navigator.userAgent;
        if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
            return 'windows';
        } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
            return 'macOS';
        } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
            return 'ios';
        } else if (u.match(/android/i)) {
            return 'android';
        } else if (u.match(/Ubuntu/i)) {
            return 'Ubuntu';
        } else {
            return 'other';
        }
    }

})();
