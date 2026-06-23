import React, { forwardRef } from 'react';
import Image from 'next/image';

export interface OfferLetterData {
  issueDate: string;
  candidateName: string;
  position: string;
  startDate: string;
  endDate: string;
  reportingTo: string;
  probationPeriod: string;
  paidInternshipPeriod: string;
  modeOfInternship: string;
  workingHours: string;
}

interface OfferLetterTemplateProps {
  data: OfferLetterData;
}

const OfferLetterTemplate = forwardRef<HTMLDivElement, OfferLetterTemplateProps>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="offer-letter-page"
      style={{
        width: '210mm',
        minHeight: '297mm',
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

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '20mm 20mm 30mm 20mm',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '297mm',
        boxSizing: 'border-box',
      }}>

        {/* Header row: spacer left + logo right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8mm' }}>
          {/* Spacer to push logo right, stays clear of wave */}
          <div style={{ width: '60mm' }} />
          {/* Logo */}
          <div style={{ position: 'relative', width: '130px', height: '55px', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Emote Technology" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>

        {/* UDYAM + Date row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12mm' }}>
          <p style={{ fontSize: '9px', color: '#555555', fontWeight: '700', margin: 0 }}>
            UDYAM REGISTRATION NUMBER: UDYAM-PB-14-0052032
          </p>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
            {data.issueDate || 'Date'}
          </p>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '8mm' }}>
          <h2 style={{ fontWeight: '700', fontSize: '18px', color: '#111827', margin: 0 }}>To Whom It concern</h2>
        </div>

        {/* Salutation */}
        <p style={{ fontWeight: '700', fontSize: '14px', color: '#111827', marginBottom: '5mm', margin: '0 0 5mm 0' }}>
          Dear {data.candidateName || '[Candidate Name]'},
        </p>

        {/* Body */}
        <div style={{ fontSize: '13px', color: '#1f2937', flexGrow: 1, lineHeight: '1.7' }}>
          <p style={{ margin: '0 0 5mm 0' }}>
            We are pleased to offer you the position of{' '}
            <strong style={{ color: '#111827' }}>{data.position || '[Position]'} at EMOTE TECHNOLOGY.</strong>{' '}
            Based on your background and interest in learning, we believe you will contribute meaningfully to our team.
            Your internship will commence on{' '}
            <strong style={{ color: '#111827' }}>{data.startDate || '[Start Date]'}</strong> and continue until{' '}
            <strong style={{ color: '#111827' }}>{data.endDate || '[End Date]'}</strong>, reporting to{' '}
            <strong style={{ color: '#111827' }}>{data.reportingTo || '[Reporting To]'}</strong>.
          </p>

          <p style={{ margin: '0 0 5mm 0' }}>
            The internship is structured as follows:<br />
            • Probation/Training Period: {data.probationPeriod || '45 days (Unpaid)'}<br />
            • Paid Internship Period: {data.paidInternshipPeriod || '6 months (Performance-based stipend)'}<br />
            • Mode of Internship: {data.modeOfInternship || 'Remote'}
          </p>

          <p style={{ margin: '0 0 5mm 0' }}>
            Your responsibilities will include web development tasks, supporting technical projects, assisting with code,
            participating in reviews, research, documentation, and completing assignments issued by your supervisor.
            You are expected to maintain punctuality, professionalism, and confidentiality throughout your internship,
            and comply with all company policies and guidelines.
          </p>

          <p style={{ margin: '0 0 5mm 0' }}>
            Your working hours will be {data.workingHours || '36 hours per week'}. The company reserves the right to modify
            duties or schedules as required.
          </p>

          <p style={{ margin: '0 0 5mm 0' }}>
            If you have any queries, please do not hesitate to reach out to us at{' '}
            <strong style={{ color: '#111827' }}>hr@emotetechnology.com.</strong>
          </p>
        </div>

        {/* Signature */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10mm', paddingBottom: '20mm' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: '700', fontSize: '13px', marginBottom: '4mm', margin: '0 0 4mm 0' }}>Sincerely,</p>
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '60px' }}>
                <Image src="/sign.png" alt="Signature" fill style={{ objectFit: 'contain' }} />
              </div>
            </div>
            <p style={{ fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', color: '#111827', margin: '4mm 0 2mm 0' }}>
              SHIVAM JAISWAL
            </p>
            <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#374151', margin: 0 }}>Director</p>
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

OfferLetterTemplate.displayName = 'OfferLetterTemplate';

export default OfferLetterTemplate;
