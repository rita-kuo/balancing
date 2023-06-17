'use client';

import Button from '@/app/_component/button/Button';
import { useModal } from '@/app/_hook/useModal';
import Modal, { ModalProps } from '@/app/_component/modal/Modal';
import { post } from '@/app/_util/api';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/app/_component/form/Form';
import { FieldValues } from 'react-hook-form';
import UserSelect from './UserSelect';

const addMember = '新增成員';

const AddMemberModal: React.FC<ModalProps & { groupId: number }> = (props) => {
    const { close } = useModal();
    const router = useRouter();

    const onAdd = useCallback(
        async (data: FieldValues) => {
            await post(`/api/group/${props.groupId}/member`, {
                id: data.user.id,
            })
                .then((_) => {
                    close();
                    router.push(
                        `/message?href=/group/${props.groupId}&message=新增成功`
                    );
                })
                .catch((err) => {
                    close();
                    router.push(
                        `/message?href=/group/${props.groupId}&message=新增失敗${err}`
                    );
                });
        },
        [props.groupId, router, close]
    );

    return (
        <Modal {...props} closeWhenClickOutside>
            <Form className='w-full' onSubmit={onAdd}>
                <h1>{addMember}</h1>
                <UserSelect groupId={props.groupId} />
            </Form>
        </Modal>
    );
};

const AddMemberButton: React.FC<{ groupId: number }> = (props) => {
    const { open, close } = useModal();
    return (
        <Button
            onClick={() => open(<AddMemberModal {...props} onClose={close} />)}
        >
            {addMember}
        </Button>
    );
};

export default AddMemberButton;
