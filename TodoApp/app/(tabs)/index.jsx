import { Text, View, TextInput, Pressable, StyleSheet, FlatList, /*CheckBox*/ } from "react-native";
//import CheckBox from "@react-native-community/checkbox";
import { Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Octicons, FontAwesome } from '@expo/vector-icons'

import { data } from "@/data/todos"

export default function Index() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
  const router = useRouter()

  const [loaded, error] = useFonts({
    Inter_500Medium,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp")
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id))
        } else {
          setTodos(data.sort((a, b) => b.id - a.id))
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
  }, [data])

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos)
        await AsyncStorage.setItem("TodoApp", jsonValue)
      } catch (e) {
        console.error(e)
      }
    }

    storeData()
  }, [todos])

  if (!loaded && !error) {
    return null
  }

  const styles = createStyles(theme, colorScheme)

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos])
      setText('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handlePress = (id) => {
    router.push(`/todos/${id}`)
  }

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Pressable
        key={item.id}
        style={[styles.checkbox, item.completed && styles.completedCheckbox]}
      >
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={() => toggleTodo(item.id)}
          color={item.completed ? '#63ae71' : '#b1b1b1'} // color prop applies only to fill and ripple effect
        />
      </Pressable>
      <Pressable
        onPress={() => handlePress(item.id)}
        /*onLongPress={() => toggleTodo(item.id)}*/
        style={styles.todoTextContainer}
      >
        <Text style={styles.todoText} >
          {item.title}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => removeTodo(item.id)}
        style={styles.deleteButton}
      >
        <MaterialCommunityIcons name="delete" size={24} color="white" selectable={undefined} />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputFocus && styles.focusedInput]}
          maxLength={26}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
          onFocus={setInputFocus}
          onBlur={() => setInputFocus(false)}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          {/*<Text style={styles.addButtonText}>Add</Text>*/}
          <FontAwesome name="plus" size={18} color="white" />
        </Pressable>
        {/* <Pressable
          onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
          style={{ marginLeft: 10 }}>

          <Octicons name={colorScheme === 'dark' ? "moon" : "sun"} size={32} color={theme.text} selectable={undefined} style={{ width: 36 }} />

        </Pressable> */}
      </View>
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      //borderWidth: 1,
      //borderColor: 'red',
      padding: 12,
      marginBottom: 2,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
      backgroundColor: theme.background,
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
    addButton: {
      backgroundColor: '#76ff8f',
      borderRadius: 4,
      padding: 12,
    },
    todoItem: {
      flex: 1,
      flexDirection: 'row',
      //alignItems: 'center',
      justifyContent: 'space-between',
      //gap: 10,
      margin: 6,
      borderRadius: 4,
      //borderWidth: 1,
      //borderColor: 'royalblue',
      width: '94%',
      maxWidth: 1024,
      marginHorizontal: 'auto', // center item
      overflow: 'hidden',
      pointerEvents: 'auto',
      //backgroundColor: '#3e3e3e',
    },
    checkbox: {
      //flex: 1,
      //alignItems: 'center',
      //justifyContent: 'center',
      padding: 8,
      backgroundColor: colorScheme === 'dark' ? '#5b5b5b' : '#dcdcdc',
      //borderStartStartRadius: 4,
      //borderEndStartRadius: 4,
    },
    completedCheckbox: {
      backgroundColor: '#76ff8f',
    },
    todoTextContainer: {
      flexGrow: 1,
      //flexShrink: 1,
      //flexWrap: 'nowrap',
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: colorScheme === 'dark' ? '#3e3e3e' : '#efefef',
    },
    todoText: {
      //flexShrink: 1,
      //flexWrap: 'wrap',
      fontSize: 14,
      fontFamily: 'Inter_500Medium',
      color: theme.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: '#7d7d7d',
    },
    deleteButton: {
      padding: 14,
      justifyContent: 'center',
      backgroundColor: '#ff3d3d'
    },
  })
}