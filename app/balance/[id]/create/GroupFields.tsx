import React from 'react';

import { useMemo } from 'react';
import { User } from '@prisma/client';
import SelectField from '@/app/_component/form/field/SelectField';
import CheckboxMultiSelect from '@/app/_component/form/input/CheckboxMultiSelect';
import { ErrorMessage } from '@hookform/error-message';
import ErrorMessageLayout from '@/app/_component/form/ErrorMessageLayout';
import Title from '@/app/_component/form/field/Title';

interface GroupFieldsProps {
    groupMembers: User[];
    payById: number;
    setPayById: (value: number) => void;
}
const GroupFields: React.FC<GroupFieldsProps> = (props) => {
    const memberOptions = useMemo(
        () =>
            props.groupMembers?.map((member) => ({
                title: member.name,
                value: member.id,
            })) || [],
        [props.groupMembers]
    );

    return (
        <>
            <SelectField
                options={memberOptions}
                name='payById'
                label='支付者'
                option={{ valueAsNumber: true }}
            />
            <div className='flex gap-4'>
                <Title required className='mb-auto' label='應支付者' />
                <CheckboxMultiSelect
                    name='shouldPayList'
                    options={memberOptions}
                    registerOption={{
                        validate: {
                            minLength: (val) =>
                                val.length > 0 || '至少要有一位應支付者',
                        },
                    }}
                />
            </div>
            <ErrorMessage name='shouldPayList' as={<ErrorMessageLayout />} />
        </>
    );
};

export default GroupFields;
