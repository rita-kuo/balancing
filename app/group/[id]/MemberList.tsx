'use client';

import { IoPersonCircle } from '@/app/_lib/icons';
import { get } from '@/app/_util/api';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

const Members: React.FC<{ groupId: number }> = (props) => {
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        get(`/api/group/${props.groupId}/member`).then(setMembers);
    }, [props.groupId]);

    return (
        <>
            {members.map((member) => (
                <div
                    key={`member-${member.id}`}
                    className='h-full w-28 grid grid-rows-[auto_max-content]'
                >
                    <IoPersonCircle className='h-full w-auto text-primary-700 m-auto' />
                    <div className='m-auto'>{member.name}</div>
                </div>
            ))}
        </>
    );
};

export default Members;
