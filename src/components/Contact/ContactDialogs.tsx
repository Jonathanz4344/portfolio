'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, Download, FileText, Send, X } from 'lucide-react';
import { Dialog } from '@/components/kit';
import './ContactDialogs.css';

/**
 * The message and resume dialogs. The Hero menu and the library sidebar each had their own copy of
 * these, with their own wording, field ids and close behavior; both versions are kept as variants.
 */
type Variant = 'hero' | 'sidebar';

interface ContactContextValue {
  openMessage: (variant: Variant) => void;
  openResume: (variant: Variant) => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) throw new Error('useContact must be used inside ContactProvider');
  return context;
};

const RESUME = '/Jonathan_Zhu_Resume.pdf';

export function ContactProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<Variant | null>(null);
  const [resume, setResume] = useState<Variant | null>(null);

  const openMessage = useCallback((variant: Variant) => setMessage(variant), []);
  const openResume = useCallback((variant: Variant) => setResume(variant), []);
  const value = useMemo(() => ({ openMessage, openResume }), [openMessage, openResume]);
  const closeMessage = useCallback(() => setMessage(null), []);

  return (
    <ContactContext.Provider value={value}>
      {children}
      {/* The Hero's form stays mounted so a half-written message survives closing, as before */}
      <MessageDialog variant="hero" open={message === 'hero'} onClose={closeMessage} />
      {message === 'sidebar' && <MessageDialog variant="sidebar" open onClose={closeMessage} />}
      {resume && <ResumeDialog variant={resume} onClose={() => setResume(null)} />}
    </ContactContext.Provider>
  );
}

const messageCopy = {
  hero: {
    emailId: 'sender-email',
    messageId: 'message',
    placeholder: 'Write your message here...',
    rows: 5,
  },
  sidebar: {
    emailId: 'sidebar-sender-email',
    messageId: 'sidebar-message',
    placeholder: "Hi Jonathan, I'd like to discuss...",
    rows: 4,
  },
} as const;

function MessageDialog({ variant, open, onClose }: { variant: Variant; open: boolean; onClose: () => void }) {
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const copy = messageCopy[variant];
  const successButtonRef = useRef<HTMLButtonElement>(null);

  // After a successful send, focus lands on the confirmation's button, which carries the message as its description
  useEffect(() => {
    if (sendStatus === 'success') successButtonRef.current?.focus();
  }, [sendStatus]);

  const reset = () => {
    setSendStatus('idle');
    setSenderEmail('');
    setMessage('');
  };

  return (
    <Dialog open={open} onClose={onClose} labelledBy={`${variant}-message-title`} size="sm" className="contact-dialog">
      <div className="message-modal-header">
        <h3 id={`${variant}-message-title`}>Send a Message</h3>
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close"
          onClick={() => {
            onClose();
            setSendStatus('idle');
          }}
        >
          <X size={20} />
        </button>
      </div>

      {sendStatus === 'success' ? (
        <div className="message-success" role="status">
          <span className="success-icon" aria-hidden="true">
            <Check size={26} strokeWidth={2.5} />
          </span>
          {variant === 'hero' ? (
            <>
              <p id="hero-message-sent">Message sent successfully!</p>
              <button
                ref={successButtonRef}
                aria-describedby="hero-message-sent"
                type="button"
                className="btn btn-primary btn-md modal-done-btn"
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Done
              </button>
            </>
          ) : (
            <>
              <h4 id="sidebar-message-sent">Message Sent!</h4>
              <p id="sidebar-message-thanks">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              <button
                ref={successButtonRef}
                aria-describedby="sidebar-message-sent sidebar-message-thanks"
                type="button"
                className="btn btn-secondary btn-md close-success-btn"
                onClick={onClose}
              >
                Close
              </button>
            </>
          )}
        </div>
      ) : (
        <form
          className="message-form"
          onSubmit={async (e) => {
            e.preventDefault();
            // The button stays enabled while sending so keyboard focus is not thrown to the page
            if (isSending) return;
            setIsSending(true);
            try {
              const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: senderEmail,
                  message: message,
                }),
              });
              setSendStatus(response.ok ? 'success' : 'error');
            } catch {
              setSendStatus('error');
            }
            setIsSending(false);
          }}
        >
          <div className="form-group">
            <label htmlFor={copy.emailId}>Your Email</label>
            <input
              type="email"
              id={copy.emailId}
              className="control"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={copy.messageId}>Message</label>
            <textarea
              id={copy.messageId}
              className="control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.placeholder}
              rows={copy.rows}
              required
            />
          </div>
          {sendStatus === 'error' && (
            <p className="error-message" role="alert">
              Failed to send. Please try again.
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-lg send-message-btn" aria-disabled={isSending || undefined}>
            {isSending ? (
              'Sending...'
            ) : variant === 'hero' ? (
              <>
                <Send size={18} />
                <span>Send Message</span>
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </Dialog>
  );
}

function ResumeDialog({ variant, onClose }: { variant: Variant; onClose: () => void }) {
  return (
    <Dialog open onClose={onClose} labelledBy="resume-dialog-title" size="xl" sheet className="contact-dialog resume-dialog">
      <div className="resume-modal-header">
        <h3 id="resume-dialog-title">Resume</h3>
        <div className="resume-modal-actions">
          <a href={RESUME} download="Jonathan_Zhu_Resume.pdf" className="btn btn-secondary btn-sm resume-download-btn">
            <Download size={16} />
            <span>Download</span>
          </a>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="resume-modal-content">
        <object data={`${RESUME}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" className="resume-iframe" aria-label="Resume">
          {variant === 'hero' ? (
            <div className="resume-fallback">
              <FileText size={40} />
              <p>This browser can&apos;t preview PDFs inline.</p>
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md resume-download-btn">
                Open Resume
              </a>
            </div>
          ) : (
            <img src="/Jonathan_Zhu_Resume.png" alt="Jonathan Zhu Resume" className="resume-image" />
          )}
        </object>
      </div>
    </Dialog>
  );
}
