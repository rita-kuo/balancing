'use client';

import React, { useMemo, useState } from 'react';
import { useModal } from '../_hook/useModal';
import { Group } from '@/app/_model/group';
import Button from '../_component/button/Button';
import Modal, { ModalProps } from '../_component/modal/Modal';
import { IoAdd } from '@/app/_lib/icons';
import { post } from '@/app/_util/api';
import { useRouter } from 'next/navigation';
import TextInput from '../_component/input/TextInput';

const createGroup = '新增群組';

const CreateModal: React.FC<ModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState<Group>({
        name: '',
    } as Group);
    const valid = useMemo(() => group.name, [group]);
    const { close } = useModal();

    const router = useRouter();

    return (
        <Modal {...props}>
            <div className='[&>*+*]:mt-2 w-full'>
                <h1>{createGroup}</h1>
                <div>
                    <div>名稱</div>
                    <TextInput
                        value={group.name}
                        onChange={(name) => setGroup({ ...group, name })}
                    />
                </div>
                <Button
                    loading={loading}
                    disabled={!valid}
                    className='w-full justify-center'
                    onClick={() => {
                        setLoading(true);
                        post('/api/group', group)
                            .then((_) => {
                                close();
                                router.push(
                                    `/message?href=/group&message=新增成功`
                                );
                            })
                            .catch((err) => {
                                close();
                                router.push(
                                    `/message?href=/group&message=新增失敗${err}`
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
            {createGroup}
        </Button>
    );
};

export default CreateButton;
