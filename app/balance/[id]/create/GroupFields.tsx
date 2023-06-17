import Checkbox from '@/app/_component/input/Checkbox';
import Select from '@/app/_component/input/Select';
import detail from '../DetailList';
import { Field, Title } from './CreateForm';
import { Dispatch, useMemo } from 'react';
import { ShouldPay, User } from '@prisma/client';

interface GroupFieldsProps {
    groupMembers: User[];
    payById: number;
    setPayById: (value: number) => void;
    shouldPayList: Set<User>;
    setShouldPayList: Dispatch<React.SetStateAction<Set<User>>>;
}
const GroupFields: React.FC<GroupFieldsProps> = (props) => {
    const allShouldPay = useMemo(
        () =>
            !props.groupMembers.some(
                (member) => !props.shouldPayList.has(member)
            ),
        [props.groupMembers, props.shouldPayList]
    );

    const memberOptions = useMemo(
        () =>
            props.groupMembers?.map((member) => ({
                title: member.name,
                value: member.id.toString(),
            })) || [],
        [props.groupMembers]
    );

    return (
        <>
            <Field>
                <Title>支付者</Title>
                <Select
                    options={memberOptions}
                    select={props.payById.toString()}
                    onChange={(option) =>
                        props.setPayById(
                            (option && Number.parseInt(option.value)) || 0
                        )
                    }
                />
            </Field>
            <Field>
                <Title className='mb-auto'>應支付者</Title>
                <div>
                    <Checkbox
                        title={allShouldPay ? '取消選取全部' : '選取全部'}
                        value={allShouldPay}
                        onChange={(value) =>
                            props.setShouldPayList(
                                new Set(value ? props.groupMembers || [] : [])
                            )
                        }
                    />
                    {props.groupMembers.map((member) => (
                        <Checkbox
                            key={`member-${member.id}`}
                            title={member.name}
                            value={props.shouldPayList.has(member)}
                            onChange={(select) =>
                                props.setShouldPayList((origin) => {
                                    if (select) origin.add(member);
                                    else origin.delete(member);
                                    return new Set(origin);
                                })
                            }
                        />
                    ))}
                </div>
            </Field>
        </>
    );
};

export default GroupFields;
