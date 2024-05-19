import { FaqAccordion } from '@/components/FAQComponents/FaqAccordion/FaqAccordion';
import FaqWithHeader from '@/components/FAQComponents/FAQPageHeader/FaqWithHeader';

const FAQPage = () => {
  return (
    <>
      <FaqWithHeader />
      <FaqAccordion />
    </>
  );
};

export default FAQPage;
