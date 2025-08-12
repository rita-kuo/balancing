import React, { useMemo } from "react";

import SubmitButton from "@/app/_component/form/SubmitButton";
import SelectComponent, {
  SelectOption,
} from "@/app/_component/form/input/component/SelectComponent";
import { User } from "@prisma/client";
import { useFormContext } from "react-hook-form";

const UserSelect: React.FC<{
  groupId: number;
  addMemberOptions: User[];
}> = (props) => {
  const { register } = useFormContext();

  const options = useMemo(
    () =>
      props.addMemberOptions?.map(
        (user) =>
          ({
            title: user.name,
            value: user,
          }) as SelectOption<User>,
      ) || [],
    [props.addMemberOptions],
  );

  const registeredProps = useMemo(
    () =>
      register("user", {
        value: options[0],
        setValueAs: (val) => val as User,
      }),
    [register, options],
  );

  return options.length ? (
    <>
      <SelectComponent
        options={options}
        className="w-full p-4"
        {...registeredProps}
      />
      <SubmitButton className="w-full justify-center">新增</SubmitButton>
    </>
  ) : (
    <div>沒有可以新增的使用者</div>
  );
};

export default UserSelect;
