'use client';

import React, { useCallback } from 'react';
import { useModal } from '../_hook/useModal';
import Button from '../_component/button/Button';
import Modal, { ModalProps } from '../_component/modal/Modal';
import { IoAdd } from '@/app/_lib/icons';
import { post } from '@/app/_util/api';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { emailResisterOptions } from '../_constant/formRegisterOptions';
import Form from '../_component/form/Form';
import SubmitButton from '../_component/form/SubmitButton';
import { InputField } from '../_component/form/field/InputField';

const createUser = '新增使用者';

const CreateModal: React.FC<ModalProps> = (props) => {
    const { close } = useModal();
    const router = useRouter();

    const onSubmit = useCallback(
        async (data: FieldValues) => {
            await post('/api/user', data)
                .then((_) => {
                    close();
                    router.push(`/message?href=/user&message=新增成功`);
                })
                .catch((err) => {
                    close();
                    router.push(`/message?href=/user&message=新增失敗${err}`);
                });
        },
        [close, router]
    );

    return (
        <Modal closeWhenClickOutside {...props}>
            <Form className='[&>*+*]:mt-2 w-full' onSubmit={onSubmit}>
                <h1>{createUser}</h1>
                <InputField required label='名稱' name='name' />
                <InputField
                    required
                    label='Email'
                    name='email'
                    option={emailResisterOptions}
                />
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
            {createUser}
        </Button>
    );
};

export default CreateButton;
