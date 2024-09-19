import { Screens, TOKENS, useServices, useStore, useTheme } from "@hyperledger/aries-bifold-core"
import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import SplashScreen from "react-native-splash-screen"
import { BCDispatchAction, BCState } from "../store"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface Props {
    children: React.ReactNode
}

const HeaderTitle: React.FC<Props> = ({ children }) => {
    const { TextTheme } = useTheme()
    const styles = StyleSheet.create({
        title: {
            ...TextTheme.headerTitle,
            textAlign: 'center',
        },
    })

    return (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {children}
        </Text>
    )
}

const mainScreen: React.FC = () => {
    const [store, dispatch] = useStore<BCState>()
    const [useAltRootstack, setUseAltRootstack] = useState(!!store.useAltRootstack)
    const { ColorPallet, TextTheme } = useTheme()
    const toggleRootStack = () => {
        dispatch({
            type: BCDispatchAction.UPDATE_ALT_ROOTSTACK,
            payload: [!useAltRootstack],
        })
        setUseAltRootstack((previousState) => !previousState)
    }
    const [HomeHeader] = useServices([TOKENS.COMPONENT_HOME_HEADER])
    useEffect(() => {
        setUseAltRootstack(!!store.useAltRootstack)
    }, [store.useAltRootstack])
    return (
        <View style={{ display: "flex", alignItems: 'center' }}>
            <View style={{ flexDirection: "row" }}>
                <HomeHeader></HomeHeader>
                <Text style={TextTheme.title}>BC Services Card App</Text>

                <Switch
                    trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primaryDisabled }}
                    thumbColor={useAltRootstack ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey}
                    ios_backgroundColor={ColorPallet.grayscale.lightGrey}
                    onValueChange={toggleRootStack}
                    value={useAltRootstack}
                /></View>
        </View>
    )

}

const AltRootStack: React.FC = () => {
    const Stack = createStackNavigator()
    const [splash, { enableImplicitInvitations, enableReuseConnections }, logger, OnboardingStack, loadState] =
        useServices([TOKENS.SCREEN_SPLASH, TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.STACK_ONBOARDING, TOKENS.LOAD_STATE])
    const { ColorPallet, TextTheme } = useTheme()
    const { t } = useTranslation()

    const options: StackNavigationOptions = {
        headerTintColor: ColorPallet.brand.headerIcon,
        headerShown: true,
        headerBackTitleVisible: false,
        headerTitleContainerStyle: {
            flexShrink: 1,
            maxWidth: '68%',
            width: '100%',
        },
        headerStyle: {
            elevation: 0,
            shadowOffset: { width: 0, height: 6 },
            shadowRadius: 6,
            shadowColor: ColorPallet.grayscale.black,
            shadowOpacity: 0.15,
            borderBottomWidth: 0,
        },
        headerTitleAlign: 'center' as 'center' | 'left',
        headerTitle: (props: { children: React.ReactNode }) => <HeaderTitle {...props} />,
        headerBackAccessibilityLabel: t('Global.Back'),
    }

    return (
        <Stack.Navigator initialRouteName={'Services Card App'} screenOptions={options}>
            <Stack.Screen name={'Services Card App'} component={mainScreen} options={{
                ...options, headerLeft: () => {
                    return (
                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity>
                                <Icon size={35} name="menu" color={ColorPallet.grayscale.white}></Icon>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }} />
        </Stack.Navigator>
    )
}

export default AltRootStack