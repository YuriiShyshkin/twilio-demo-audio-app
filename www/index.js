let createLocalAudioTrack;
let twilioRoom;
let localAudioTrack = 'roomName';
const twilioRoomName = 'roomName';

function connect() {
    const connect = Twilio.Video.connect;

    const accessToken = document.getElementById('accessToken').value;

    connect(accessToken, {
        name : twilioRoomName,
        tracks : [],
        automaticSubscription : true,
        video : { height : 720, frameRate : 24, width : 1280 },
        bandwidthProfile : {
            video : {
                mode : 'presentation',
                trackSwitchOffMode : 'detected',
                maxSubscriptionBitrate : 0,
                contentPreferencesMode: 'auto'
            }
        },
        maxAudioBitrate : 16000,
        preferredVideoCodecs : 'auto',
        networkQuality : {local : 1, remote : 1}
    }).then(room => {

        console.log('Twilio JS Library Version:', Twilio.Video.version);
        console.log('Twilio room:', room);

        twilioRoom = room;
        twilioRoom.on('participantConnected', participantConnected);

        document.getElementById('twilioRoomName').innerHTML = 'Twilio Room Name: ' + twilioRoomName;

        document.getElementById('credentials').classList.add('display-none');
        document.getElementById('navigation').style.display = 'flex';

    }).catch(error => {
        console.log('init(), error:', error);
    });

    createLocalAudioTrack = Twilio.Video.createLocalAudioTrack;
}

function turnOnAudio() {

    createLocalAudioTrack({
        name : 'Microphone'
    }).then(audioTrack => {
        localAudioTrack = audioTrack;
        twilioRoom.localParticipant.publishTrack(audioTrack, {priority : 'low'}).then(function(publication) {
            console.log('The LocalAudioTrack "' + publication.trackName + '" was successfully published.');
        }).catch(error => {
            console.log('Audio track error:', error);
        });

        const audioNode = document.createElement("span");
        audioNode.id = twilioRoom.localParticipant.sid + 'audio';

        const audioElement = localAudioTrack.attach();
        audioNode.appendChild(audioElement);

        document.getElementById('remote-media').appendChild(audioNode);

    }).catch((error) => {
        console.log('@@@ turnOnAudio(), error:', error);
    });

    document.getElementById('turnOnAudio').classList.add('display-none');
    document.getElementById('turnOffAudio').classList.remove('display-none');
}

function turnOffAudio() {
    stopTrack(localAudioTrack);

    const elementToRemove = document.getElementById(twilioRoom.localParticipant.sid + 'audio');
    elementToRemove.remove();

    document.getElementById('turnOffAudio').classList.add('display-none');
    document.getElementById('turnOnAudio').classList.remove('display-none');
}

function stopTrack(track) {
    twilioRoom.localParticipant.unpublishTrack(track);
    track.stop();
}

function participantConnected() {
    console.log('participant connected');
}