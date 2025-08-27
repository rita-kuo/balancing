import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";

const CalculateResult = () => {
  const { setValue } = useFormContext();
  const value = useWatch();

  const weight = useMemo(
    () => parseFloat((value.weight ?? 0).toString()),
    [value.weight],
  );
  const rer = useMemo(() => Math.pow(weight, 0.75), [weight]);

  const calorieReq = useMemo(
    () => Math.round(70 * rer * (value.der ?? 0)),
    [rer, value.der],
  );
  const waterReq = useWatch({ name: "waterReq" });

  useEffect(() => setValue("waterReq", Math.round(60 * weight)), [weight]);
  useEffect(() => setValue("calorieReq", calorieReq), [setValue, calorieReq]);

  return (
    <>
      <div>
        <h3>貓咪一日熱量所需</h3>
        <p>
          = 70 X 體重 <sup>0.75</sup> X DER
        </p>
        <p>
          = 70 X {rer.toFixed(2)} X {value.der}
        </p>
        <p>= {calorieReq} 大卡</p>
      </div>
      <div>
        <h3>貓咪一日建議水量</h3>
        <p>= 60 * 體重</p>
        <p>= 60 * {weight}</p>
        <p>= {waterReq} ml</p>
      </div>
    </>
  );
};

export default CalculateResult;
