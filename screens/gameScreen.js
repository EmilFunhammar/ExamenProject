import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GameBoard() {
  let x = 'När slutade andra värdskriget';
  return (
    <View style={styles.container}>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>
          {x} {'?'}
        </Text>
      </View>
      <View style={styles.underLineView} />
      <AnswerFeilds />
    </View>
  );
}

const AnswerFeilds = () => {
  return (
    <View style={styles.answersView}>
      <View style={styles.leftSide}>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>1999</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>2008</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>1679</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answers}>
          <View>
            <Text style={styles.answersText}>1995</Text>
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
    height: 5,
    backgroundColor: 'black',
    width: '100%',
  },
});
