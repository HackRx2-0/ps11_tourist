import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
} from 'react-native-webrtc';
import {WebSocketContext} from '../SocketWrapper';

//

const VideoChat = ({navigation, route}) => {
  const {socket} = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const [localStream, setlocalStream] = useState({toURL: () => null});
  const [remoteStream, setremoteStream] = useState({toURL: () => null});
  const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
  const [pc, setPc] = useState(new RTCPeerConnection(configuration));
  useEffect(() => {
    socket.on('offerOrAnswer', sdp => {
      // set sdp as remote description
      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on('candidate', data => {
      pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    pc.onicecandidate = e => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        socket.emit('candidate', {candidate: e.candidate});
      }
    };
    pc.onaddstream = e => {
      // this.remoteVideoref.current.srcObject = e.streams[0]
      setremoteStream(e.stream);
    };
  }, []);
  // this.pc.setRemoteDescription(new RTCSessionDescription(desc))
  const makeCall = () => {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      // console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      };

      mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          setlocalStream(stream);
          pc.addStream(stream);
          pc.createOffer({offerToReceiveVideo: 1}).then(pcoffer => {
            pc.setLocalDescription(pcoffer);
            socket.emit('offerOrcall', {offer: pcoffer, to: route.params.id});
          });
        })
        .catch(err => console.log('user media error ->', err));
    });
  };
  const answerCall = () => {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      // console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      };

      mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          setlocalStream(stream);
          pc.addStream(stream);
          pc.createAnswer({offerToReceiveVideo: 1}).then(ans => {
            pc.setLocalDescription(ans);
            socket.emit('offerOrcall', {answer: ans, to: route.params.id});
          });
        })
        .catch(err => console.log('user media error ->', err));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.doc_video}>
        <RTCView streamURL={remoteStream.toURL()} style={styles.doc_video} />
      </View>
      <View style={styles.my_video}>
        <RTCView streamURL={localStream.toURL()} style={styles.my_video} />
      </View>
      <Button style={styles.btn} onPress={() => makeCall()} mode="contained">
        Call
      </Button>
      <Button style={styles.btn} onPress={() => answerCall()} mode="contained">
        Answer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#23355F',
  },
  doc_video: {
    display: 'flex',
    height: '80%',
    backgroundColor: '#000',
  },
  my_video: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    height: 150,
    width: 100,
    backgroundColor: '#fff',
  },
  avl_doc: {
    padding: 10,
    height: 70,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#51669E',
  },
  btn: {
    marginTop: 20,
    width: 100,
    marginLeft: 200,
  },
  icon: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default VideoChat;
