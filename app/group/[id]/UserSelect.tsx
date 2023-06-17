import React from 'react';

import SubmitButton from '@/app/_component/form/SubmitButton';
import SelectComponent, {
    SelectOption,
} from '@/app/_component/form/input/component/SelectComponent';
import { get } from '@/app/_util/api';
import { User } from '@prisma/client';
import { useState, useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const UserSelect: React.FC<{ groupId: number }> = (props) => {
    const { register } = useFormContext();

    const [users, setUsers] = useState<User[]>();
    const options = useMemo(
        () =>
            users?.map(
                (user) =>
                    ({
                        title: user.name,
                        value: user,
                    } as SelectOption<User>)
            ) || [],
        [users]
    );

    const registeredProps = useMemo(
        () =>
            register('user', {
                value: options[0],
                setValueAs: (val) => JSON.parse(val) as User,
            }),
        [register, options]
    );

    useEffect(() => {
        get(`/api/user?notInGroup=${props.groupId}`).then(setUsers);
    }, [props.groupId]);

    return options.length ? (
        <>
            <SelectComponent
                options={options}
                className='w-full p-4'
                {...registeredProps}
            />
            <SubmitButton className='w-full justify-center'>新增</SubmitButton>
        </>
    ) : (
        <div>沒有可以新增的使用者</div>
    );
};

export default UserSelect;
