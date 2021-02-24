import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {
  SnapShotUsers,
  SnapShotActiveQuestion,
  UpdateActiveQuestion,
  ResetAnswerdNum,
  SnapshotUserAnswerd,
  UpdateAnswerdNum,
  UpdateUserScore,
} from '../context/firebase_context';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function GameBoard({ route }) {
  const [usersArray, setUsersArray] = useState(['']);
  const [activeQuestion, SetActiveQuestion] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#146B66');
  const { user } = useContext(AuthContext);
  const { questionArray, gameKey } = route.params;
  const { navigation } = useNavigation();

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
      navigation.navigate('WinnerScreen');
      //console.log('sista frågan', questionArray.length, activeQuestion);
    } else {
      console.log('här i slutet');
    }
    //////////////////////////////
  }, [activeQuestion, navigation, questionArray.length]);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={styles.questionView}>
        <Text
          style={styles.questionText}
          onPress={() => navigation.navigate('WinnerScreen')}
        >
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

      <AnswerFeilds
        questionArray={questionArray}
        activeQuestion={activeQuestion}
        setActiveQuestion={SetActiveQuestion}
        setBackgroundColor={setBackgroundColor}
        usersArray={usersArray}
        gameKey={gameKey}

        //questionArrayAnswers={questionArray[0].Answers}
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
}) => {
  const { user } = useContext(AuthContext);
  //const [ifAnswerd, setIfAnswerd] = useState([]);
  const [AnswerdNum, setAnswerdNum] = useState(0);

  const SnapShotObserver = () => {
    //console.log('OBSERVER');
    SnapshotUserAnswerd(setAnswerdNum, gameKey);
  };
  useEffect(() => {
    // console.log('EFFECT');
    SnapShotObserver();
  }, []);

  useEffect(() => {
    if (AnswerdNum === usersArray.length) {
      // knasar?
      //UpdateUserScore();
      ResetAnswerdNum(gameKey);
      setTimeout(function () {
        setBackgroundColor('#146B66');

        UpdateActiveQuestion(activeQuestion, gameKey);
      }, 2000);
    } /* else {
      console.log('answerdNum = ', AnswerdNum);
    } */
  }, [
    AnswerdNum,
    activeQuestion,
    gameKey,
    setActiveQuestion,
    setBackgroundColor,
    usersArray.length,
  ]);

  const CheckAnswers = (value) => {
    let usersAnswer = questionArray[activeQuestion].Answers[value];
    let questionsRightAnswer = questionArray[activeQuestion].rightAnswer;

    if (usersAnswer === questionsRightAnswer) {
      setBackgroundColor('green');
      //console.log('emil', user);
      UpdateUserScore(user.email, gameKey);

      // setTimeout(function () {
      /* for (let index = 0; index < usersArray.length; index++) {
        if (usersArray[index].userName == 'idaa') {
          UpdateUserScore();
        }
      } */
      UpdateAnswerdNum(AnswerdNum, gameKey);
      // setBackgroundColor('#146B66');
      // }, 2000);
    } else {
      setBackgroundColor('red');
      //setTimeout(function () {
      UpdateAnswerdNum(AnswerdNum, gameKey);
      //setBackgroundColor('#146B66');
      // }, 2000);
    }
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
    fontSize: 40,
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
