import firebase, { firestore } from 'firebase'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: 'AIzaSyDfjQkD4UeSNfs1yup3oprY9sQx0ZcH4Uk',
  authDomain: 'examenproject-211e4.firebaseapp.com',
  projectId: 'examenproject-211e4',
  storageBucket: 'examenproject-211e4.appspot.com',
  messagingSenderId: '321759435624',
  appId: '1:321759435624:web:847f5ac5e161152646d4dd',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
let gameSessionRef = firebase.firestore().collection('GameSession')
let questionRef = firebase.firestore().collection('Questions')

//
//
//
//
// SNAPSHOTS

//SnapShot on StartGame
export function SnapShotStartGame(setStartGame, gameKey) {
  gameSessionRef.doc(gameKey).onSnapshot((doc) => {
    setStartGame(doc.data().StartGame)
  })
}

// SnapShot on ActiveQuestion
export function SnapShotActiveQuestion(setActiveQuestion, gameKey) {
  gameSessionRef.doc(gameKey).onSnapshot((doc) => {
    setActiveQuestion(doc.data().ActiveQuestion)
  })
}

export function SnapshotUserAnswerd(setAnswerdNum, gameKey) {
  gameSessionRef.doc(gameKey).onSnapshot((doc) => {
    setAnswerdNum(doc.data().UsersAnswerd)
  })
}

// SnapShot on the users and there information
export function SnapShotUsers(setUserArray, gameKey) {
  gameSessionRef.doc(gameKey).onSnapshot((doc) => {
    setUserArray(doc.data().users)
  })
}
//
//
//
//
// GETS

// Get all the Questions and answers
export function GetQuestionInfo(setQuestionArray, gameKey) {
  let ary = []
  gameSessionRef
    .doc(gameKey)
    .get()
    .then((doc) => {
      ary = [...doc.data().Questions]
      for (let index = 0; index < ary.length; index++) {
        ary[index].Answers.sort(() => Math.random() - 0.5)
      }
      // 10
      const size = 11
      const items = ary.slice(0, size)
      setQuestionArray(items)
    })
    .catch((error) => console.log('error', error))
}

export function SaveUserAnswers1(gameKey) {
  let ref = gameSessionRef.doc(gameKey)

  ref
    .set({
      test: 'emil',
    })
    .catch((error) => console.log('error', error))
}
// save user answer
export function SaveUserAnswers(userAnswerd, gameKey, userEmail) {
  let ary = []
  let ref = gameSessionRef.doc(gameKey)

  ref
    .get()
    .then((doc) => {
      ary = [...doc.data().users]
      for (let index = 0; index < ary.length; index++) {
        if (ary[index].userEmail === userEmail) {
          ary[index].userAnswer = userAnswerd
          console.log('ary', ary[0].userAnswer)
          ref.update({
            users: firebase.firestore.FieldValue.arrayUnion(ary),
          })
        }
      }
      console.log('sucssesful')
    })
    .catch((error) => {
      console.log('error', error)
    })
}

//Get users Score and name
export function GetUsers(setUserArray, gameKey) {
  gameSessionRef
    .doc(gameKey)
    .get()
    .then((doc) => {
      setUserArray(doc.data().users)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

// Get questions from Firebase
export function GetGameQuestions(setGameQuestions) {
  let questionArray = []
  questionRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      questionArray.push(doc.data().question)
    })
    questionArray.sort(() => Math.random() - 0.5)
  })
  setGameQuestions(questionArray)
}
//
//
//
//
// SETS
export function saveGameWinner(winnerAry) {
  console.log('emil runs')
  let ref = firebase.firestore().collection('HighScore')
  winnerAry.forEach((element) => {
    ref
      .add({
        name: element.userName,
        score: element.userScore,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  })
}

export function GetHighScoreList(setHighScorePlayers) {
  let ary = []
  let ref = firebase.firestore().collection('HighScore')
  const bubbleSort = () => {
    swapped = false
    let end = ary.length - 1
    for (let i = 0, j = 1; i < end; i++, j++) {
      if (ary[i].score < ary[j].score) {
        swapped = true
        let temp = ary[i]
        ary[i] = ary[j]
        ary[j] = temp
      }
    }
    end--
  }

  ref.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      ary.push(doc.data())
    })

    do {
      bubbleSort()
    } while (swapped === true)
    ary.length = 6
    //console.log('ary', ary)
    setHighScorePlayers(ary)
  })
}

//UploadGameQuestion
export function CreateGameSetup(questionsArray, sessionName, user) {
  let userScore = 0
  let userEmail = user.email
  let userDisplayName = user.displayName
  let userAnswer = ''
  let host = true
  let userAry = { userEmail, userDisplayName, userScore, userAnswer, host }

  let ref = gameSessionRef.doc(sessionName)

  ref
    .set({
      StartGame: false,
      UsersAnswerd: 0,
      ActiveQuestion: 0,
      Questions: questionsArray,
      users: firebase.firestore.FieldValue.arrayUnion(userAry),
    })
    .catch((error) => console.log('error', error))
}

//
//
//
//
// UPDATES

//Update ActiveQuestion
export function UpdateActiveQuestion(activeQuestion, gameKey) {
  gameSessionRef
    .doc(gameKey)
    .update({
      ActiveQuestion: activeQuestion + 1,
    })
    .catch((error) => console.log('error', error))
}

//Reset AnswerdNum
export function ResetAnswerdNum(gameKey) {
  gameSessionRef
    .doc(gameKey)
    .update({
      UsersAnswerd: 0,
    })
    .catch((error) => console.log('error', error))
}

//Update AnswerdNum
export function UpdateAnswerdNum(AnswerdNum, gameKey) {
  gameSessionRef
    .doc(gameKey)
    .update({
      UsersAnswerd: AnswerdNum + 1,
    })
    .catch((error) => console.log('error', error))
}

// Update UserScore
export function UpdateUserScore(userEmail, gameKey) {
  let ary = []
  let ref = gameSessionRef.doc(gameKey)
  ref.get().then((doc) => {
    ary = [...doc.data().users]
    for (let index = 0; index < ary.length; index++) {
      if (ary[index].userEmail === userEmail) {
        ary[index].userScore += 1
        ref.update({
          users: ary,
        })
      }
    }
  })
}

//StartGame
export function StartGame(gameKey) {
  let ref = gameSessionRef

  ref
    .doc(gameKey)
    .update({ StartGame: true })
    .catch((error) => console.log('error', error))
}

export function AddUserToGame(
  userDisplayName,
  userEmail,
  gameKey,
  setIfDocExsists,
) {
  let userScore = 0
  let userAnswer = ''
  let ary = { userScore, userEmail, userDisplayName, userAnswer }
  let ref = gameSessionRef.doc(gameKey)
  ref.get().then((doc) => {
    if (doc.exists) {
      ref.update({
        users: firebase.firestore.FieldValue.arrayUnion(ary),
      })
      setIfDocExsists(true)
    } else {
      setIfDocExsists(false)
    }
  })
}

export function UpdateUserName(currentUserName) {
  const currentUser = firebase.auth().currentUser
  currentUser
    .updateProfile({
      displayName: currentUserName,
    })
    .catch(function (error) {
      console.log(error)
    })
}
