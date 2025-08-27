import SelectField from "@/app/_component/form/field/SelectField";

const derOptions = [
  {
    title: "4 個月以下",
    value: 2.5,
  },
  {
    title: "4 個月到 1 歲",
    value: 2,
  },
  {
    title: "1~7 歲已結紮",
    value: 1.3,
  },
  {
    title: "1~7 歲未結紮",
    value: 1.5,
  },
  {
    title: "7~11 歲",
    value: 1.25,
  },
  {
    title: "11 歲以上",
    value: 1.35,
  },
  {
    title: "減肥成貓",
    value: 0.9,
  },
  {
    title: "久坐不動的成貓",
    value: 1,
  },
  {
    title: "過瘦成貓",
    value: 1.5,
  },
  {
    title: "懷孕的貓",
    value: 1.8,
  },
  {
    title: "哺乳期的貓",
    value: 4,
  },
  {
    title: "生病的成貓",
    value: 1,
  },
];

const DerSelect = () => {
  return (
    <SelectField options={derOptions} name="der" label="貓咪狀態" required />
  );
};

export default DerSelect;
