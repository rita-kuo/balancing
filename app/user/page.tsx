import CreateButton from './CreateButton';
import UserList from './UserList';

export default async function Page() {
    return (
        <div className='[&>*+*]:mt-3'>
            <CreateButton />
            <UserList />
        </div>
    );
}
