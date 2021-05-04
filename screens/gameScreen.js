//REACT
import React, { useEffect, useState, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  LogBox,
} from 'react-native'

//FIREBASE
import {
  SnapShotUsers,
  SnapShotActiveQuestion,
  UpdateActiveQuestion,
  ResetAnswerdNum,
  SnapshotUserAnswerd,
  UpdateAnswerdNum,
  UpdateUserScore,
} from '../firebase/Firebase'

// CONTEXTS
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

//NAVIGATION
import { useNavigation } from '@react-navigation/native'
LogBox.ignoreLogs(['Setting a timer'])

export default function GameBoard({ route }) {
  const { theme } = useContext(ThemeContext)
  const [usersArray, setUsersArray] = useState([''])
  const [activeQuestion, SetActiveQuestion] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState(
    `${theme.lightBackgroundColor}`,
  )
  const [modalVisiable, setModalVisable] = useState(false)

  //const { user } = useContext(AuthContext);

  const { questionArray, gameKey } = route.params
  const navigation = useNavigation()

  /*  const SnapShotObservers = () => {
    SnapShotUsers(setUsersArray, gameKey);
    SnapShotActiveQuestion(SetActiveQuestion, gameKey);
  }; */

  useEffect(() => {
    SnapShotUsers(setUsersArray, gameKey)
    SnapShotActiveQuestion(SetActiveQuestion, gameKey)

    //GetQuestionInfo(setQuestionArray);
  }, [])

  useEffect(() => {
    if (questionArray.length - 1 === activeQuestion) {
      navigation.navigate('WinnerScreen', { gameKey: gameKey })
    }
  }, [activeQuestion, gameKey, navigation, questionArray.length])

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: backgroundColor,
      }}
    >
      <View style={styles.questionView}>
        <Text style={{ ...styles.questionText, color: theme.color }}>
          {questionArray[activeQuestion].question} {'?'}
        </Text>
      </View>
      {/* {usersArray.map((element, index) => (
        <ScoreFeild
          key={index}
          userName={element.userDisplayName}
          userScore={element.userScore}
        />
      ))} */}
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisiable}>
          <View
            style={{
              ...styles.modal,
              backgroundColor: theme.lightBackgroundColor,
            }}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 26, fontWeight: '600' }}>
                Rätt svar:
              </Text>
              <Text style={{ fontSize: 26, fontWeight: '600' }}>
                {questionArray[activeQuestion].rightAnswer}
              </Text>
            </View>
            {/*   <View
              style={{
                backgroundColor: 'rgba(20, 107, 102, 0.8)',
                width: '100%',
                position: 'absolute',
                bottom: '10%',
              }}
            >
              {usersArray.map((element, index) => (
                <ModalTextComponent element={element} key={index} />
              ))}
            </View> */}
          </View>
        </Modal>
      </View>
      <AnswerFeilds
        questionArray={questionArray}
        activeQuestion={activeQuestion}
        setActiveQuestion={SetActiveQuestion}
        setBackgroundColor={setBackgroundColor}
        usersArray={usersArray}
        gameKey={gameKey}
        setModalVisable={setModalVisable}
      />
    </View>
  )
}

const ModalTextComponent = ({ element }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        fontSize: 22,
      }}
    >
      <Text
        style={{
          position: 'absolute',
          left: '5%',
          fontSize: 22,
          fontWeight: '600',
        }}
      >
        {element.userDisplayName}
      </Text>
      <Text
        style={{
          marginLeft: '20%',
          fontSize: 22,
          fontWeight: '600',
        }} /* style={{ position: 'absolute', left: '50%' }} */
      >
        {element.userAnswer}
      </Text>
    </View>
  )
}

const ScoreFeild = ({ userName, userScore }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.userNameAndScoreView}>
        <Text style={styles.userNameScoreText}>{userName}</Text>
        <Text style={styles.userScoreText}>{userScore}</Text>
      </View>
    </View>
  )
}

