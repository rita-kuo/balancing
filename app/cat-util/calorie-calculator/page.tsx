"use client";
import Form from "@/app/_component/form/Form";
import { InputField } from "@/app/_component/form/field/InputField";
import DerSelect from "@/app/cat-util/calorie-calculator/DerSelect";
import CalculateResult from "@/app/cat-util/calorie-calculator/CalculateResult";
import CannedFoodSection from "@/app/cat-util/calorie-calculator/CannedFoodSection";
import DryFoodCalculator from "@/app/cat-util/calorie-calculator/DryFoodCalculator";

const Divider = () => <div className="w-full border-b border-gray-200" />;
const CalculatorFormContent = () => {
  return (
    <div className="space-y-4">
      <InputField type="number" min={0} name="weight" label="體重 (kg)" />
      <DerSelect />
      <Divider />
      <CalculateResult />
      <Divider />
      <CannedFoodSection />
      <DryFoodCalculator />
    </div>
  );
};

const CalorieCalculatorPage = () => {
  return (
    <Form
      defaultValue={{
        weight: 0,
        der: 2,
        canNum: 0.5,
        dryFoodIndex: [{ index: 0 }],
      }}
      onSubmit={async (values) => {}}
    >
      <CalculatorFormContent />
    </Form>
  );
};

export default CalorieCalculatorPage;
