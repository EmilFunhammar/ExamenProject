import firebase, { firestore } from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';
import { useState } from 'react/cjs/react.development';

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

//Set ActiveQuestion
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
      setUserArray(doc.data().users);
    });
}

/////////////////////////////////////////////////

export function GetUsers() {
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .get()
    .then((doc) => {
      console.log('Document data:', doc.data());
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
}

export function SnapShotUsersWithColor(setUserArray) {
  let array = [];
  firebase
    .firestore()
    .collection('GameSession')
    .doc('pilot1')
    .onSnapshot((doc) => {
      for (var i = 0; i < doc.data().users.length; i++) {
        var thing = {
          userName: doc.data().users[i].userName,
          userColor: doc.data().users[i].userColor,
        };

        array.push(thing);
      }

      setUserArray(array);
    });
}
export function ListenToTheWorkout(garbage, workoutId, setArray) {
  console.log(garbage);
  firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .onSnapshot((doc) => {
      setArray(doc.data().users);
    });
}

export function ListenToTheWorkout2(workoutId, setArray) {
  firebase
    .firestore()
    .collection('WorkoutSession')
    .doc(workoutId)
    .collection('Exersices')
    .onSnapshot(function (querySnapshot) {
      var cities = [];
      querySnapshot.forEach(function (doc) {
        let docs = doc.data();
        console.log('data', docs);
        let document = {
          exersice: docs.exercise,
          data: docs.users,
          reps: docs.reps,
          sets: docs.sets,
        };
        console.log('document', document);
        cities.push(document);
      });
      setArray(cities);
    });
}
