import groupService from '../service';
import AddMemberButton from './AddMember';
import { IoPerson } from '@/app/_lib/icons';
import CreateBalaceButton from '@/app/_component/britad/balance/CreateButton';
import { PageProps } from '@/app/_lib/next-type';
import Members from './MemberList';
import BalanceList from './BalanceList';

export default async function Page(props: PageProps) {
    const groupId = Number.parseInt(props.params?.id);
    const group = await groupService().getGroupById(groupId);
    return (
        <div className='[&>*+*]:mt-5'>
            <div className='flex gap-4 items-end'>
                <div className='flex-1 font-bold text-3xl'>{group?.name}</div>
                <div className='flex items-center'>
                    <IoPerson className='mr-1' />
                    {group?.members.length}
                </div>
                <AddMemberButton groupId={groupId} />
            </div>
            <div className='w-full flex h-28 overflow-auto [&>*+*]:ml-4'>
                <Members groupId={groupId} />
            </div>
            <div className='border-t' />
            <div className='flex items-end'>
                <div className='text-2xl font-bold'>收支表</div>
                <CreateBalaceButton ownerType='GROUP' ownerId={groupId} />
            </div>
            <div>
                <BalanceList groupId={groupId} />
            </div>
        </div>
    );
}
