import firebase, { firestore } from 'firebase';
//import React, { useContext } from 'react';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

//import { AuthContext } from './AuthContext';

var firebaseConfig = {
  apiKey: 'AIzaSyDfjQkD4UeSNfs1yup3oprY9sQx0ZcH4Uk',
  authDomain: 'examenproject-211e4.firebaseapp.com',
  projectId: 'examenproject-211e4',
  storageBucket: 'examenproject-211e4.appspot.com',
  messagingSenderId: '321759435624',
  appId: '1:321759435624:web:847f5ac5e161152646d4dd',
};

//const app = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  // const firebaseApp =
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export function SaveUserAnswers(userAnswer, gameKey, userEmail) {
  let ary = [];
  var userArrayRef = firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey);

  userArrayRef.get().then((doc) => {
    ary = [...doc.data().users];
    for (let index = 0; index < ary.length; index++) {
      if (ary[index].userEmail === userEmail) {
        ary[index].userAnswer = userAnswer;
        userArrayRef.update({
          users: ary,
        });
      }
    }
  });
}

//Get users Score and name
export function GetUsers(setUserArray, gameKey) {
  //console.log('SnapShotUsers', gameKey);

  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .get()
    .then((doc) => {
      setUserArray(doc.data().users);
    })
    .catch((error) => {
      console.log('error', error);
    });
}

// Get questions from Firebase
export function GetGameQuestions(setGameQuestions) {
  let questionArray = [];
  firebase
    .firestore()
    .collection('Questions')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        questionArray.push(doc.data().question);
      });
      questionArray.sort(() => Math.random() - 0.5);
      //console.log('här ', questionArray);
    });
  setGameQuestions(questionArray);
}

//UploadGameQuestion
export function CreateGameSetup(questionsArray, sessionName, user) {
  let userScore = 0;
  let userEmail = user.email;
  let userDisplayName = user.displayName;
  let userAnswer = '';
  let host = true;
  let userAry = { userEmail, userDisplayName, userScore, userAnswer, host };

  let ref = firebase.firestore().collection('GameSession').doc(sessionName);

  ref
    .set({
      UsersAnswerd: 0,
      ActiveQuestion: 0,
      Questions: questionsArray,
      users: firebase.firestore.FieldValue.arrayUnion(userAry),
    })
    .then(() => {
      /*  ref.update({
        users: firebase.firestore.FieldValue.arrayUnion(userAry),
      }); */
      //console.log('game Created');
    })
    .catch((error) => console.log('error', error));
}

export function doesDocExist(gameKey, setIfDocExsists) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setIfDocExsists(true);
      }
    });
}

export function AddUserToGame(
  userDisplayName,
  userEmail,
  gameKey,
  setIfDocExsists
) {
  let userScore = 0;
  let userAnswer = '';
  let ary = { userScore, userEmail, userDisplayName, userAnswer };
  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .get()
    .then((doc) => {
      if (doc.exists) {
        firebase
          .firestore()
          .collection('GameSession')
          .doc(gameKey)
          .update({
            users: firebase.firestore.FieldValue.arrayUnion(ary),
          });
        setIfDocExsists(true);
      } else {
        setIfDocExsists(false);
      }
    });
}

export function UpdateUserName(currentUserName) {
  const currentUser = firebase.auth().currentUser;
  currentUser
    .updateProfile({
      displayName: currentUserName,
    })
    .then(function () {
      //console.log('document sucssesfuly');
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Update ActiveQuestion
/* export function UpdateActiveQuestion() {
  firebase.firestore().collection('GameSession').doc('pilot1').update({})
}
 */
export function SnapshotUserAnswerd(setAnswerdNum, gameKey) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .onSnapshot((doc) => {
      setAnswerdNum(doc.data().UsersAnswerd);
      //console.log('härsds', doc.data().UsersAnswerd);
    });
}
//Reset AnswerdNum
export function ResetAnswerdNum(gameKey) {
  console.log('ResetAnswerdNum', gameKey);

  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .update({
      UsersAnswerd: 0,
    })
    .then(() => {
      //console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
}

//Update AnswerdNum
export function UpdateAnswerdNum(AnswerdNum, gameKey) {
  // console.log('UpdateAnswerNum', gameKey);

  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .update({
      UsersAnswerd: AnswerdNum + 1,
    })
    .then(() => {
      // console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
}

//Update ActiveQuestion
export function UpdateActiveQuestion(activeQuestion, gameKey) {
  //console.log('updateActiveQuestion', gameKey);
  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .update({
      ActiveQuestion: activeQuestion + 1,
    })
    .then(() => {
      //console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
}

//SnapShop on HasANswerd
export function SnapshotHasAnswers(setIfAnswerd) {
  // console.log('SnapShitHasAnswerd');

  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .onSnapshot((doc) => {
      setIfAnswerd(doc.data().users);
    });
}

// SnapShot on ActiveQuestion
export function SnapShotActiveQuestion(setActiveQuestion, gameKey) {
  //console.log('SnapShotActibeQurstion', gameKey);

  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .onSnapshot((doc) => {
      setActiveQuestion(doc.data().ActiveQuestion);
      //console.log('här', doc.data().ActiveQuestion);
    });
}

// Get all the Questions and answers
export function GetQuestionInfo(setQuestionArray, gameKey) {
  //console.log('GetQuestionInfo', gameKey);
  let ary = [];
  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .get()
    .then((doc) => {
      ary = [...doc.data().Questions];
      for (let index = 0; index < ary.length; index++) {
        ary[index].Answers.sort(() => Math.random() - 0.5);
      }
      //ary.sort(() => Math.random() - 0.5);
      const size = 10;
      const items = ary.slice(0, size);
      setQuestionArray(items);
    })
    .catch((error) => console.log('error', error));
}

// SnapShot on the users and there information
export function SnapShotUsers(setUserArray, gameKey) {
  //console.log('SnapShotUsers', gameKey);

  firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey)
    .onSnapshot((doc) => {
      setUserArray(doc.data().users);
    });
}

// Update UserScore
export function UpdateUserScore(userEmail, gameKey) {
  //console.log('UpdateUserScore !!!!!', userEmail);
  let ary = [];
  var userArrayRef = firebase
    .firestore()
    .collection('GameSession')
    .doc(gameKey);

  userArrayRef.get().then((doc) => {
    ary = [...doc.data().users];
    for (let index = 0; index < ary.length; index++) {
      if (ary[index].userEmail === userEmail) {
        ary[index].userScore += 1;
        userArrayRef.update({
          users: ary,
        });
      }
    }
  });
}
