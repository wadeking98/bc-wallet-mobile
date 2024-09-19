import { RootStack, Text, useStore, useTheme } from '@hyperledger/aries-bifold-core'
import { BCDispatchAction, BCState } from '../store'
import React, { useEffect, useState } from 'react'
import { Switch, View } from 'react-native'
import AltRootStack from './AltRootStack'

const SwapRootStack: React.FC = () => {
    const [store, dispatch] = useStore<BCState>()
    const [useAltRootstack, setUseAltRootstack] = useState(!!store.useAltRootstack)
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


    return (<>{!useAltRootstack ? <RootStack /> :
        <AltRootStack />
    }</>)
}

export default SwapRootStack