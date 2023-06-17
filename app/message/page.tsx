import { PageProps } from '../_lib/next-type';
import Href from './Href';

export default async function Page(props: PageProps) {
    const href = props.searchParams.href as string;
    const message = props.searchParams.message as string;
    return (
        <div className='m-auto w-max pt-[30vh] text-2xl font-bold'>
            {message}
            <Href href={href} />
        </div>
    );
}
