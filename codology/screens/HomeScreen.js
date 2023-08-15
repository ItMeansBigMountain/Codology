import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';


import AsyncStorage from '@react-native-async-storage/async-storage';



const API_URL = 'http://192.168.1.94:5000';



const HomeScreen = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [timer, setTimer] = useState(0);

    const navigation = useNavigation();


    const questions = [
        {
            image: require('../assets/icon.png'),
            options: ['JavaScript', 'Python', 'Ruby', 'Java'],
            correctAnswer: 1,
        },
        // ... more questions
    ];

    const startGame = () => {
        setIsGameStarted(true);
        // Start the timer
        setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
        }, 1000);
    };


    const endGame = async () => {
        alert(`Game Over! Your score is: ${score}`);

        // Fetch the username from AsyncStorage or from the state where it's stored
        const username = await AsyncStorage.getItem('username');

        // Create the payload
        const payload = {
            username,
            score,
        };

        // Submit the score to the backend
        fetch(`${API_URL}/highscores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                // Handle the response from the backend
                // Redirect to the highscores component
                navigation.navigate('HighScores');
            })
            .catch((error) => {
                console.error('Error submitting score:', error);
            });
    };

    const handleAnswerSelection = (selectedAnswerIndex) => {
        setSelectedOption(selectedAnswerIndex);

        const question = questions[questionIndex];
        if (selectedAnswerIndex === question.correctAnswer) {
            setScore(score + 1); // Increase score for correct answer
            alert('Correct!');
        } else {
            alert('Incorrect!');
        }

        // Move to the next question or end the game if it was the last question
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            endGame();
        }
    };

    const question = questions[questionIndex];

    return (
        <View style={styles.container}>
            {!isGameStarted ? (
                <TouchableOpacity style={styles.startButton} onPress={startGame}>
                    <Text style={styles.buttonText}>Start Game!</Text>
                </TouchableOpacity>
            ) : (
                <>
                    <Text style={styles.timer}>Time: {timer} seconds</Text>
                    <Image source={question.image} style={styles.image} />
                    <View style={styles.optionsContainer}>
                        {question.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.button,
                                    selectedOption === index && styles.buttonSelected,
                                ]}
                                onPress={() => handleAnswerSelection(index)}>
                                <Text style={styles.buttonText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButton: {
        backgroundColor: 'darkslateblue',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '70%',
        height: '70%',
        resizeMode: 'cover',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        width: '20%',
        backgroundColor: '#333',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSelected: {
        backgroundColor: '#1e90ff',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
    },
});

export default HomeScreen;
