'use client';

import Button from '@/app/_component/button/Button';
import { useModal } from '@/app/_hook/useModal';
import Modal, { ModalProps } from '@/app/_component/modal/Modal';
import { get, post } from '@/app/_util/api';
import { User } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Select, { SelectOption } from '@/app/_component/input/Select';
import { useRouter } from 'next/navigation';

const addMember = '新增成員';

const AddMemberModal: React.FC<ModalProps & { groupId: number }> = (props) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>();
    const options = useMemo(
        () =>
            users?.map(
                (user) =>
                    ({
                        title: user.name,
                        value: user.id.toString(),
                        item: user,
                    } as SelectOption<User>)
            ) || [],
        [users]
    );

    const [toAdd, setToAdd] = useState<SelectOption<User>>();

    const { close } = useModal();
    const router = useRouter();

    const onAdd = useCallback(() => {
        setLoading(true);
        post(`/api/group/${props.groupId}/member`, {
            id: toAdd?.item?.id,
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
    }, [toAdd, props.groupId, router, close]);

    useEffect(() => {
        get(`/api/user?notInGroup=${props.groupId}`).then(setUsers);
    }, [props.groupId]);

    return (
        <Modal {...props} closeWhenClickOutside={!options.length}>
            <div className='[&>*+*]:mt-4 w-full'>
                <h1>{addMember}</h1>
                {options.length ? (
                    <>
                        <Select
                            select={toAdd?.value}
                            options={options}
                            className='w-full p-4'
                            onChange={setToAdd}
                        />
                        <Button
                            loading={loading}
                            disabled={!toAdd}
                            className='w-full justify-center'
                            onClick={onAdd}
                        >
                            新增
                        </Button>
                    </>
                ) : (
                    <div>沒有可以新增的使用者</div>
                )}
            </div>
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
