import Layout from './_component/layout/Layout';
import './globals.css';

export const metadata = {
    title: 'Balancing | BritaD',
    description: 'BritaD Balancing Service',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className='text-primary-900'>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
