import { useActivity } from "../hooks/useActivity"
import CalorieDisplay from "./CalorieDisplay"

const CalorieTracker = () => {

  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity()

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
            calories={caloriesConsumed}
            text="Consumidas"
        />
        <CalorieDisplay
            calories={caloriesBurned}
            text="Ejercicio"
        />
        <CalorieDisplay
            calories={netCalories}
            text="Diferencia"
        />
      </div>
    </>
  )
}

export default CalorieTracker