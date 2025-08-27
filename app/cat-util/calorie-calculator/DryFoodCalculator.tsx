import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import SelectField from "@/app/_component/form/field/SelectField";
import { useMemo } from "react";
import { BiPlus, BiX } from "react-icons/all";
import {
  averageCanCalories,
  averageCanWater,
} from "@/app/cat-util/calorie-calculator/CannedFoodSection";

const dryFoods = [
  {
    name: "Halo 幼貓鮭魚",
    calorie: 383,
    water: 7.1,
  },
];

const DryFoodCalculator = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dryFoodIndex",
  });

  const serving = useMemo(() => Math.round(100 / fields.length), [fields]);

  const calorieReq = useWatch({ name: "calorieReq" });
  const canNum = useWatch({ name: "canNum" });
  const canCalorie = useMemo(() => averageCanCalories * canNum, [canNum]);

  const dryFoodIndex = useWatch({ name: "dryFoodIndex" }) as {
    index: number;
  }[];

  const options = dryFoods.map((dryFood, index) => ({
    title: dryFood.name,
    value: index,
  }));

  const dryFoodCalorie = useMemo(
    () =>
      dryFoodIndex.reduce(
        (cal, { index }) =>
          cal + ((dryFoods[index]?.calorie ?? 0) * serving) / 100,
        0,
      ),
    [dryFoodIndex, serving],
  );

  const waterReq = useWatch({ name: "waterReq" });
  const canWater = useMemo(() => averageCanWater * canNum, [canNum]);

  return (
    <>
      <div className="flex justify-between items-end">
        <h3>乾糧</h3>
        <div
          className="ml-auto w-max underline flex items-center gap-1"
          onClick={() => append({ index: 0 })}
        >
          <BiPlus />
          <span>添加乾糧</span>
        </div>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex justify-between items-center">
          <SelectField
            name={`dryFoodIndex.${index}.index`}
            label={`${serving}%`}
            options={options}
          />
          <BiX onClick={() => remove(index)} className="w-5 h-5" />
        </div>
      ))}
      <div>
        <h2>乾糧需求量</h2>
        <p>= (熱量需求 - 罐頭熱量) * 100 / 熱量每 100 克</p>
        <p>{`= (${calorieReq ?? 0} - ${Math.round(canCalorie ?? 0)}) * 100 / ${dryFoodCalorie}`}</p>
        <p>{`= ${Math.round((((calorieReq ?? 0) - (canCalorie ?? 0)) * 100) / dryFoodCalorie)} g`}</p>
      </div>
      <div>
        <h2>額外水量</h2>
        <p>= 水量需求 - 罐頭水量</p>
        <p>{`= ${waterReq ?? 0} - ${Math.round(canWater ?? 0)}`}</p>
        <p>{`= ${Math.round((waterReq ?? 0) - (canWater ?? 0))} ml`}</p>
      </div>
    </>
  );
};

export default DryFoodCalculator;
