import type { Metadata } from 'next';
import LegalPage, { type LegalSection } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms governing your access to and use of the Emote Technology website and our digital marketing, technology, creative, and related professional services.',
  openGraph: {
    title: 'Terms of Service — Emote Technology',
    description:
      'Scope, payments, intellectual property, liability, and governing law for Emote Technology website development, marketing, and technology services.',
    url: 'https://emotetechnology.in/terms-of-service',
  },
  alternates: { canonical: 'https://emotetechnology.in/terms-of-service' },
};

const sections: LegalSection[] = [
  {
    heading: 'About Emote Technology',
    blocks: [
      { type: 'p', text: `Emote Technology is a digital marketing and technology agency providing services that may include:` },
      { type: 'list', items: [
        `Website design and development`,
        `Website maintenance`,
        `Digital marketing`,
        `Social media management`,
        `Social media marketing`,
        `Search Engine Optimisation (SEO)`,
        `Google and other paid advertising`,
        `Social media advertising`,
        `Content creation`,
        `Graphic design`,
        `Branding and creative services`,
        `Lead-generation campaigns`,
        `Digital strategy`,
        `Marketing consulting`,
        `Other technology and digital services agreed with the client`,
      ] },
      { type: 'p', text: `The specific services provided to a client will depend on the proposal, quotation, invoice, statement of work, or other written agreement between Emote Technology and the client.` },
    ],
  },
  {
    heading: 'Acceptance of Services',
    blocks: [
      { type: 'p', text: `A client may accept our services through a written confirmation, signed proposal, email confirmation, payment of an invoice or advance, or another method accepted by Emote Technology.` },
      { type: 'p', text: `Once the engagement is confirmed, the client agrees to provide the information, access, materials, approvals, and cooperation reasonably required for us to perform the services.` },
    ],
  },
  {
    heading: 'Service Scope',
    blocks: [
      { type: 'p', text: `Before commencing a project, Emote Technology may provide a quotation, proposal, package description, statement of work, or project brief.` },
      { type: 'p', text: `The agreed scope may specify:` },
      { type: 'list', items: [
        `Services included`,
        `Deliverables`,
        `Project timelines`,
        `Number of revisions`,
        `Fees`,
        `Payment schedule`,
        `Client responsibilities`,
        `Third-party costs`,
        `Other project-specific conditions`,
      ] },
      { type: 'p', text: `Work outside the agreed scope may be charged separately.` },
      { type: 'p', text: `Emote Technology is not required to provide additional services that were not included in the agreed scope unless both parties agree to the additional work and applicable charges.` },
    ],
  },
  {
    heading: 'Client Responsibilities',
    blocks: [
      { type: 'p', text: `The client agrees to provide accurate and timely information, materials, access credentials, approvals, and instructions necessary for the project.` },
      { type: 'p', text: `The client is responsible for:` },
      { type: 'list', items: [
        `Providing accurate business information`,
        `Providing required content, images, logos, trademarks, and other materials`,
        `Providing access to relevant platforms where required`,
        `Reviewing deliverables within a reasonable period`,
        `Providing timely feedback`,
        `Obtaining necessary permissions for materials supplied to Emote Technology`,
        `Ensuring that claims made about the client's products or services are accurate and lawful`,
        `Maintaining ownership and responsibility for its own customer data`,
      ] },
      { type: 'p', text: `Delays caused by missing information, approvals, access, or feedback may affect project timelines.` },
    ],
  },
  {
    heading: 'Website Development',
    blocks: [
      { type: 'p', text: `For website projects, the final scope, features, functionality, number of pages, integrations, and technology will be determined by the agreed proposal or project specification.` },
      { type: 'p', text: `Unless expressly stated otherwise:` },
      { type: 'list', items: [
        `Domain registration fees are separate.`,
        `Hosting fees are separate.`,
        `Paid plugins, themes, software, APIs, fonts, stock assets, and third-party subscriptions may be charged separately.`,
        `Ongoing maintenance is not automatically included after project completion.`,
        `Third-party services may be subject to their own terms and pricing.`,
      ] },
      { type: 'p', text: `Website performance may depend on third-party hosting, internet infrastructure, plugins, APIs, browsers, search engines, and other external technologies.` },
    ],
  },
  {
    heading: 'Digital Marketing and SEO',
    blocks: [
      { type: 'p', text: `Digital marketing and SEO results depend on numerous factors outside Emote Technology's control.` },
      { type: 'p', text: `We do not guarantee:` },
      { type: 'list', items: [
        `A specific Google ranking`,
        `A specific number of leads`,
        `A specific number of sales`,
        `A specific advertising return on investment`,
        `Viral content`,
        `A particular number of followers`,
        `Guaranteed business growth`,
      ] },
      { type: 'p', text: `Marketing performance may be affected by competition, market conditions, advertising-platform policies, budgets, customer behaviour, website quality, pricing, seasonality, algorithm changes, and other factors.` },
      { type: 'p', text: `We will provide services professionally and use reasonable efforts to achieve agreed objectives, but specific business results cannot be guaranteed unless expressly stated in writing.` },
    ],
  },
  {
    heading: 'Paid Advertising',
    blocks: [
      { type: 'p', text: `Advertising budgets paid to Google, Meta, LinkedIn, Microsoft, TikTok, or other advertising platforms are generally separate from Emote Technology's professional service fees unless expressly stated otherwise.` },
      { type: 'p', text: `Advertising platforms may:` },
      { type: 'list', items: [
        `Reject advertisements`,
        `Restrict accounts`,
        `Suspend campaigns`,
        `Change policies`,
        `Change algorithms`,
        `Change advertising costs`,
        `Limit targeting options`,
        `Change available features`,
      ] },
      { type: 'p', text: `Emote Technology is not responsible for decisions, outages, restrictions, suspensions, policy changes, or other actions taken by third-party advertising platforms.` },
    ],
  },
  {
    heading: 'Social Media Services',
    blocks: [
      { type: 'p', text: `Where Emote Technology manages social media accounts, the client authorises us to perform the activities agreed in the applicable service package or project scope.` },
      { type: 'p', text: `The client remains responsible for:` },
      { type: 'list', items: [
        `Ownership of its social media accounts`,
        `Accuracy of business claims`,
        `Legality of products and services`,
        `Customer complaints relating to its business`,
        `Compliance with industry-specific requirements`,
      ] },
      { type: 'p', text: `Emote Technology may refuse to publish content that we reasonably believe is unlawful, misleading, abusive, discriminatory, fraudulent, or otherwise inappropriate.` },
      { type: 'p', text: `Social media platforms may independently remove content, restrict accounts, change algorithms, or suspend pages. Such actions are outside Emote Technology's control.` },
    ],
  },
  {
    heading: 'Content and Client Approvals',
    blocks: [
      { type: 'p', text: `The client is responsible for reviewing and approving content before publication where approval is required.` },
      { type: 'p', text: `Once content has been approved by the client, the client accepts responsibility for the approved factual information, claims, offers, prices, product information, and other business-specific details contained within it.` },
      { type: 'p', text: `Unless otherwise agreed, delays in client approval may result in corresponding delays to the publishing or project schedule.` },
    ],
  },
  {
    heading: 'Revisions',
    blocks: [
      { type: 'p', text: `The number of revisions included in a project will be determined by the applicable quotation, package, or project scope.` },
      { type: 'p', text: `Additional revisions or substantial changes beyond the agreed scope may incur additional charges.` },
      { type: 'p', text: `A revision means a reasonable modification to an existing agreed concept or deliverable. A completely new concept, direction, or requirement may be treated as new work.` },
    ],
  },
  {
    heading: 'Fees and Payments',
    blocks: [
      { type: 'p', text: `Fees will be communicated through the applicable quotation, proposal, invoice, package, or agreement.` },
      { type: 'p', text: `Unless otherwise agreed:` },
      { type: 'list', items: [
        `Work may commence after receipt of the required advance payment.`,
        `Invoices must be paid within the agreed payment period.`,
        `Third-party expenses may be payable separately.`,
        `Additional work outside the agreed scope may be invoiced separately.`,
        `Taxes, where applicable, may be charged in addition to the quoted fees.`,
      ] },
      { type: 'p', text: `Emote Technology may pause work where payments are overdue.` },
    ],
  },
  {
    heading: 'Late Payments',
    blocks: [
      { type: 'p', text: `If an invoice remains unpaid beyond the agreed payment period, Emote Technology may:` },
      { type: 'list', items: [
        `Pause ongoing work`,
        `Delay delivery`,
        `Suspend access to services under our control`,
        `Suspend maintenance or support`,
        `Withhold unfinished deliverables`,
        `Require outstanding amounts to be paid before resuming work`,
      ] },
      { type: 'p', text: `Any applicable late-payment charges will be communicated in the relevant quotation, invoice, or agreement.` },
    ],
  },
  {
    heading: 'Cancellation and Termination',
    blocks: [
      { type: 'p', text: `Either party may request termination of an ongoing engagement subject to the applicable project agreement or service arrangement.` },
      { type: 'p', text: `Where a client cancels a project after work has commenced:` },
      { type: 'list', items: [
        `Fees for work already completed may remain payable.`,
        `Non-refundable third-party expenses may remain payable.`,
        `Deposits or advances may be non-refundable where stated in the applicable agreement.`,
        `Completed deliverables may be released subject to payment of all outstanding amounts.`,
      ] },
      { type: 'p', text: `Emote Technology may terminate or suspend services if the client:` },
      { type: 'list', items: [
        `Fails to make required payments`,
        `Provides unlawful instructions`,
        `Requests fraudulent or deceptive marketing`,
        `Abuses or threatens staff`,
        `Repeatedly fails to provide necessary information`,
        `Materially breaches these Terms`,
      ] },
    ],
  },
  {
    heading: 'Intellectual Property',
    blocks: [
      { type: 'p', text: `Unless otherwise agreed in writing, Emote Technology retains ownership of its pre-existing materials, systems, processes, templates, frameworks, tools, know-how, methodologies, and reusable components.` },
      { type: 'p', text: `Upon receipt of full payment, ownership or usage rights in final client-specific deliverables will be transferred or licensed according to the applicable project agreement.` },
      { type: 'p', text: `Third-party materials remain subject to their respective licences and terms. Examples may include:` },
      { type: 'list', items: [
        `Stock images`,
        `Fonts`,
        `Plugins`,
        `Themes`,
        `Software`,
        `APIs`,
        `Music`,
        `Video assets`,
        `Third-party templates`,
      ] },
      { type: 'p', text: `Payment for our services does not automatically transfer ownership of third-party intellectual property.` },
    ],
  },
  {
    heading: 'Client-Provided Materials',
    blocks: [
      { type: 'p', text: `The client represents that it has the necessary rights, licences, permissions, and authority to provide any materials supplied to Emote Technology.` },
      { type: 'p', text: `This may include:` },
      { type: 'list', items: [
        `Logos`,
        `Photographs`,
        `Videos`,
        `Product images`,
        `Text`,
        `Customer information`,
        `Trademarks`,
        `Brand assets`,
        `Copyrighted materials`,
      ] },
      { type: 'p', text: `The client is responsible for claims arising from materials supplied by the client where Emote Technology has reasonably relied upon the client's representation of ownership or permission.` },
    ],
  },
  {
    heading: 'Portfolio and Marketing Use',
    blocks: [
      { type: 'p', text: `Unless otherwise agreed in writing, Emote Technology may display completed work in its portfolio, website, social media, presentations, case studies, or marketing materials for the purpose of demonstrating our services.` },
      { type: 'p', text: `If a project contains confidential information or the client has specifically requested confidentiality in writing, we will respect the applicable confidentiality arrangement.` },
    ],
  },
  {
    heading: 'Confidentiality',
    blocks: [
      { type: 'p', text: `Each party may receive confidential information belonging to the other party during a project.` },
      { type: 'p', text: `Both parties agree to use reasonable care to protect confidential information and not disclose it to unauthorised third parties except where:` },
      { type: 'list', items: [
        `Disclosure is required by law;`,
        `Disclosure is necessary to provide the agreed services;`,
        `The information is already publicly available; or`,
        `The other party has provided permission.`,
      ] },
    ],
  },
  {
    heading: 'Third-Party Services',
    blocks: [
      { type: 'p', text: `Our services may depend on third-party services, including hosting providers, domain registrars, advertising platforms, analytics tools, social media platforms, payment processors, plugins, APIs, software providers, and other technology providers.` },
      { type: 'p', text: `Emote Technology does not control these third parties and cannot guarantee their:` },
      { type: 'list', items: [
        `Availability`,
        `Pricing`,
        `Performance`,
        `Policies`,
        `Features`,
        `Security`,
        `Continuity`,
      ] },
      { type: 'p', text: `Changes or failures affecting third-party services may affect the services we provide.` },
    ],
  },
  {
    heading: 'Prohibited Use',
    blocks: [
      { type: 'p', text: `You must not use our website or services to:` },
      { type: 'list', items: [
        `Conduct unlawful activities`,
        `Commit fraud`,
        `Distribute malware`,
        `Infringe intellectual-property rights`,
        `Misrepresent products or services`,
        `Promote illegal products or activities`,
        `Harass or threaten our employees or representatives`,
        `Attempt unauthorised access to our systems`,
        `Interfere with the operation or security of our website or services`,
      ] },
      { type: 'p', text: `We reserve the right to suspend or refuse services where reasonably necessary to protect our business, staff, systems, clients, or legal interests.` },
    ],
  },
  {
    heading: 'No Guarantee of Business Results',
    blocks: [
      { type: 'p', text: `Emote Technology provides professional digital and technology services but does not guarantee a particular commercial outcome.` },
      { type: 'p', text: `Unless expressly agreed in writing, we do not guarantee:` },
      { type: 'list', items: [
        `Revenue`,
        `Profit`,
        `Sales`,
        `Leads`,
        `Website traffic`,
        `Search rankings`,
        `Advertising performance`,
        `Conversion rates`,
        `Social-media growth`,
        `Customer acquisition`,
        `Business valuation`,
        `Any particular return on investment`,
      ] },
      { type: 'p', text: `Our responsibility is to provide the agreed professional services using reasonable skill and care.` },
    ],
  },
  {
    heading: 'Disclaimer',
    blocks: [
      { type: 'p', text: `Our website and certain information provided through our services may be provided on an “as available” basis.` },
      { type: 'p', text: `While we aim to maintain accurate and useful information, we do not guarantee that our website or every piece of information will always be:` },
      { type: 'list', items: [
        `Complete`,
        `Current`,
        `Error-free`,
        `Uninterrupted`,
        `Free from technical issues`,
      ] },
      { type: 'p', text: `Nothing on our website should be interpreted as legal, financial, tax, medical, or other regulated professional advice unless expressly provided by a suitably qualified professional.` },
    ],
  },
  {
    heading: 'Limitation of Liability',
    blocks: [
      { type: 'p', text: `To the maximum extent permitted by applicable law, Emote Technology will not be liable for indirect, incidental, special, consequential, or loss-of-profit damages arising from the use of our website or services.` },
      { type: 'p', text: `This may include losses resulting from:` },
      { type: 'list', items: [
        `Third-party platform outages`,
        `Advertising-account suspension`,
        `Search-engine algorithm changes`,
        `Social-media changes`,
        `Hosting failures`,
        `Loss of business opportunities`,
        `Loss of revenue`,
        `Loss of anticipated profits`,
        `Third-party software failures`,
      ] },
      { type: 'p', text: `Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited under applicable law.` },
    ],
  },
  {
    heading: 'Indemnification',
    blocks: [
      { type: 'p', text: `To the extent permitted by applicable law, the client agrees to indemnify and hold Emote Technology and its personnel harmless from claims, losses, liabilities, damages, costs, or expenses arising from:` },
      { type: 'list', items: [
        `Unlawful client instructions`,
        `Client-provided materials`,
        `Inaccurate information supplied by the client`,
        `Infringement caused by client-provided materials`,
        `The client's products or services`,
        `The client's violation of applicable laws`,
        `The client's misuse of our services`,
      ] },
      { type: 'p', text: `This provision does not apply to the extent that a claim results from Emote Technology's own unlawful conduct or breach of its obligations.` },
    ],
  },
  {
    heading: 'Privacy',
    blocks: [
      { type: 'p', text: `Our collection and processing of personal information is governed by our Privacy Policy, which forms part of our website's legal framework.` },
      { type: 'p', text: `By using our website or services, you acknowledge that your information may be processed as described in our Privacy Policy.` },
    ],
  },
  {
    heading: 'Changes to Services',
    blocks: [
      { type: 'p', text: `Emote Technology may modify, improve, discontinue, or update website features and service offerings from time to time.` },
      { type: 'p', text: `For an existing paid project, material changes to the agreed scope will be communicated and handled according to the applicable project agreement.` },
    ],
  },
  {
    heading: 'Changes to These Terms',
    blocks: [
      { type: 'p', text: `We may update these Terms of Service from time to time.` },
      { type: 'p', text: `The updated version will be published on this page with a revised “Last Updated” date.` },
      { type: 'p', text: `Your continued use of our website after an update constitutes acceptance of the updated Terms to the extent permitted by applicable law.` },
    ],
  },
  {
    heading: 'Governing Law and Jurisdiction',
    blocks: [
      { type: 'p', text: `These Terms shall be governed by and interpreted in accordance with the laws of India.` },
      { type: 'p', text: `Subject to applicable law, disputes arising from these Terms or our services shall be subject to the jurisdiction of the courts having appropriate jurisdiction over Emote Technology's principal place of business.` },
      { type: 'p', text: `Before commencing formal proceedings, both parties are encouraged to attempt to resolve disputes through good-faith communication.` },
    ],
  },
  {
    heading: 'Force Majeure',
    blocks: [
      { type: 'p', text: `Emote Technology will not be responsible for delays or failure to perform caused by circumstances beyond our reasonable control.` },
      { type: 'p', text: `Such circumstances may include:` },
      { type: 'list', items: [
        `Natural disasters`,
        `Government actions`,
        `Internet or telecommunications failures`,
        `Cybersecurity incidents`,
        `Platform outages`,
        `Power failures`,
        `Strikes`,
        `War or civil unrest`,
        `Epidemics or pandemics`,
        `Third-party service failures`,
        `Other events beyond our reasonable control`,
      ] },
    ],
  },
  {
    heading: 'Severability',
    blocks: [
      { type: 'p', text: `If any provision of these Terms is found to be invalid, unlawful, or unenforceable, the remaining provisions will continue to apply to the maximum extent permitted by law.` },
    ],
  },
  {
    heading: 'Entire Agreement',
    blocks: [
      { type: 'p', text: `These Terms, together with the applicable quotation, proposal, statement of work, invoice, service agreement, and Privacy Policy, constitute the relevant agreement between Emote Technology and the client regarding the applicable services.` },
      { type: 'p', text: `If there is a conflict between these Terms and a specific written client agreement, the specific written agreement will prevail to the extent of that conflict.` },
    ],
  },
  {
    heading: 'Contact Us',
    blocks: [
      { type: 'p', text: `For questions regarding these Terms of Service, please contact:` },
      { type: 'contact', lines: [
        `Emote Technology`,
        `Email: info@emotetechnology.in`,
        `Phone: 7061029937`,
        `Website: emotetechnology.in`,
        `DSS-15, Trishala City Road, Behind Gopal Sweets, Zirakpur, Punjab, 140603`,
      ] },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      chip="terms of service"
      title="The terms behind the"
      highlight="work"
      effectiveDate="27 August 2026"
      lastUpdated="27 August 2026"
      intro={[
        `Welcome to Emote Technology.`,
        `These Terms of Service (“Terms”, “Agreement”, or “Terms of Service”) govern your access to and use of the Emote Technology website, emotetechnology.in, and our digital marketing, technology, creative, and related professional services.`,
        `By accessing our website, contacting us, requesting a quotation, purchasing our services, or engaging Emote Technology, you agree to these Terms.`,
        `If you do not agree with these Terms, please do not use our website or services.`,
      ]}
      sections={sections}
    />
  );
}
