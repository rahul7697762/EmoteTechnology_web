import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Emote Technology collects, uses, stores, shares, and protects information when you visit emotetechnology.in, contact us, or engage our services.',
  openGraph: {
    title: 'Privacy Policy — Emote Technology',
    description:
      'What we collect, why we collect it, who we share it with, how long we keep it, and the privacy rights available to you under applicable law.',
    url: 'https://emotetechnology.in/privacy-policy',
  },
  alternates: { canonical: 'https://emotetechnology.in/privacy-policy' },
};

const sections: LegalSection[] = [
  {
    heading: 'Information We Collect',
    blocks: [
      { type: 'p', text: `We may collect information that you voluntarily provide when you interact with Emote Technology.` },
      { type: 'sub', text: `1.1 Information You Provide` },
      { type: 'p', text: `When you contact us, request a quotation, submit an enquiry, communicate with our team, or become a client, we may collect:` },
      { type: 'list', items: [
        `Full name`,
        `Company or business name`,
        `Email address`,
        `Phone number`,
        `WhatsApp number`,
        `Business address`,
        `Website URL`,
        `Social media profile or business-page information`,
        `Information about your business`,
        `Your digital marketing or technology requirements`,
        `Project requirements and communications`,
        `Billing and transaction information, where applicable`,
        `Any other information you voluntarily provide to us`,
      ] },
      { type: 'sub', text: `1.2 Information Collected Automatically` },
      { type: 'p', text: `When you visit our website, certain information may automatically be collected, such as:` },
      { type: 'list', items: [
        `IP address`,
        `Browser type`,
        `Device type`,
        `Operating system`,
        `Website pages visited`,
        `Date and time of visits`,
        `Referring website`,
        `Approximate geographic location`,
        `Website interaction data`,
        `Technical and performance information`,
      ] },
      { type: 'p', text: `This information may be collected through cookies, analytics tools, pixels, tags, log files, and similar technologies.` },
    ],
  },
  {
    heading: 'Why We Collect Your Information',
    blocks: [
      { type: 'p', text: `Emote Technology may process your information for the following purposes:` },
      { type: 'list', items: [
        `To respond to enquiries and messages`,
        `To provide quotations and proposals`,
        `To understand your business requirements`,
        `To communicate with prospective and existing clients`,
        `To provide our digital marketing and technology services`,
        `To develop, maintain, and manage websites`,
        `To manage social media and advertising campaigns`,
        `To perform SEO and digital marketing activities`,
        `To create marketing and advertising content`,
        `To process invoices and payments`,
        `To provide customer support`,
        `To improve our website and services`,
        `To understand website traffic and user behaviour`,
        `To measure advertising and marketing performance`,
        `To prevent fraud, abuse, spam, and security threats`,
        `To comply with applicable legal obligations`,
        `To protect our business, clients, systems, and legal interests`,
      ] },
      { type: 'p', text: `We aim to collect and process only information that is reasonably necessary for the relevant purpose.` },
      { type: 'p', text: `India's DPDP framework requires consent to be free, specific, informed, unconditional and unambiguous where consent is the basis for processing, and requires information to be presented in clear and plain language.` },
    ],
  },
  {
    heading: 'Enquiries and Lead Information',
    blocks: [
      { type: 'p', text: `If you submit an enquiry through emotetechnology.in, contact us by phone, email, WhatsApp, social media, or another communication channel, we may use the information you provide to:` },
      { type: 'list', items: [
        `Respond to your enquiry`,
        `Discuss your requirements`,
        `Prepare a quotation or proposal`,
        `Follow up regarding your enquiry`,
        `Provide information about relevant Emote Technology services`,
        `Maintain appropriate business records`,
      ] },
      { type: 'p', text: `We do not require you to provide information that is not reasonably necessary to respond to your enquiry.` },
    ],
  },
  {
    heading: 'WhatsApp, Phone and Other Communication Channels',
    blocks: [
      { type: 'p', text: `You may contact Emote Technology through telephone, WhatsApp, email, social media, or other communication platforms.` },
      { type: 'p', text: `When you contact us through these channels, the information you provide may be processed for communication, enquiry management, customer support, sales, and service delivery.` },
      { type: 'p', text: `Third-party communication platforms may independently process certain information according to their own privacy policies and terms.` },
    ],
  },
  {
    heading: 'Cookies',
    blocks: [
      { type: 'p', text: `Our website may use cookies and similar technologies.` },
      { type: 'p', text: `Cookies may help us:` },
      { type: 'list', items: [
        `Keep the website functioning properly`,
        `Remember preferences`,
        `Understand website traffic`,
        `Measure website performance`,
        `Understand how visitors use our website`,
        `Measure advertising campaigns`,
        `Improve user experience`,
        `Detect security issues`,
      ] },
      { type: 'p', text: `You may control or disable cookies through your browser settings. Some website functionality may be affected if certain cookies are disabled.` },
    ],
  },
  {
    heading: 'Analytics',
    blocks: [
      { type: 'p', text: `Emote Technology may use analytics technologies to understand how visitors interact with our website.` },
      { type: 'p', text: `Analytics information may include pages viewed, traffic sources, device information, approximate location, session information, and other website usage data.` },
      { type: 'p', text: `We may use third-party analytics providers where appropriate.` },
    ],
  },
  {
    heading: 'Advertising and Marketing Technologies',
    blocks: [
      { type: 'p', text: `Because Emote Technology provides digital marketing services, our website and client campaigns may involve advertising and marketing technologies.` },
      { type: 'p', text: `Depending on the particular website, campaign, or service, these technologies may include platforms such as:` },
      { type: 'list', items: [
        `Google Ads`,
        `Google Analytics`,
        `Meta advertising technologies`,
        `Instagram`,
        `Facebook`,
        `LinkedIn`,
        `Microsoft advertising services`,
        `Search-engine marketing platforms`,
        `CRM and marketing automation systems`,
      ] },
      { type: 'p', text: `These platforms may process information according to their own privacy policies and terms.` },
      { type: 'p', text: `We may use such technologies to measure campaign performance, understand audience behaviour, improve advertising, and deliver relevant marketing activities.` },
    ],
  },
  {
    heading: 'Client Data and Campaign Information',
    blocks: [
      { type: 'p', text: `When you engage Emote Technology, we may receive information relating to your business, customers, website, social media accounts, advertising accounts, marketing campaigns, or other digital properties.` },
      { type: 'p', text: `Depending on the service, this may include:` },
      { type: 'list', items: [
        `Website information`,
        `Social media information`,
        `Advertising account information`,
        `Campaign data`,
        `Audience or customer information`,
        `Marketing performance information`,
        `Website analytics`,
        `Creative and content information`,
        `Business contact information`,
      ] },
      { type: 'p', text: `We process such information only to the extent reasonably necessary to provide the agreed services, manage the client relationship, maintain security, or comply with legal obligations.` },
      { type: 'p', text: `Where Emote Technology processes personal data on behalf of a client, the client's instructions and applicable contractual arrangements may determine the purposes and scope of that processing.` },
    ],
  },
  {
    heading: 'Information We Share',
    blocks: [
      { type: 'p', text: `Emote Technology does not sell your personal information as a standalone commercial product.` },
      { type: 'p', text: `We may share information where reasonably necessary with trusted service providers and business partners, including:` },
      { type: 'list', items: [
        `Website hosting providers`,
        `Domain and technology providers`,
        `Analytics providers`,
        `Advertising platforms`,
        `CRM providers`,
        `Email service providers`,
        `Communication providers`,
        `Payment and accounting service providers`,
        `IT and cybersecurity providers`,
        `Professional advisers`,
        `Government authorities where legally required`,
      ] },
      { type: 'p', text: `We seek to use appropriate safeguards when third parties process information on our behalf.` },
    ],
  },
  {
    heading: 'International Processing',
    blocks: [
      { type: 'p', text: `Emote Technology may work with clients and technology providers located in different countries.` },
      { type: 'p', text: `Some third-party services used by us may store or process information outside India.` },
      { type: 'p', text: `Where personal data is transferred or processed outside India, we will take reasonable steps required under applicable law and applicable contractual arrangements.` },
    ],
  },
  {
    heading: 'Data Security',
    blocks: [
      { type: 'p', text: `We take reasonable technical and organisational measures to protect personal information against:` },
      { type: 'list', items: [
        `Unauthorised access`,
        `Unauthorised disclosure`,
        `Loss`,
        `Misuse`,
        `Alteration`,
        `Destruction`,
        `Unauthorised processing`,
      ] },
      { type: 'p', text: `However, no internet transmission or electronic storage system can be guaranteed to be completely secure.` },
      { type: 'p', text: `If a personal data breach occurs, Emote Technology will take appropriate steps in accordance with applicable law.` },
    ],
  },
  {
    heading: 'How Long We Keep Information',
    blocks: [
      { type: 'p', text: `We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including:` },
      { type: 'list', items: [
        `Providing services`,
        `Managing client relationships`,
        `Maintaining business and financial records`,
        `Responding to enquiries`,
        `Resolving disputes`,
        `Protecting our legal interests`,
        `Preventing fraud and security incidents`,
        `Meeting applicable legal and regulatory requirements`,
      ] },
      { type: 'p', text: `When information is no longer reasonably required, we may delete, anonymise, or securely dispose of it, subject to applicable legal requirements.` },
    ],
  },
  {
    heading: 'Your Privacy Rights',
    blocks: [
      { type: 'p', text: `Subject to applicable law, you may have rights relating to your personal information, including rights to:` },
      { type: 'list', items: [
        `Request information about the personal data we process`,
        `Request correction of inaccurate personal information`,
        `Request deletion of personal information where applicable`,
        `Withdraw consent where processing is based on consent`,
        `Raise a privacy-related grievance`,
        `Request other actions available under applicable data-protection law`,
      ] },
      { type: 'p', text: `Where processing is based on consent, the DPDP Act provides for withdrawal of consent, with the ease of withdrawal comparable to the ease with which consent was given.` },
      { type: 'p', text: `To exercise an applicable right, please contact us using the contact details below.` },
    ],
  },
  {
    heading: 'Withdrawal of Consent',
    blocks: [
      { type: 'p', text: `Where we process your personal data based on your consent, you may withdraw that consent by contacting us.` },
      { type: 'p', text: `Withdrawal of consent will not affect the lawfulness of processing that occurred before the withdrawal.` },
      { type: 'p', text: `Following withdrawal, we may stop the relevant processing unless continued processing is permitted or required under applicable law.` },
    ],
  },
  {
    heading: 'Marketing Communications',
    blocks: [
      { type: 'p', text: `We may contact you regarding:` },
      { type: 'list', items: [
        `Your enquiry`,
        `Requested quotations`,
        `Existing services`,
        `Project updates`,
        `Service-related information`,
        `Relevant Emote Technology offerings`,
      ] },
      { type: 'p', text: `Where required by applicable law, promotional communications will be sent only where an appropriate legal basis exists.` },
      { type: 'p', text: `You may request that we stop sending promotional communications at any time.` },
    ],
  },
  {
    heading: 'Third-Party Websites',
    blocks: [
      { type: 'p', text: `Our website may contain links to third-party websites, social media platforms, advertising platforms, or other external services.` },
      { type: 'p', text: `Emote Technology does not control the privacy practices of these third parties.` },
      { type: 'p', text: `We recommend reviewing the privacy policy of any third-party website before providing personal information.` },
    ],
  },
  {
    heading: "Children's Privacy",
    blocks: [
      { type: 'p', text: `Our services are primarily directed towards businesses, organisations, professionals, and other adult users.` },
      { type: 'p', text: `We do not knowingly request personal information from children in circumstances where such collection is prohibited by applicable law.` },
      { type: 'p', text: `If you believe that personal information relating to a child has been provided to us improperly, please contact us.` },
    ],
  },
  {
    heading: 'Grievance and Privacy Contact',
    blocks: [
      { type: 'p', text: `If you have a question, request, or complaint regarding this Privacy Policy or the processing of your personal information, please contact:` },
      { type: 'contact', lines: [
        `Emote Technology`,
        `Privacy / Grievance Email: info@emotetechnology.in`,
        `Phone: 7061029937`,
        `Website: emotetechnology.in`,
        `Business Address: DSS-15, Trishala City Road, Behind Gopal Sweets, Zirakpur, Punjab, 140603`,
      ] },
      { type: 'p', text: `We will review privacy requests and grievances and respond in accordance with applicable law.` },
      { type: 'p', text: `The DPDP Rules contemplate mechanisms for individuals to exercise their rights and raise grievances, and require privacy notices to provide appropriate means for doing so.` },
    ],
  },
  {
    heading: 'Changes to This Privacy Policy',
    blocks: [
      { type: 'p', text: `Emote Technology may update this Privacy Policy from time to time to reflect:` },
      { type: 'list', items: [
        `Changes to our services`,
        `Changes to our website`,
        `Changes in technology`,
        `Changes in our data-processing practices`,
        `Changes in applicable laws or regulations`,
      ] },
      { type: 'p', text: `When we update this Policy, we will change the “Last Updated” date at the top of this page.` },
    ],
  },
  {
    heading: 'Contact Emote Technology',
    blocks: [
      { type: 'p', text: `For questions, requests, or concerns regarding this Privacy Policy, please contact:` },
      { type: 'contact', lines: [
        `Emote Technology`,
        `Email: info@emotetechnology.in`,
        `Phone: 7061029937`,
        `Website: emotetechnology.in`,
      ] },
      { type: 'sub', text: `Our Commitment` },
      { type: 'p', text: `Emote Technology believes that privacy is an important part of responsible digital business. We aim to collect information transparently, use it for legitimate purposes, protect it through reasonable safeguards, and respect applicable privacy rights.` },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      chip="privacy policy"
      title="How we handle your"
      highlight="information"
      effectiveDate="27 August 2026"
      lastUpdated="27 August 2026"
      intro={[
        `At Emote Technology, we respect your privacy and are committed to protecting the personal information you share with us.`,
        `Emote Technology is a digital marketing and technology agency providing services including website development, digital marketing, social media marketing, search engine optimisation (SEO), paid advertising, branding, content creation, website maintenance, and other digital solutions.`,
        `This Privacy Policy explains how Emote Technology (“Emote Technology”, “Emote”, “we”, “us”, or “our”) collects, uses, stores, shares, and protects information when you visit emotetechnology.in, contact us, request our services, or otherwise interact with us.`,
        `By using our website or providing your information to us, you acknowledge the practices described in this Privacy Policy.`,
      ]}
      sections={sections}
    />
  );
}
