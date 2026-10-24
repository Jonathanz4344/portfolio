import { FileText, Send } from 'lucide-react';
import { Button, CTABand } from '@/components/kit';
import { useContact } from '@/components/Contact/ContactDialogs';

/** The closing call to action above the footer: one decision, two ways to make it. */
const ContactBand = () => {
  const { openMessage, openResume } = useContact();

  return (
    <CTABand
      className="contact-band"
      eyebrow="Open to opportunities"
      title="Let's build software that actually gets used."
      actions={
        <>
          <Button variant="primary" size="lg" magnetic icon={<Send size={18} />} onClick={() => openMessage('sidebar')}>
            Send Message
          </Button>
          <Button variant="secondary" size="lg" icon={<FileText size={18} />} onClick={() => openResume('sidebar')}>
            View Resume
          </Button>
        </>
      }
    />
  );
};

export default ContactBand;
