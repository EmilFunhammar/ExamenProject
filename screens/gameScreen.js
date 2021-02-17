import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { SnapShotUsers, GetQuestionInfo } from '../context/firebase_context';

export default function GameBoard() {
  const [usersArray, setUsersArray] = useState(['']);
  const [questionArray, setQuestionArray] = useState(['']);

  const SnapShotObserver = () => {
    SnapShotUsers(setUsersArray);
  };

  useEffect(() => {
    SnapShotObserver();
    GetQuestionInfo(setQuestionArray);
  }, []);
  let question = 'När slutade andra värdskriget';

  return (
    <View style={styles.container}>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>
          {question} {'?'}
          <Button
            title="get Q"
            onPress={() => console.log('QuestionArray', questionArray[0])}
          />
        </Text>
        <Text>Question: {questionArray[0].answer1}</Text>
      </View>

      {usersArray.map((element, index) => (
        <ScoreFeild
          key={index}
          userName={element.userName}
          userScore={element.userScore}
        />
      ))}
      <AnswerFeilds questionArray={questionArray} />
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

const AnswerFeilds = ({ questionArray }) => {
  return (
    <View style={styles.answersView}>
      <View style={styles.leftSide}>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>{questionArray[0].answer1}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>{questionArray[0].answer2}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>{questionArray[0].answer3}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>{questionArray[0].answer}</Text>
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
