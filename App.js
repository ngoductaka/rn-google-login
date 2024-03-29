/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk-next';
GoogleSignin.configure({
  webClientId:
    '346756952364-r6u9eq4jt479shn8re3812l4vqgce04b.apps.googleusercontent.com',
});

// fb


async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then((data) => {
        console.log('Signed in with Google!', data)
      })}
    />
  );
}
function GGOut() {
  return (
    <Button
      title="Google Logout"
      style={{ marginTop: 10 }}
      onPress={() => {
        try {
          GoogleSignin.signOut();
        } catch (error) {
          console.error(error);
        }
      }}
    />
  );
}


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GoogleSignIn />
      <GGOut />

      <Button
        title="Facebook Sign-In"
        onPress={() => onFacebookButtonPress()
          .then((val) => console.log('Signed in with Facebook!', val))
          .catch(err => {
            console.log('ddd', err)
          })
        }
      />

      <LoginButton
        onLoginFinished={
          (error, result) => {
            console.log('dasdfasdf33')
            if (error) {
              console.log("login has error: " + result.error);
            } else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken()
                .then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
                .catch(err => console.log('dddd', err))
            }
          }
        }
        onLogoutFinished={() => console.log("logout.")} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
