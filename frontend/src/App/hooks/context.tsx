import React, { createContext, useState } from 'react'

export interface ContextProps {
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

export const Context = createContext<IContext>({} as IContext)

const ContextProvider = (props: ContextProps) => {
  const [context, setContext] = useState(defaultContextValue)

  return (
    <Context.Provider value={{ context, setContext }}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider
