import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Data Deletion Policy',
  description:
    'How to request deletion of personal information collected or processed by Emote Technology through our website, services, and communication channels.',
  openGraph: {
    title: 'Data Deletion Policy — Emote Technology',
    description:
      'Request deletion of personal information held by Emote Technology. How to submit a request, what happens next, and what we may need to retain.',
    url: 'https://emotetechnology.in/data-deletion',
  },
  alternates: { canonical: 'https://emotetechnology.in/data-deletion' },
};

const sections: LegalSection[] = [
  {
    heading: 'About Emote Technology',
    blocks: [
      { type: 'p', text: `Emote Technology is a digital marketing and technology agency providing services including website development, digital marketing, social media management, SEO, paid advertising, branding, content creation, and related technology services.` },
      { type: 'p', text: `This policy applies to personal information collected through:` },
      { type: 'list', items: [
        `emotetechnology.in`,
        `Website enquiry and contact forms`,
        `Email communications`,
        `Phone and WhatsApp communications`,
        `Social media interactions`,
        `Client onboarding and service communications`,
        `Other legitimate business interactions with Emote Technology`,
      ] },
    ],
  },
  {
    heading: 'Your Right to Request Deletion',
    blocks: [
      { type: 'p', text: `You may request deletion of personal information that Emote Technology holds about you, subject to applicable law and legitimate business or legal requirements.` },
      { type: 'p', text: `A deletion request may include information such as:` },
      { type: 'list', items: [
        `Name`,
        `Email address`,
        `Phone number`,
        `WhatsApp number`,
        `Enquiry information`,
        `Communication records`,
        `Account or customer information`,
        `Other personal information associated with your interaction with Emote Technology`,
      ] },
    ],
  },
  {
    heading: 'How to Request Data Deletion',
    blocks: [
      { type: 'p', text: `To request deletion of your personal information, contact us at:` },
      { type: 'contact', lines: [
        `Emote Technology`,
        `Email: info@emotetechnology.in`,
        `Phone: 7061029937`,
        `Website: emotetechnology.in`,
      ] },
      { type: 'p', text: `Please use the subject line: “Data Deletion Request”.` },
      { type: 'p', text: `To help us identify the correct information, your request should preferably include:` },
      { type: 'list', items: [
        `Your full name`,
        `Email address or phone number previously used to contact us`,
        `Company/business name, if applicable`,
        `A brief description of the information you want deleted`,
      ] },
      { type: 'p', text: `We may request reasonable information to verify your identity before processing a deletion request. This is intended to prevent unauthorised deletion of another person's information.` },
    ],
  },
  {
    heading: 'What Happens After a Deletion Request',
    blocks: [
      { type: 'p', text: `After receiving a valid request, Emote Technology will review the request and determine which information can be deleted under applicable law.` },
      { type: 'p', text: `Where deletion is appropriate, we will take reasonable steps to:` },
      { type: 'steps', items: [
        `Identify the relevant personal information.`,
        `Delete or anonymise the information from systems under our control where applicable.`,
        `Review relevant service providers where appropriate.`,
        `Retain only information that we are legally permitted or required to retain.`,
      ] },
      { type: 'p', text: `We will communicate with you if additional information is required to process the request.` },
    ],
  },
  {
    heading: 'Information We May Need to Retain',
    blocks: [
      { type: 'p', text: `A deletion request does not necessarily require us to delete every record.` },
      { type: 'p', text: `We may retain certain information where reasonably necessary or legally required, including information needed for:` },
      { type: 'list', items: [
        `Compliance with applicable laws`,
        `Tax and accounting records`,
        `Invoicing and payment records`,
        `Prevention and investigation of fraud`,
        `Cybersecurity and abuse prevention`,
        `Resolution of disputes`,
        `Enforcement of contracts`,
        `Establishment, exercise, or defence of legal claims`,
        `Other legitimate legal or regulatory purposes`,
      ] },
      { type: 'p', text: `Where information is retained for one of these purposes, we will seek to limit its use to the relevant purpose.` },
    ],
  },
  {
    heading: 'Third-Party Platforms',
    blocks: [
      { type: 'p', text: `Emote Technology may use third-party platforms for website hosting, analytics, advertising, CRM, communication, payment processing, and other business functions.` },
      { type: 'p', text: `Examples may include Google, Meta, LinkedIn, Microsoft, hosting providers, CRM platforms, email providers, and other technology services.` },
      { type: 'p', text: `If your information has been processed directly by a third-party platform, that platform may have its own procedures for data deletion.` },
      { type: 'p', text: `You may need to submit a separate deletion request directly to the relevant third party where Emote Technology does not control the information.` },
    ],
  },
  {
    heading: 'Client and Campaign Data',
    blocks: [
      { type: 'p', text: `If you are or have been a client of Emote Technology, information may have been processed as part of providing digital marketing or technology services.` },
      { type: 'p', text: `This may include:` },
      { type: 'list', items: [
        `Website information`,
        `Social media information`,
        `Advertising campaign information`,
        `Lead information`,
        `Analytics information`,
        `Marketing data`,
        `Customer information supplied by the client`,
      ] },
      { type: 'p', text: `Where Emote Technology processes personal information on behalf of a client, deletion may be subject to the client's instructions, contractual obligations, applicable law, and the technical capabilities of the relevant systems.` },
      { type: 'p', text: `If the information belongs to a client or was provided to Emote Technology by a client, you may also need to direct your request to that organisation.` },
    ],
  },
  {
    heading: 'Backups',
    blocks: [
      { type: 'p', text: `Some information may remain temporarily within secure backups or archival systems after deletion from active systems.` },
      { type: 'p', text: `Where this occurs, the information will be protected and will not ordinarily be used for ongoing business purposes. It may be permanently removed as the relevant backup systems are securely overwritten or deleted according to applicable retention practices.` },
    ],
  },
  {
    heading: 'Marketing and Communication Preferences',
    blocks: [
      { type: 'p', text: `You may request that Emote Technology stop using your information for promotional communications.` },
      { type: 'p', text: `You may also unsubscribe from marketing communications using an available unsubscribe mechanism or by contacting us directly.` },
      { type: 'p', text: `Stopping promotional communications does not necessarily delete information that we are required or permitted to retain for other legitimate purposes.` },
    ],
  },
  {
    heading: 'Deletion of Website or Social Media Information',
    blocks: [
      { type: 'p', text: `If you have submitted information through an Emote Technology website form, social media page, advertising form, or another digital channel managed by us, you may contact us to request deletion.` },
      { type: 'p', text: `Where the information is controlled by the relevant platform rather than Emote Technology, we may direct you to the platform's own deletion process.` },
    ],
  },
  {
    heading: 'Processing of Requests',
    blocks: [
      { type: 'p', text: `Emote Technology will handle data deletion requests in accordance with applicable privacy and data-protection requirements.` },
      { type: 'p', text: `If we cannot fulfil a request in whole or in part, we will explain the applicable reason where legally appropriate.` },
    ],
  },
  {
    heading: 'No Fee for Ordinary Requests',
    blocks: [
      { type: 'p', text: `Emote Technology does not ordinarily charge a fee for a genuine data deletion request.` },
      { type: 'p', text: `Where applicable law permits reasonable charges for excessive, repetitive, or manifestly unfounded requests, such requests may be handled in accordance with the law.` },
    ],
  },
  {
    heading: 'Privacy Questions and Grievances',
    blocks: [
      { type: 'p', text: `For questions, concerns, or grievances relating to your personal information or this Data Deletion Policy, contact:` },
      { type: 'contact', lines: [
        `Emote Technology`,
        `Email: info@emotetechnology.in`,
        `Phone: 7061029937`,
        `Website: emotetechnology.in`,
        `DSS-15, Trishala City Road, Behind Gopal Sweets, Zirakpur, Punjab, 140603`,
      ] },
    ],
  },
  {
    heading: 'Changes to This Policy',
    blocks: [
      { type: 'p', text: `Emote Technology may update this Data Deletion Policy from time to time to reflect changes in our services, technology, data-processing practices, or applicable legal requirements.` },
      { type: 'p', text: `The latest version will be published on this page with an updated “Last Updated” date.` },
    ],
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPage
      chip="data deletion policy"
      title="Your data, deleted on"
      highlight="request"
      effectiveDate="27 August 2026"
      lastUpdated="27 August 2026"
      intro={[
        `At Emote Technology, we respect your right to control your personal information. This Data Deletion Policy explains how you can request deletion of personal information collected or processed by Emote Technology through our website, services, communication channels, or other business interactions.`,
      ]}
      sections={sections}
    />
  );
}
