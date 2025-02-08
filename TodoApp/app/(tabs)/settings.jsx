import { Text, View, Pressable, StyleSheet, Switch, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { Octicons, FontAwesome } from '@expo/vector-icons';

import { ThemeContext } from "@/context/ThemeContext";

export default function Settinngs() {
    const [isEnabled, setIsEnabled] = useState(false)
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)

    const [loaded, error] = useFonts({
        Inter_500Medium,
    })

    const toggleSwitch = () => {
        setIsEnabled(prevState => !prevState);
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
    }

    const styles = createStyles(theme, colorScheme)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Settings</Text>
            </View>

            <View style={styles.settingsContainer}>
                <Text style={styles.settingText}>
                    Dark Theme
                </Text>

                <Switch
                    trackColor={{ false: '#CDCDE0', true: '#FFA001' }}
                    thumbColor={isEnabled ? '#FFA001' : '#CDCDE0'}
                    //ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>


            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            paddingHorizontal: 12,
        },
        headerContainer: {
            marginTop: 12,
            marginBottom: 18,
            width: '100%',
            maxWidth: 1024,
        },
        headerText: {
            fontSize: 28,
            fontFamily: 'Inter_500Medium',
            color: theme.text,
        },
        settingsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 12,
            //paddingVertical: 14,
            height: 56,
            //pointerEvents: 'auto',
            backgroundColor: colorScheme === 'light' ? 'gray' : '#2b2b2b',
        },
        settingText: {
            fontSize: 18,
            fontFamily: 'Inter_500Medium',
            color: theme.text,
        }
    })
}