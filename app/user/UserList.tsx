'use client';

import useLocalStorage from '../_hook/useLocalStorage';
import Button from '../_component/button/Button';
import { IoCheckmark } from '../_lib/icons';
import React, { useCallback, useEffect, useState } from 'react';
import ListItemContainer from '../_component/container/ListItemContainer';
import { User } from '@prisma/client';
import { get } from '../_util/api';

const UserItem: React.FC<
    Pick<User, 'id' | 'name' | 'email'> & {
        isCurrentUser: boolean;
        setAsCurrentUser: () => void;
    }
> = (props) => {
    return (
        <ListItemContainer className='flex justify-between items-center'>
            <div>
                <div className='font-bold'>{props.name}</div>
                <div>{props.email}</div>
            </div>
            {props.isCurrentUser ? (
                <IoCheckmark className='h-8 w-auto text-green-500' />
            ) : (
                <Button
                    className='h-max'
                    onClick={() => props.setAsCurrentUser()}
                >
                    使用
                </Button>
            )}
        </ListItemContainer>
    );
};

const UserList: React.FC = () => {
    const localStorage = useLocalStorage();

    const [users, setUsers] = useState<User[]>([]);

    const [currentUserId, setCurrentUserId] = useState(
        parseInt(localStorage.get('userId') || '') || undefined
    );

    const onChangeUser = useCallback(
        (userId: number) => {
            setCurrentUserId(userId);
            localStorage.set('userId', userId);
        },
        [setCurrentUserId, localStorage]
    );

    useEffect(() => {
        get('/api/user').then(setUsers);
    }, []);

    return (
        <>
            {users.map((user) => (
                <UserItem
                    key={`user-${user.id}`}
                    {...user}
                    isCurrentUser={user.id === currentUserId}
                    setAsCurrentUser={() => onChangeUser(user.id)}
                />
            ))}
        </>
    );
};

export default UserList;
