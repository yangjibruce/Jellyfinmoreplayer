# Jellyfinmoreplayers
This can make Jellyfin support other players inculding potplayer, vlc, iina, nplayer, mxplayer, infuse player.
The bugs was fixed from https://greasyfork.org/zh-CN/scripts/452398-jellyfinlaunchpotplayer, thanks his working
Tested in Jellyfin Windows version 10.10.7

1. Download jellyfinmoreplayers.js
2. Put the file into this folder: C:\Program Files\Jellyfin\Server\jellyfin-web\
3. open C:\Program Files\Jellyfin\Server\jellyfin-web\index.html , and add the following text at the bottom of the document (but, it needs to insert before the last `<html/>`)：

`<script type="text/javascript" src="Jellyfinmoreplayers.js"></script> `
