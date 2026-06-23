import React, { forwardRef } from 'react';
import Image from 'next/image';

export interface SummerOfferLetterData {
  issueDate: string;
  candidateName: string;
  position: string;
  department: string;
  modeOfInternship: string;
  reportingTo: string;
  startDate: string;
  endDate: string;
  workingHours: string;
  stipend: string;
}

interface SummerOfferLetterTemplateProps {
  data: SummerOfferLetterData;
}

const SummerOfferLetterTemplate = forwardRef<HTMLDivElement, SummerOfferLetterTemplateProps>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '210mm',
        height: '594mm',
        backgroundColor: '#ffffff',
        color: '#000000',
        position: 'relative',
        margin: '0 auto',
        overflow: 'hidden',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Top Left Wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '220px', zIndex: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
          <path fill="#00BCD4" d="M0,0 L200,0 C150,10 120,40 100,70 C70,110 30,120 0,160 L0,0 Z" />
          <path fill="#00A8CC" d="M0,0 L180,0 C130,20 100,50 80,80 C50,130 20,150 0,180 L0,0 Z" opacity="0.6" />
        </svg>
      </div>

      {/* Page 1 */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '20mm 20mm 10mm 20mm',
        display: 'flex',
        flexDirection: 'column',
        height: '297mm',
        boxSizing: 'border-box',
      }}>

        {/* Header row: spacer left + logo right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6mm' }}>
          <div style={{ width: '60mm' }} />
          <div style={{ position: 'relative', width: '130px', height: '55px', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Emote Technology" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>

        {/* UDYAM + Date row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8mm' }}>
          <p style={{ fontSize: '9px', color: '#555555', fontWeight: '700', margin: 0 }}>
            UDYAM Registration No.: UDYAM-PB-14-0052032
          </p>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
            Date: {data.issueDate || 'Date'}
          </p>
        </div>

        {/* Subject line */}
        <div style={{ marginBottom: '6mm' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>
            SUBJECT: OFFER OF SUMMER INTERNSHIP – {(data.position || 'FULL STACK DEVELOPER').toUpperCase()}
          </p>
        </div>

        {/* Salutation */}
        <p style={{ fontWeight: '700', fontSize: '13px', color: '#111827', margin: '0 0 5mm 0' }}>
          Dear {data.candidateName || '[Candidate Name]'},
        </p>

        {/* Opening paragraph */}
        <div style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.75', marginBottom: '5mm' }}>
          <p style={{ margin: 0 }}>
            We are pleased to offer you the position of{' '}
            <strong>{data.position || 'Full Stack Developer Summer Intern'}</strong> at{' '}
            <strong>EMOTE TECHNOLOGY</strong>. Based on your academic background, technical skills, and interest in
            software development, we are confident that this internship will provide valuable industry exposure while
            enabling you to contribute meaningfully to our projects.
          </p>
        </div>

        {/* Internship Details */}
        <div style={{ marginBottom: '5mm' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 3mm 0', textDecoration: 'underline' }}>
            Internship Details
          </p>
          <table style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.9', borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {[
                ['Position', data.position || 'Full Stack Developer Summer Intern'],
                ['Department', data.department || 'Technology & Development'],
                ['Mode of Internship', data.modeOfInternship || 'Remote'],
                ['Reporting To', data.reportingTo || 'Mr. Shivam Jaiswal'],
                ['Duration', `${data.startDate || '20 June 2026'} to ${data.endDate || '25 July 2026'}`],
                ['Working Hours', data.workingHours || '36 hours per week'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ paddingRight: '4mm', verticalAlign: 'top', whiteSpace: 'nowrap', fontWeight: '600', width: '55mm' }}>
                    • {label}
                  </td>
                  <td style={{ verticalAlign: 'top' }}>: {value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role & Responsibilities */}
        <div style={{ marginBottom: '5mm' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 2mm 0', textDecoration: 'underline' }}>
            Role &amp; Responsibilities
          </p>
          <p style={{ fontSize: '12.5px', color: '#1f2937', margin: '0 0 2mm 0', lineHeight: '1.7' }}>
            During the internship period, you will be expected to:
          </p>
          <ul style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.8', margin: 0, paddingLeft: '5mm', listStyle: 'none' }}>
            {[
              'Assist in web application development and software engineering tasks.',
              'Participate in coding, debugging, testing, and deployment activities.',
              'Support technical research and project documentation.',
              'Collaborate with team members on assigned projects and deliverables.',
              'Follow company policies regarding professionalism, confidentiality, and ethical conduct.',
              'Complete assigned tasks within stipulated timelines.',
            ].map((item) => (
              <li key={item} style={{ marginBottom: '1mm' }}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div style={{ marginBottom: '5mm' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 2mm 0', textDecoration: 'underline' }}>
            Learning Outcomes
          </p>
          <p style={{ fontSize: '12.5px', color: '#1f2937', margin: '0 0 2mm 0', lineHeight: '1.7' }}>
            This internship is designed to provide practical exposure to:
          </p>
          <ul style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.8', margin: 0, paddingLeft: '5mm', listStyle: 'none' }}>
            {[
              'Full Stack Development practices and workflows.',
              'Version control and collaborative development environments.',
              'Real-world software project execution.',
              'Professional communication and teamwork.',
            ].map((item) => (
              <li key={item} style={{ marginBottom: '1mm' }}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Compensation & Certification */}
        <div style={{ marginBottom: '5mm' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 2mm 0', textDecoration: 'underline' }}>
            Compensation &amp; Certification
          </p>
          <p style={{ fontSize: '12.5px', color: '#1f2937', margin: '0 0 2mm 0', lineHeight: '1.7' }}>
            Upon successful completion of the Summer Internship Program and satisfactory performance, the intern shall receive:
          </p>
          <ul style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.8', margin: 0, paddingLeft: '5mm', listStyle: 'none' }}>
            <li style={{ marginBottom: '1mm' }}>• A stipend of <strong>₹{data.stipend || '5,000'} (Rupees Five Thousand Only)</strong>.</li>
            <li style={{ marginBottom: '1mm' }}>• An Internship Completion Certificate issued by <strong>EMOTE TECHNOLOGY</strong>.</li>
          </ul>
        </div>

      </div>

      {/* Page 2 */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '20mm 20mm 35mm 20mm',
        display: 'flex',
        flexDirection: 'column',
        height: '297mm',
        boxSizing: 'border-box',
      }}>
        {/* Terms & Conditions */}
        <div style={{ marginBottom: '6mm' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: '0 0 2mm 0', textDecoration: 'underline' }}>
            Terms &amp; Conditions
          </p>
          <ol style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.8', margin: 0, paddingLeft: '5mm', listStyle: 'none' }}>
            {[
              'This internship is purely educational and training-oriented in nature.',
              'The intern shall maintain confidentiality of all company information and project data.',
              'The company reserves the right to terminate the internship in case of misconduct or non-compliance with company policies.',
              'This offer does not constitute an employment agreement and does not guarantee future employment with the company.',
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: '1mm' }}>{i + 1}. {item}</li>
            ))}
          </ol>
        </div>

        {/* Closing paragraph */}
        <div style={{ fontSize: '12.5px', color: '#1f2937', lineHeight: '1.75', marginBottom: '6mm' }}>
          <p style={{ margin: 0 }}>
            Kindly confirm your acceptance of this offer by replying to this email before the commencement of the internship.
            We are pleased to welcome you to <strong>EMOTE TECHNOLOGY</strong> and look forward to your contribution during
            the Summer Internship Program.
          </p>
        </div>

        {/* Signature */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingBottom: '4mm' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: '700', fontSize: '13px', margin: '0 0 3mm 0' }}>Sincerely,</p>
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '60px' }}>
                <Image src="/sign.png" alt="Signature" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>
            <p style={{ fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', color: '#111827', margin: '3mm 0 1mm 0' }}>
              SHIVAM JAISWAL
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '12px', color: '#374151', margin: '0 0 1mm 0' }}>Director</p>
            <p style={{ fontSize: '11px', color: '#374151', margin: 0 }}>EMOTE TECHNOLOGY</p>
            <p style={{ fontSize: '11px', color: '#374151', margin: 0 }}>hr@emotetechnology.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Cyan Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '15mm',
        backgroundColor: '#00BCD4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#000000', fontWeight: '700', fontSize: '11px', margin: 0 }}>
          Urban Phrase – 1 , Jeevan Nagar , Jamalpur , Ludhiana , Punjab , 141010.
        </p>
      </div>
    </div>
  );
});

SummerOfferLetterTemplate.displayName = 'SummerOfferLetterTemplate';

export default SummerOfferLetterTemplate;
