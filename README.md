Twilio Demo App
------------------

This application is designed for Twilio team to reproduce audio related issues. It will run on Heroku.

Before using the app, you need to specify your Access Token. More information about access tokens are here [Generate an Access Token](https://www.twilio.com/docs/video/javascript-getting-started#3-generate-an-access-token).

Please follow these steps to reproduce the issue described here :

1. Click the "Host" button to log in as a host;
2. Generate an access token with the encoded room;(https://www.twilio.com/docs/video/javascript-getting-started#connect-to-a-room:~:text=You%20can%20also%20encode%20the%20Room%20name%20in%20the%20Access%20Token%2C%20which%20will%20allow%20the%20user%20to%20connect%20to%20only%20the%20Room%20specified%20in%20the%20token.)
3. Enter access token;
4. Launch Heroku app from Ipad, from Safari browser;
5. Log in as a participant from Ipad; (Click the "Participant" button from Ipad)
6. Generate access token to the same room but with another user identity;
7. Enter access token;
8. As the host user clicks the "Play" button;
9. Make sure that in browser console "The LocalAudioTrack 'Microphone' was successfully published." appeared;
10. Make sure that in the browser console, "Audio track received." appears on the participant side;
11. There is no audio on participant side;

If this link (https://twilio-demo-audio-app.herokuapp.com/) does not work use the button below to deploy th app to your Heroku instance.

<a href="https://heroku.com/deploy">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

Please feel free to contact if there are any questions.
Email: yuriy.shyshkun@gmail.com
