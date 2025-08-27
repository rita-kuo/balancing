import { InputField } from "@/app/_component/form/field/InputField";
import { Fragment } from "react";

const cans = [
  {
    name: "汪喵營養罐 - 鱸魚雞肉",
    calorie: 96,
    water: 59.2,
  },
  {
    name: "汪喵營養罐 - 營養鮭魚",
    calorie: 97.6,
    water: 59.04,
  },
  {
    name: "汪喵營養罐 - 放牧鹿肉",
    calorie: 96.8,
    water: 58.87,
  },
  {
    name: "好味母幼貓 - 厚奶燉雞",
    calorie: 105.5,
    water: 59.2,
  },
  {
    name: "好味母幼貓 - 厚奶虱目魚",
    calorie: 102.1,
    water: 59.6,
  },
  {
    name: "好味母幼貓 - 厚奶鱸魚",
    calorie: 104,
    water: 59.5,
  },
];

export const averageCanCalories =
  cans.reduce((sum, can) => sum + can.calorie, 0) / cans.length;

export const averageCanWater =
  cans.reduce((sum, can) => sum + can.water, 0) / cans.length;

const CannedFoodSection = () => {
  return (
    <div className="space-y-3">
      <div className="grid gap-y-1 gap-x-2 grid-cols-[auto_max-content_max-content]">
        <div>
          <h3 className="inline mr-2">罐頭</h3>
          <span className="text-sm">{`共 ${cans.length} 款`}</span>
        </div>
        <span className="text-right">水分</span>
        <span className="text-right">熱量</span>
        {cans.map((can) => (
          <Fragment key={can.name}>
            <span>{can.name}</span>
            <span className="text-right">{`${can.calorie} 大卡`}</span>
            <span className="text-right">{`${can.water}ml`}</span>
          </Fragment>
        ))}
      </div>
      <div className="w-full text-right font-bold text-lg">{`平均 ${averageCanCalories.toFixed(1)} 大卡 / 罐`}</div>
      <InputField name="canNum" label="每日罐頭數量" type="number" />
    </div>
  );
};

export default CannedFoodSection;
