import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { Octicons, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { ThemeContext } from "@/context/ThemeContext";

export default function EditScreen() {
    const { id } = useLocalSearchParams()
    const [todo, setTodo] = useState({})
    const [inputFocus, setInputFocus] = useState(false)
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const router = useRouter()

    const [loaded, error] = useFonts({
        Inter_500Medium,
    })

    useEffect(() => {

        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find(todo => todo.id.toString() === id)
                    setTodo(myTodo)
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchData(id)
    }, [id])

    if (!loaded && !error) {
        return null
    }

    const styles = createStyles(theme, colorScheme)

    const handleSave = async () => {
        try {
            const savedTodo = { ...todo, title: todo.title }

            const jsonValue = await AsyncStorage.getItem("TodoApp")
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

            if (storageTodos && storageTodos.length) {
                const otherTodos = storageTodos.filter(todo => todo.id !== savedTodo.id)
                const allTodos = [...otherTodos, savedTodo]
                await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos))
            } else {
                await AsyncStorage.setItem("TodoApp", JSON.stringify(savedTodo))
            }

            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, inputFocus && styles.focusedInput]}
                    maxLength={26}
                    placeholder="Edit todo"
                    placeholderTextColor="gray"
                    value={todo?.title || ''} // chain -> if todo is undefined or empty, value will be ''
                    onChangeText={(text) => setTodo(prev => ({ ...prev, title: text }))} // prev -> previous todo state
                    onFocus={setInputFocus}
                    onBlur={() => setInputFocus(false)}
                />
                {/* <Pressable
                    onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                    style={{ marginLeft: 10 }}>

                    <Octicons name={colorScheme === 'dark' ? "moon" : "sun"} size={32} color={theme.text} selectable={undefined} style={{ width: 36 }} />

                </Pressable> */}
            </View>
            <View style={styles.inputContainer}>
                <Pressable
                    onPress={handleSave}
                    style={styles.saveButton}
                >
                    {/*<Text style={styles.saveButtonText}>Save</Text>*/}
                    <FontAwesome name="check" size={18} color="white" />
                </Pressable>
                <Pressable
                    onPress={() => router.push('/')}
                    style={[styles.saveButton, { backgroundColor: '#ff7c54' }]}
                >
                    {/*<Text style={[styles.saveButtonText, { color: 'white' }]}>Cancel</Text>*/}
                    <FontAwesome name="close" size={19} color="white" />
                </Pressable>
            </View>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    )
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: colorScheme === 'dark' ? '#2e2e2e' : 'white',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 6,
            width: '100%',
            maxWidth: 1024,
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        input: {
            flex: 1,
            borderRadius: 4,
            padding: 10,
            marginRight: 10,
            fontSize: 16,
            fontFamily: 'Inter_500Medium',
            minWidth: 0,
            color: theme.text,
            backgroundColor: colorScheme === 'dark' ? '#282828' : '#f2f2f2',
        },
        focusedInput: {
            backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#d6d6d6',
        },
        saveButton: {
            backgroundColor: '#62ff84',
            borderRadius: 4,
            padding: 12,
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
        }
    })
}