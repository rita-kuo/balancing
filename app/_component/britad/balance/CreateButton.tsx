'use client';

import { useModal } from '@/app/_hook/useModal';
import Button from '../../button/Button';
import Modal, { ModalProps } from '../../modal/Modal';
import { useCallback, useMemo, useState } from 'react';
import { Balance, OwnerType } from '@prisma/client';
import { post } from '@/app/_util/api';
import { useRouter } from 'next/navigation';
import TextInput from '../../input/TextInput';
import CurrencySelect from './CurrencySelect';

type BalaceProps = {
    ownerId: number;
    ownerType: OwnerType;
};

const createBalance = '新增收支表';
type CreateModalProps = ModalProps & BalaceProps;

const CreateModal: React.FC<CreateModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<Balance>({
        name: '',
        start: new Date(Date.now()),
        end: null,
        currency: 'TWD',
        ownerType: props.ownerType,
        ownerId: props.ownerId,
    } as Balance);

    const valid = useMemo(() => balance.name && balance.currency, [balance]);

    const { close } = useModal();
    const router = useRouter();

    const onCreate = useCallback(() => {
        setLoading(true);
        post(`/api/balance`, balance)
            .then((_) => {
                close();
                router.push(
                    `/message?href=/group/${props.ownerId}&message=新增成功`
                );
            })
            .catch((err) => {
                close();
                router.push(
                    `/message?href=/group/${props.ownerId}&message=新增失敗${err}`
                );
            });
    }, [balance, router, close, props.ownerId]);

    return (
        <Modal {...props}>
            <div className='[&>*+*]:mt-2 w-full]'>
                <h1>{createBalance}</h1>
                <div>
                    <div>名稱</div>
                    <TextInput
                        value={balance.name}
                        onChange={(name) => setBalance({ ...balance, name })}
                    />
                </div>
                <div className='flex gap-2'>
                    <div>預設幣別</div>
                    <CurrencySelect
                        value={balance.currency}
                        onChange={(currency) =>
                            setBalance({ ...balance, currency })
                        }
                    />
                </div>
                <Button
                    loading={loading}
                    disabled={!valid}
                    className='w-full justify-center'
                    onClick={onCreate}
                >
                    新增
                </Button>
            </div>
        </Modal>
    );
};

const CreateBalaceButton: React.FC<BalaceProps> = (props) => {
    const { open, close } = useModal();
    return (
        <Button
            className='ml-auto'
            onClick={() => open(<CreateModal {...props} onClose={close} />)}
        >
            {createBalance}
        </Button>
    );
};

export default CreateBalaceButton;
