import { PageProps } from '@/app/_lib/next-type';
import Button from '@/app/_component/button/Button';
import DetailList from './DetailList';
import PageButtons from './PageButtons';
import BalanceService from '../service';
import Analysis from './Analysis';
import Seperator from '@/app/_component/Seperator';

export default async function Page(props: PageProps) {
    const page = parseInt(props.searchParams.page as string) || 1;
    const balanceId = Number.parseInt(props.params.id);
    const balance = await BalanceService().getBalanceById(balanceId);

    return (
        <div className='[&>*+*]:mt-4'>
            <div className='flex justify-between'>
                <div className='font-bold text-3xl'>{balance?.name}</div>
                <Button href={`balance/${balanceId}/create`}>新增</Button>
            </div>
            <Analysis balanceId={balanceId} />
            <Seperator />
            <div className='[&>*+*]:mt-2'>
                <div className='font-bold'>明細</div>
                <DetailList balanceId={balanceId} page={page} />
            </div>
            <PageButtons page={page} balanceId={balanceId} />
        </div>
    );
}
