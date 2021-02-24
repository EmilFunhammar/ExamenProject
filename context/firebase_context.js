import firebase, { firestore } from 'firebase';
//import React, { useContext } from 'react';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import { useEffect, useState } from 'react/cjs/react.development';

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

export function AddUserToGame(userDisplayName, userEmail) {
  let userScore = 0;
  let ary = { userScore, userEmail, userDisplayName };
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .update({
      users: firebase.firestore.FieldValue.arrayUnion(ary),
    });
}

export function UpdateUserName(currentUserName) {
  const currentUser = firebase.auth().currentUser;
  currentUser
    .updateProfile({
      displayName: currentUserName,
    })
    .then(function () {
      console.log('document sucssesfuly');
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
export function SnapshotUserAnswerd(setAnswerdNum) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .onSnapshot((doc) => {
      setAnswerdNum(doc.data().UsersAnswerd);
      //console.log('härsds', doc.data().UsersAnswerd);
    });
}
//Reset AnswerdNum
export function ResetAnswerdNum(AnswerdNum) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .update({
      UsersAnswerd: 0,
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
}

//Update AnswerdNum
export function UpdateAnswerdNum(AnswerdNum) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .update({
      UsersAnswerd: AnswerdNum + 1,
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
}

//Update ActiveQuestion
export function UpdateActiveQuestion(activeQuestion) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .update({
      ActiveQuestion: activeQuestion + 1,
    })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
}

//SnapShop on HasANswerd
export function SnapshotHasAnswers(setIfAnswerd) {
  let ary = [];
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .onSnapshot((doc) => {
      setIfAnswerd(doc.data().users);
      /*  for (let index = 0; index < doc.data().users.length; index++) {
        //console.log('här', doc.data().users[index].hasAnswerd);
        ary.push(doc.data().users[index].hasAnswerd);
      } */
      //console.log('emil', ary);
      //setIfAnswerd(ary);
    });
}

// SnapShot on ActiveQuestion
export function SnapShotActiveQuestion(setActiveQuestion) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .onSnapshot((doc) => {
      setActiveQuestion(doc.data().ActiveQuestion);
      //console.log('här', doc.data().ActiveQuestion);
    });
}

// Get all the Questions and answers
export function GetQuestionInfo(setQuestionArray) {
  let ary = [];
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .get()
    .then((doc) => {
      ary = [...doc.data().Questions];
      for (let index = 0; index < ary.length; index++) {
        ary[index].Answers.sort(() => Math.random() - 0.5);
      }

      setQuestionArray(ary);
    })
    .catch((error) => console.log('error', error));
}

// SnapShot on the users and there information
export function SnapShotUsers(setUserArray) {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .onSnapshot((doc) => {
      console.log('users', doc.data());
      setUserArray(doc.data().users);
    });
}

// Update UserScore
export function UpdateUserScore(userEmail) {
  //const { user } = useContext(AuthContext);
  let ary = [];

  var userArrayRef = firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1');

  userArrayRef.get().then((doc) => {
    //console.log('inne', userEmail);
    ary = [...doc.data().users];
    for (let index = 0; index < ary.length; index++) {
      if (ary[index].userName === userEmail) {
        console.log('user email');
        ary[index].userScore += 1;
        console.log('här ', ary);
        // uppdatera endast när alla svarat
        userArrayRef.update({
          users: ary,
        });

        //console.log('updaterad score', ary[index].userScore);
        //console.log('här ', ary[index].userScore);
        //arrayRemove();
        // arrayAdd();
      }
      /*   userArrayRef.update({
        users: [
          { userName: ary[index].userName, userScore: ary[index].userScore },
        ],
      }); */
    }
  });

  const arrayRemove = () => {
    userArrayRef
      .update({
        usersTest1: firebase.firestore.FieldValue.arrayRemove(),
      })
      .catch((error) => console.log('error', error));
  };

  const arrayAdd = () => {
    for (let index = 0; index < ary.length; index++) {
      userArrayRef
        .update({
          usersTest1: firebase.firestore.FieldValue.arrayUnion(ary[index]),
        })
        .catch((error) => console.log('error', error));
    }
  };
}
/* 
var ref = _firestore.collection('member').document(uidMember[index]);
ref.get() => then(function(snapshot) {
    List<dynamic> list = List.from(snapshot.data['statistics']);
    //if you need to update all positions of the array do a foreach instead of the next line
    list[0].CH = false;
    ref.updateData({
        'statistics': list
    }).catchError((e) {
        print(e);
    });
}.catchError((e) {
    print(e);
}); */

//.doc('Test')
/*     .update({
      users: firebase.firestore.FieldValue.delete(0), */
//users: firebase.firestore.FieldValue.arrayRemove('2'),
//users: firebase.firestore.FieldValue.arrayUnion('emil'),

//users: firebase.firestore.FieldValue.arrayUnion('emil  användare'),
/*   })
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => console.log('error', error));
} */

/////////////////////////////////////////////////