const AnswerFeilds = ({
  questionArray,
  activeQuestion,
  setActiveQuestion,
  setBackgroundColor,
  usersArray,
  gameKey,
  setModalVisable,
}) => {
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const [AnswerdNum, setAnswerdNum] = useState(0)
  const [disableButton, setDisableButton] = useState(false)
  let usersAnswer = questionArray[activeQuestion]

  useEffect(() => {
    SnapshotUserAnswerd(setAnswerdNum, gameKey)
  }, [gameKey])

  useEffect(() => {
    if (AnswerdNum === usersArray.length) {
      ResetAnswerdNum(gameKey)
      //Modal inactiv
      setModalVisable(true)
      setTimeout(function () {
        setDisableButton(false)
        setBackgroundColor(theme.lightBackgroundColor)
        UpdateActiveQuestion(activeQuestion, gameKey)
        setModalVisable(false)
      }, 4000)
    }
  }, [
    AnswerdNum,
    activeQuestion,
    gameKey,
    setActiveQuestion,
    setBackgroundColor,
    setModalVisable,
    usersArray.length,
  ])

  const CheckAnswers = (value) => {
    setDisableButton(true)
    let usersAnswerd = questionArray[activeQuestion].Answers[value]
    let questionsRightAnswer = questionArray[activeQuestion].rightAnswer
    //SaveUserAnswers(usersAnswer, gameKey, user.email);

    //saveUsersAnswers(usersAnswer);

    if (usersAnswerd === questionsRightAnswer) {
      setBackgroundColor('green')
      UpdateUserScore(user.email, gameKey)
      UpdateAnswerdNum(AnswerdNum, gameKey)
    } else {
      setBackgroundColor('red')
      UpdateAnswerdNum(AnswerdNum, gameKey)
    }
  }

  /*   const saveUsersAnswers = (userAnswer) => {
    SaveUserAnswers(userAnswer, gameKey, user.email);
  }; */

  return (
    <View
      style={{
        height: '50%',
        width: '95%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
      }}
    >
      {usersArray.map((element, index) => (
        <ScoreFeild
          key={index}
          userName={element.userDisplayName}
          userScore={element.userScore}
        />
      ))}

      <View style={styles.answersView}>
        <View style={styles.leftSide}>
          <TouchableOpacity
            disabled={disableButton}
            style={{
              ...styles.answers,
              backgroundColor: theme.buttons,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
              //SaveUserAnswers(usersAnswer.Answers[0], gameKey, user.email)
              //SaveUserAnswers1(gameKey);

              CheckAnswers(0)
            }}
          >
            <View>
              <Text style={styles.answersText}>
                {questionArray[activeQuestion].Answers[0]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableButton}
            style={{
              ...styles.answers,
              backgroundColor: theme.buttons,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
              //SaveUserAnswers(usersAnswer.Answers[1], gameKey, user.email)
              CheckAnswers(1)
            }}
          >
            <View>
              <Text style={styles.answersText}>
                {questionArray[activeQuestion].Answers[1]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSide}>
          <TouchableOpacity
            disabled={disableButton}
            style={{
              ...styles.answers,
              backgroundColor: theme.buttons,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
              //SaveUserAnswers(usersAnswer.Answers[2], gameKey, user.email)
              CheckAnswers(2)
            }}
          >
            <View>
              <Text style={styles.answersText}>
                {questionArray[activeQuestion].Answers[2]}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableButton}
            style={{
              ...styles.answers,
              backgroundColor: theme.buttons,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
              //SaveUserAnswers(usersAnswer.Answers[3], gameKey, user.email)
              CheckAnswers(3)
            }}
          >
            <View>
              <Text style={styles.answersText}>
                {questionArray[activeQuestion].Answers[3]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#146B66',
  },
  leftSide: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  rightSide: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    height: '100%',
  },
  answersView: {
    height: '85%',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  answers: {
    width: '90%',
    height: '40%',
    backgroundColor: '#AFEFDF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderLeftWidth: 5,
    borderBottomWidth: 10,
    borderRightWidth: 3,
    borderTopWidth: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    marginBottom: 22,
  },
  answersText: {
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
  },
  questionView: {
    height: '30%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    //borderWidth: 3,
    borderRadius: 20,
  },
  questionText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: '600',
    width: '80%',
  },
  underLineView: {
    height: 1,
    backgroundColor: 'black',
    width: '95%',
  },
  userNameScoreText: {
    width: '70%',
    justifyContent: 'center',
    fontSize: 22,
    marginLeft: 20,
    fontWeight: '500',
  },
  userScoreText: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 22,
    fontWeight: '500',
  },
  userNameAndScoreView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    top: '40%',
    width: '90%',
    height: '30%',
    //backgroundColor: 'rgba(175, 239, 223, 0.8)',
    backgroundColor: 'rgba(20, 107, 102, 0.9)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
})

/* const ScoreFeild = () => {
  const [UsersArray, setUsersArray] = useState(['']);
  useEffect(() => {
    SnapShotUsers(setUsersArray);
  }, [UsersArray]);
  return (
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <View style={{ width: '50%' }}>
        <View style={styles.userNameAndScoreView}>
          <Text style={styles.userNameScoreText}>{UsersArray[0].userName}</Text>
          <Text style={styles.userScoreText}>{UsersArray[0].userScore}</Text>
        </View>
        <View style={{ ...styles.underLineView, marginLeft: 20 }} />
        <View style={styles.userNameAndScoreView}>
          <Text style={styles.userNameScoreText}>esdsmil:</Text>
          <Text style={styles.userScoreText}>6</Text>
        </View>
        <View style={{ ...styles.underLineView, marginLeft: 20 }} />
      </View>
      <View style={{ width: '50%' }}>
        <View style={styles.userNameAndScoreView}>
          <Text style={{ ...styles.userNameScoreText, marginLeft: 0 }}>
            esdsmil:
          </Text>
          <Text style={styles.userScoreText}>6</Text>
        </View>
        <View style={styles.underLineView} />

        <View style={styles.userNameAndScoreView}>
          <Text style={{ ...styles.userNameScoreText, marginLeft: 0 }}>
            emil:
          </Text>
          <Text style={{ ...styles.userScoreText }}>6</Text>
        </View>
        <View style={styles.underLineView} />
      </View>
    </View>
  );
}; */
