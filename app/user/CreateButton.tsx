'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useModal } from '../_hook/useModal';
import Button from '../_component/button/Button';
import Modal, { ModalProps } from '../_component/modal/Modal';
import { IoAdd } from '@/app/_lib/icons';
import { post } from '@/app/_util/api';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import TextInput from '../_component/input/TextInput';

const createUser = '新增使用者';

const CreateModal: React.FC<ModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
    } as User);

    const valid = useMemo(() => user.name && user.email, [user]);
    const { close } = useModal();

    const router = useRouter();

    return (
        <Modal {...props}>
            <div className='[&>*+*]:mt-2 w-full'>
                <h1>{createUser}</h1>
                <div>
                    <div>名稱</div>
                    <TextInput
                        value={user.name}
                        onChange={(name) => setUser({ ...user, name })}
                    />
                </div>
                <div>
                    <div>Email</div>
                    <TextInput
                        value={user.email}
                        onChange={(email) => setUser({ ...user, email })}
                    />
                </div>
                <Button
                    loading={loading}
                    disabled={!valid}
                    className='w-full justify-center'
                    onClick={() => {
                        setLoading(true);
                        post('/api/user', user)
                            .then((_) => {
                                close();
                                router.push(
                                    `/message?href=/user&message=新增成功`
                                );
                            })
                            .catch((err) => {
                                close();
                                router.push(
                                    `/message?href=/user&message=新增失敗${err}`
                                );
                            });
                    }}
                >
                    新增
                </Button>
            </div>
        </Modal>
    );
};

const CreateButton: React.FC = (_) => {
    const { open, close } = useModal();
    return (
        <Button
            className='ml-auto'
            onClick={() => open(<CreateModal onClose={close} />)}
            icon={IoAdd}
        >
            {createUser}
        </Button>
    );
};

export default CreateButton;
