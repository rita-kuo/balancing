import CreateButton from './CreateButton';
import GroupList from './GroupList';

export default async function Page() {
    return (
        <div className='[&>*+*]:mt-3'>
            <CreateButton />
            <GroupList />
        </div>
    );
}
