import {AsyncStorage} from "react-native";
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";

const NOTIFICATION_KEY = '@UdaciCards:notification'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        // @ts-ignore
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate()+1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                {
                                    title: 'Start a Quiz!',
                                    body: "👋 don't forget to start a quiz today!",
                                    ios: {
                                        sound: true,
                                    },
                                    android: {
                                        // @ts-ignore
                                        sound: true,
                                        priority: 'high',
                                        sticky: false,
                                        vibrate: true,
                                    }
                                },
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
