#Test

App is using OBS studio for streaming

(HOW TO) -> when you choose your stream in browser, in OBS studio create new scene, after that (in sources) add "Display capture" and "Audio input capture".
-> Go to Settings --> Stream --> Server "rtmp://localhost/live" --> Stream key should be any ID that you are using right now (if it's first video) Stream key should be "1" . Then just click on "Start streaming" 
Before all this you should start every server from this app (client, api, rtmpserver) with "npm start.

