'use client';

import React from 'react';

import { Group as Model } from '@/app/_model/group';
import Link from 'next/link';
import ListItemContainer from '../_component/container/ListItemContainer';
import { useEffect, useState } from 'react';
import { get } from '../_util/api';

type GroupProps = Pick<Model, 'id' | 'name' | 'members'>;
const Group: React.FC<GroupProps> = (props) => {
    return (
        <div>
            <Link href={`/group/${props.id}`}>
                <ListItemContainer hoverStyle>
                    <div className='font-bold text-xl'>{props.name}</div>
                    <div className='text-sm'>
                        {props.members.map((member) => member.name).join(', ')}
                    </div>
                </ListItemContainer>
            </Link>
        </div>
    );
};

const GroupList: React.FC = (_) => {
    const [groups, setGroups] = useState<GroupProps[]>([]);

    useEffect(() => {
        get('/api/group').then(setGroups);
    }, []);

    return (
        <>
            {groups.map((group) => (
                <Group key={`group-${group.id}`} {...group} />
            ))}
        </>
    );
};

export default GroupList;
