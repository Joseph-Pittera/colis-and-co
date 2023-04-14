import { Layout } from '@/components/Layout';
import { HeadCard } from '@/components/Home/HeadCard';
import { BottomSection } from '@/components/Home/BottomSection';
import { CookiesModal } from '@/components/Home/CookiesModal';

export default function Home() {
  return (
    <Layout>
      <HeadCard />
      <BottomSection />
      <CookiesModal />
    </Layout>
  );
}
