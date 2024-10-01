import { RootStack, Text, useStore, useTheme } from '@hyperledger/aries-bifold-core'
import { BCDispatchAction, BCState } from '../store'
import React, { useEffect, useState } from 'react'
import { Switch, View } from 'react-native'
import AltRootStack from './AltRootStack'

const SwapRootStack: React.FC = () => {
    const [store, dispatch] = useStore<BCState>()
    const [useAltRootstack, setUseAltRootstack] = useState(!!store.useAltRootstack)
    const [lastStackRouteName, setLastStackRouteName] = useState(store.lastStackRouteName)
    const [prevStackRouteName, setPrevStackRouteName] = useState<string|undefined>(undefined)
    const { ColorPallet } = useTheme()
    const toggleRootStack = () => {
        dispatch({
            type: BCDispatchAction.UPDATE_ALT_ROOTSTACK,
            payload: [!useAltRootstack],
        })
        setUseAltRootstack((previousState) => !previousState)
    }
    useEffect(() => {
        setUseAltRootstack(!!store.useAltRootstack)
    }, [store.useAltRootstack])

    useEffect(() => {
        console.log('store.lastStackRouteName', store.lastStackRouteName)
        setPrevStackRouteName(lastStackRouteName)
        setLastStackRouteName(store.lastStackRouteName)
    }, [store.lastStackRouteName])


    return (<>{!useAltRootstack ? <RootStack initialRouteName={prevStackRouteName} /> :
        <AltRootStack initialRouteName={prevStackRouteName} />
    }</>)
}

export default SwapRootStack