import React, { createContext, useState } from 'react'

export interface SettingContextProps {
  children: React.ReactNode
}

export interface ISetting {
  numOfItemsToBeShown: number,
}

export interface IContext {
  context: ISetting,
  setContext: React.Dispatch<React.SetStateAction<ISetting>>
}

export const defaultContextValue = {
  numOfItemsToBeShown: 5
}

export const SettingContext = createContext<IContext>({} as IContext)

const SettingContextProvider = (props: SettingContextProps) => {
  const [context, setContext] = useState(defaultContextValue)

  return (
    <SettingContext.Provider value={{ context, setContext }}>
      {props.children}
    </SettingContext.Provider>
  )
}

export default SettingContextProvider
