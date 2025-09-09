# Jellyfinmoreplayer - New Version
This script enables Jellyfin to support external players such as PotPlayer, VLC, IINA, NPlayer, MXPlayer, and Infuse Player.
The implementation is based on and improved from the original script JellyfinMorePlayer https://greasyfork.org/zh-CN/scripts/481318-jellyfinmoreplayer . We extend our thanks to the original author for their contribution.

✅ Tested on Jellyfin for Windows version 10.10.7. Other platforms should follow a similar process.

## Installation Method 1: Direct File Placement

- Download jellyfinmoreplayers.js

- Place the file into the following directory:
`C:\Program Files\Jellyfin\Server\jellyfin-web\`

- Open `C:\Program Files\Jellyfin\Server\jellyfin-web\index.html` and add the following line just above the `</html>` tag:

`<script type="text/javascript" src="jellyfinmoreplayer.js"></script>`

- Restart the Jellyfin server

## Installation Method 2: Tampermonkey Userscript

- Install the Tampermonkey extension in your browser

- Create a new userscript and paste the contents of jellyfinmoreplayer.js into it

- Save the script and ensure it is enabled

Note: Please make sure restart the service after completing the changes.
