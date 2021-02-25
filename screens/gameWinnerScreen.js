import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { AuthContext } from '../context/AuthContext';
import { GetUsers } from '../firebase/Firebase';

export default function GameWinner() {
  const { user } = useContext(AuthContext);
  const [userAry, setUserAry] = useState(['']);
  const gameKey = 'Emil';

  useEffect(() => {
    GetUsers(setUserAry, gameKey);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/*  <Text onPress={() => console.log(userScores[0].userScore)}>
        THis is Winner Screen
      </Text> */}
      <View style={{ backgroundColor: 'orange', width: '100%' }}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Score</Text>
        </View>
        <View style={styles.QuestionMaserView}>
          <Text style={styles.QuestionMaserText}>Question Master!!!</Text>
          <Text style={styles.QuestionMaserText}>
            {userAry[0].userDisplayName}
          </Text>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        {userAry.map((element, index) => (
          <ScoreComponent
            userScore={element.userScore}
            userName={element.userDisplayName}
            key={index}
          />
        ))}
        <ScoreComponent />
      </View>
    </SafeAreaView>
  );
}

const ScoreComponent = ({ userScore, userName }) => {
  return (
    <View style={styles.UserTableView}>
      <Text style={styles.UserTableText}>{userName}</Text>
      <Text style={styles.UserTableText}>{userScore}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    backgroundColor: 'yellow',
  },
  QuestionMaserView: {
    backgroundColor: 'blue',
  },
  UserTableView: {
    backgroundColor: 'red',
    flexDirection: 'row',
    width: '100%',
  },
  titleText: {
    fontSize: 22,
  },
  QuestionMaserText: {
    fontSize: 22,
  },
  QuestionMaserUserName: {
    fontSize: 16,
  },
  UserTableText: {
    fontSize: 18,
  },
});
