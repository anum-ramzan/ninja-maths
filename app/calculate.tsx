import Colors from '@/assets/colors';
import ContainerBackground from '@/components/ContainerBackground';
import CustomModal from '@/components/CustomModal';
import Wrapper from '@/components/Wrapper';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function Calculation() {

  const operationParams = useLocalSearchParams().operation;  // const [operator, setOperator] = useState('+');

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [operation, setOperation] = useState(operationParams || null);
  const [shuffledAnswers, setShuffledAnswers] = useState<number[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [buttonMessage, setButtonMessage] = useState('');

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  function operationSymbol(op: any): string {
    switch (op) {
      case 'addition': return '+';
      case 'subtraction': return '-';
      case 'multiplication': return '*';
      case 'division': return '/';
    }
    return '';
  }

  useEffect(() => {
    // Always set the operation from params, don't conditionally check
    if (operationParams) {
      setOperation(operationParams as string);
    }
  }, [operationParams]);

  useEffect(() => {
    // Generate numbers whenever operation changes

    const set1 = randomNumberInRange(1, 10);
    const set2 = randomNumberInRange(1, 10);

    if (operation === 'division') {
      const divisor = randomNumberInRange(1, 50) + 2;
      const maxMultiple = Math.floor(50 / divisor);
      const multiple = Math.floor(Math.random() * maxMultiple) + 1;
      const dividend = divisor * multiple;

      console.log("dividend, divisor : ", dividend, divisor)
      setNum1(dividend);
      setNum2(divisor);
    } else if (operation === 'subtraction' && set2 > set1) {
      console.log("set2 > set1 : ", set2 > set1)
      setNum1(set2);
      setNum2(set1);
    }
    else {

      setNum1(randomNumberInRange(1, 10));
      setNum2(randomNumberInRange(1, 10));
      console.log("Operation set to:", operation);

    }
  }, [operation]);

  useEffect(() => {
    let calculatedAnswer = 0;
    switch (operation) {
      case 'addition':
        calculatedAnswer = num1 + num2;
        break;
      case 'subtraction':
        // calculatedAnswer = (num2 > num1) ? num2 - num1 : num1 - num2;
        calculatedAnswer = num1 - num2;
        break;
      case 'multiplication':
        calculatedAnswer = num1 * num2;
        break;
      case 'division':
        calculatedAnswer = num2 !== 0 ? num1 / num2 : 0;
        break;
    }
    setAnswer(calculatedAnswer);
  }, [num1, num2, operation]);

  useEffect(() => {
    // if (answer !== 0) {
    const answers = [answer, answer + 2, answer - 2, answer + 5];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    // }
  }, [answer]);

  const handleAnswerCheck = (selectedAnswer: number) => {
    if (selectedAnswer === answer) {
      console.log("Correct!");
      setIsCorrect(true);
      setModalMessage("Correct! 🎉");
      setButtonMessage('next question')

      const set1 = randomNumberInRange(1, 10);
      const set2 = randomNumberInRange(1, 10);
      console.log("set2 > set1 : ", set2 > set1)


      // Generate new numbers for next question
      if (operation === 'subtraction' && set2 > set1) {
        console.log("set2 > set1 : ", set2, set1)
        setNum1(set2);
        setNum2(set1);
      } else if (operation === 'division') {
        const divisor = randomNumberInRange(1, 50) + 2;
        const maxMultiple = Math.floor(50 / divisor);
        const multiple = Math.floor(Math.random() * maxMultiple) + 1;
        const dividend = divisor * multiple;

        console.log("dividend, divisor : ", dividend, divisor)
        setNum1(dividend);
        setNum2(divisor);
      } else {
        setNum1(set1);
        setNum2(set2);
      }
    } 
    
    
    else {
      console.log("Wrong! Correct answer is:", answer);
      setIsCorrect(false);
      setModalMessage('Wrong answer');
      setButtonMessage('try again')
    }
    setModalVisible(true);

  };

  const colors = [Colors.lightSeaGreen, Colors.orangePeel, Colors.redPantone, Colors.richBlack];

  const handleNextQuestion = () => {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <ContainerBackground />

      {/* <Text style={styles.heading}>{operation}</Text> */}

      <Text style={styles.equation}> {num1}  {operationSymbol(operation)} {num2} </Text>

      {shuffledAnswers.map((option, index) => {
        return (
          <Wrapper key={index} styleName={styles.answerBtnContainer}>
            <Pressable
              key={index}
              onPress={() => handleAnswerCheck(option)}
              style={({ pressed, hovered }) => [
                styles.answerBtn,
                hovered && styles.hovered,
                pressed && styles.pressed,
                {
                  backgroundColor: colors[index % colors.length],
                  borderColor: colors[index % colors.length],
                  textShadowColor: colors[index % colors.length],
                },
              ]}
            >

              <Text style={styles.answerText}>{option}</Text>
            </Pressable>
          </Wrapper>
        )
      })
      }
      <CustomModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        isCorrect={isCorrect}
        modalMessage={modalMessage}
        buttonMessage={buttonMessage}
        handleNextQuestion={handleNextQuestion}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    textTransform: 'capitalize',
    paddingTop: 20,
  },
  equation: {
    backgroundColor: Colors.babyPowder,
    color: Colors.richBlack,
    fontSize: 50,
    paddingTop: 30,
    paddingBottom: 30,
    textAlign: 'center',
    width: '100%',
  },
  answerBtnContainer: {
    width: '70%',
    marginTop: 15,
  },
  answerBtn: {
    // width: '100%',
    marginBottom: 15,
  },
  hovered: {
    transform: [{ scale: 1.02 }],
  },
  pressed: {
    backgroundColor: Colors.babyPowder, // Even darker purple
    transform: [{ scale: 0.98 }],
    borderColor: Colors.richBlack,
    elevation: 6,
  },
  answerText: {
    color: Colors.babyPowder,
    fontSize: 30,
    textAlign: 'center',
    padding: 30,
    textShadowColor: Colors.richBlack,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});