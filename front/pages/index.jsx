import { Layout } from "@/components/Layout";
import { HeadCard } from "@/components/Home/HeadCard";
import { BottomSection } from "@/components/Home/BottomSection";

export default function Home() {
  return (
    <Layout>
      <HeadCard />
      <BottomSection />
    </Layout>
  );
}
