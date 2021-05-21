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
    `${theme.backgroundColor}`,
  )
  const [modalVisiable, setModalVisable] = useState(false)

  const { questionArray, gameKey } = route.params
  const navigation = useNavigation()

  useEffect(() => {
    SnapShotUsers(setUsersArray, gameKey)
    SnapShotActiveQuestion(SetActiveQuestion, gameKey)
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
      <View style={{ ...styles.questionView, backgroundColor: theme.buttons }}>
        <Text
          style={{ ...styles.questionText, color: theme.questionTextColor }}
        >
          {questionArray[activeQuestion].question} {'?'}
        </Text>
      </View>

      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisiable}>
          <View
            style={{
              ...styles.modal,
              backgroundColor: theme.buttons,
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

/* const ModalTextComponent = ({ element }) => {
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
        }}
      >
        {element.userAnswer}
      </Text>
    </View>
  )
} */

const ScoreFeild = ({ userName, userScore }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.userNameAndScoreView}>
        <Text style={{ ...styles.userNameScoreText, color: theme.color }}>
          {userName}
        </Text>
        <Text style={{ ...styles.userScoreText, color: theme.color }}>
          {userScore}
        </Text>
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
    // checks if it´s time for new question
    if (AnswerdNum === usersArray.length) {
      ResetAnswerdNum(gameKey)
      setModalVisable(true)
      setTimeout(function () {
        setDisableButton(false)
        setBackgroundColor(theme.backgroundColor)
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

    if (usersAnswerd === questionsRightAnswer) {
      setBackgroundColor('green')
      UpdateUserScore(user.email, gameKey)
      UpdateAnswerdNum(AnswerdNum, gameKey)
    } else {
      setBackgroundColor('red')
      UpdateAnswerdNum(AnswerdNum, gameKey)
    }
  }

  return (
    <View
      style={{
        height: '50%',
        width: '95%',
        alignItems: 'center',
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
            // disable answer fields
            disabled={disableButton}
            style={{
              ...styles.answers,
              backgroundColor: theme.buttons,
              shadowColor: theme.shadowColor,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
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
              shadowColor: theme.shadowColor,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
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
              shadowColor: theme.shadowColor,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
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
              shadowColor: theme.shadowColor,
              borderColor: theme.borderColor,
            }}
            onPress={() => {
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

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    borderLeftWidth: 5,
    borderBottomWidth: 10,
    borderRightWidth: 3,
    borderTopWidth: 3,

    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    marginBottom: 22,
  },
  answersText: {
    fontSize: 26,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    margin: 10,
  },
  questionView: {
    height: '30%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    backgroundColor: 'rgba(20, 107, 102, 0.9)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
})
