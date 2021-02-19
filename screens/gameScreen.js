import React, { useEffect, useState } from 'react';
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

export default function GameBoard({ route }) {
  const [usersArray, setUsersArray] = useState(['']);
  const [activeQuestion, SetActiveQuestion] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#146B66');
  const { questionArray } = route.params;

  const SnapShotObservers = () => {
    SnapShotUsers(setUsersArray);
    SnapShotActiveQuestion(SetActiveQuestion);
  };

  useEffect(() => {
    SnapShotObservers();

    //GetQuestionInfo(setQuestionArray);
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>
          {questionArray[activeQuestion].question} {'?'}
          {/*   <Button
            title="get AQ"
            onPress={() => {
              //setActiveQuestion((prev) => prev + 1);
              console.log('AQ', SetActiveQuestion(activeQuestion));
            }}
          /> */}
        </Text>
        {/*         <Text>ActiveQuestion: {activeQuestion}</Text>
         */}
      </View>

      {usersArray.map((element, index) => (
        <ScoreFeild
          key={index}
          userName={element.userName}
          userScore={element.userScore}
        />
      ))}

      <AnswerFeilds
        questionArray={questionArray}
        activeQuestion={activeQuestion}
        setActiveQuestion={SetActiveQuestion}
        setBackgroundColor={setBackgroundColor}
        usersArray={usersArray}

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
}) => {
  //const [ifAnswerd, setIfAnswerd] = useState([]);
  const [AnswerdNum, setAnswerdNum] = useState(0);

  const SnapShotObserver = () => {
    //console.log('OBSERVER');
    SnapshotUserAnswerd(setAnswerdNum);
  };
  useEffect(() => {
    // console.log('EFFECT');
    SnapShotObserver();
  }, []);

  useEffect(() => {
    if (AnswerdNum === usersArray.length) {
      ResetAnswerdNum();
      setTimeout(function () {
        setBackgroundColor('#146B66');
        UpdateActiveQuestion(activeQuestion);
      }, 2000);
    } /* else {
      console.log('answerdNum = ', AnswerdNum);
    } */
  }, [
    AnswerdNum,
    activeQuestion,
    setActiveQuestion,
    setBackgroundColor,
    usersArray.length,
  ]);

  const CheckAnswers = (value) => {
    let usersAnswer = questionArray[activeQuestion].Answers[value];
    let questionsRightAnswer = questionArray[activeQuestion].rightAnswer;

    if (usersAnswer === questionsRightAnswer) {
      setBackgroundColor('green');
      // setTimeout(function () {
      /* for (let index = 0; index < usersArray.length; index++) {
        if (usersArray[index].userName == 'idaa') {
          UpdateUserScore();
        }
      } */
      UpdateAnswerdNum(AnswerdNum);
      // setBackgroundColor('#146B66');
      // }, 2000);
    } else {
      setBackgroundColor('red');
      //setTimeout(function () {
      UpdateAnswerdNum(AnswerdNum);
      //setBackgroundColor('#146B66');
      // }, 2000);
    }
  };

  return (
    <View style={styles.answersView}>
      <Button
        title="set num"
        onPress={() => {
          for (let index = 0; index < usersArray.length; index++) {
            if (usersArray[index].userName === 'idaa') {
              //UpdateUserScore();
            }
          }
        }}
      />
      <View style={styles.leftSide}>
        <TouchableOpacity
          style={styles.answers}
          onPress={() => {
            CheckAnswers(0);
          }}
        >
          <View>
            <Text style={styles.answersText}>
              {/*  {AnswerdNum} */}
              {/* {`${ifAnswerd[0].hasAnswerd}`} */}
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
