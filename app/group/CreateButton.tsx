'use client';

import React from 'react';
import { useModal } from '../_hook/useModal';
import Button from '../_component/button/Button';
import Modal, { ModalProps } from '../_component/modal/Modal';
import { IoAdd } from '@/app/_lib/icons';
import { post } from '@/app/_util/api';
import { useRouter } from 'next/navigation';
import Form from '../_component/form/Form';
import { InputField } from '../_component/form/field/InputField';
import SubmitButton from '../_component/form/SubmitButton';
import { FieldValues } from 'react-hook-form';

const createGroup = '新增群組';

const CreateModal: React.FC<ModalProps> = (props) => {
    const { close } = useModal();

    const router = useRouter();

    const onSubmit = async (data: FieldValues) => {
        await post('/api/group', data)
            .then((_) => {
                close();
                router.push(`/message?href=/group&message=新增成功`);
            })
            .catch((err) => {
                close();
                router.push(`/message?href=/group&message=新增失敗${err}`);
            });
    };

    return (
        <Modal {...props}>
            <Form className='[&>*+*]:mt-2 w-full' onSubmit={onSubmit}>
                <h1>{createGroup}</h1>
                <InputField required label='名稱' name='name' />
                <SubmitButton className='w-full justify-center'>
                    新增
                </SubmitButton>
            </Form>
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
