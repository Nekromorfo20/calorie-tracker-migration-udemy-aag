import { createContext, useReducer, useMemo, ReactNode, Dispatch } from "react"
import { activityReducer, initialState, TActivityState, TActivityActions } from "../reducers/activity-reducer"
import { categories } from "../data/categorie"
import { TActivity } from "../types"

type TActivityProviderProps = {
    children : ReactNode
}

type TActivityContextProps = {
    state : TActivityState,
    dispatch : Dispatch<TActivityActions>
    caloriesConsumed : number
    caloriesBurned : number
    netCalories : number
    categoryName : (category: TActivity['category']) => string[]
    isEmptyActivities : boolean
}

export const ActivityContext = createContext<TActivityContextProps>(null!)

export const ActivityProvider = ({ children } : TActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    // Contadores
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)
    ,[state.activities])
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)
    ,[state.activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    const categoryName = useMemo(() =>
      (category : TActivity['category']) => categories.map(cat => cat.id === category ? cat.name : "")
    ,[state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])
    
    return (
        <ActivityContext.Provider
        value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}
    >
        {children}
    </ActivityContext.Provider>
    )
}