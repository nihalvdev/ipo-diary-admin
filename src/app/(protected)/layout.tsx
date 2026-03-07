import VerticalLayout from '@/components/layout/vertical/VerticalLayout';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <VerticalLayout>
            {children}
        </VerticalLayout>
    );
}
