import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import {
  SnapShotUsers,
  SnapShotActiveQuestion,
  UpdateActiveQuestion,
  ResetAnswerdNum,
  SnapshotUserAnswerd,
  UpdateAnswerdNum,
  UpdateUserScore,
  SaveUserAnswers,
} from '../firebase/Firebase';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function GameBoard({ route }) {
  const [usersArray, setUsersArray] = useState(['']);
  const [activeQuestion, SetActiveQuestion] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#146B66');
  const [modalVisiable, setModalVisable] = useState(false);

  //const { user } = useContext(AuthContext);
  const { questionArray, gameKey } = route.params;
  const navigation = useNavigation();

  const SnapShotObservers = () => {
    SnapShotUsers(setUsersArray, gameKey);
    SnapShotActiveQuestion(SetActiveQuestion, gameKey);
  };

  useEffect(() => {
    SnapShotObservers();

    //GetQuestionInfo(setQuestionArray);
  }, []);

  useEffect(() => {
    console.log('här', questionArray.length - 1);
    if (questionArray.length - 1 === activeQuestion) {
      navigation.navigate('WinnerScreen', { gameKey: gameKey });

      //console.log('sista frågan', questionArray.length, activeQuestion);
    } else {
      console.log('här i slutet');
    }
    //////////////////////////////
  }, [activeQuestion, gameKey, navigation, questionArray.length]);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>
          {questionArray[activeQuestion].question} {'?'}
        </Text>
      </View>

      {usersArray.map((element, index) => (
        <ScoreFeild
          key={index}
          userName={element.userDisplayName}
          userScore={element.userScore}
        />
      ))}
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisiable}>
          <View style={styles.modal}>
            {usersArray.map((element, index) => (
              /*  <View style={{ flexDirection: 'row' }}>
                <Text>g{element.userDisplayName}</Text>
                <Text>g{element.userScore}</Text>
              </View> */
              <ModalTextComponent
                key={index}
                userName={element.userDisplayName}
                userAnswer={element.userAnswer}
              />
            ))}
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
  );
}
const ScoreFeild = ({ userName, userScore }) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <View style={styles.userNameAndScoreView}>
        <Text style={styles.userNameScoreText}>{userName}</Text>
        <Text style={styles.userScoreText}>{userScore}</Text>
      </View>
    </View>
  );
};

const AnswerFeilds = ({
  questionArray,
  activeQuestion,
  setActiveQuestion,
  setBackgroundColor,
  usersArray,
  gameKey,
  setModalVisable,
}) => {
  const { user } = useContext(AuthContext);
  const [AnswerdNum, setAnswerdNum] = useState(0);
  const SnapShotObserver = () => {
    SnapshotUserAnswerd(setAnswerdNum, gameKey);
  };
  useEffect(() => {
    SnapShotObserver();
  }, []);

  useEffect(() => {
    if (AnswerdNum === usersArray.length) {
      ResetAnswerdNum(gameKey);
      setModalVisable(true);
      setTimeout(function () {
        setBackgroundColor('#146B66');
        UpdateActiveQuestion(activeQuestion, gameKey);
        setModalVisable(false);
      }, 4000);
    }
  }, [
    AnswerdNum,
    activeQuestion,
    gameKey,
    setActiveQuestion,
    setBackgroundColor,
    setModalVisable,
    usersArray.length,
  ]);

  const CheckAnswers = (value) => {
    let usersAnswer = questionArray[activeQuestion].Answers[value];
    let questionsRightAnswer = questionArray[activeQuestion].rightAnswer;
    saveUsersAnswers(usersAnswer);

    if (usersAnswer === questionsRightAnswer) {
      setBackgroundColor('green');
      UpdateUserScore(user.email, gameKey);
      UpdateAnswerdNum(AnswerdNum, gameKey);
    } else {
      setBackgroundColor('red');
      UpdateAnswerdNum(AnswerdNum, gameKey);
    }
  };

  const saveUsersAnswers = (userAnswer) => {
    SaveUserAnswers(userAnswer, gameKey, user.email);
  };

  return (
    <View style={styles.answersView}>
      <View style={styles.leftSide}>
        <TouchableOpacity
          style={styles.answers}
          onPress={() => {
            CheckAnswers(0);
          }}
        >
          <View>
            <Text style={styles.answersText}>
              {questionArray[activeQuestion].Answers[0]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answers}
          onPress={() => {
            CheckAnswers(1);
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
          style={styles.answers}
          onPress={() => {
            CheckAnswers(2);
          }}
        >
          <View>
            <Text style={styles.answersText}>
              {questionArray[activeQuestion].Answers[2]}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answers}
          onPress={() => {
            CheckAnswers(3);
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
  );
};

const ModalTextComponent = ({ userAnswer, userName }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Text>{userName}</Text>
      <Text>{userAnswer}</Text>
    </View>
  );
};

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
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  answers: {
    width: '90%',
    height: '40%',
    backgroundColor: '#AFEFDF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answersText: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
  },
  questionView: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
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
    top: '55%',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'gray',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
