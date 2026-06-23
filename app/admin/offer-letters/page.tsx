"use client";

import React, { useState, useRef } from "react";
import OfferLetterTemplate, { OfferLetterData } from "@/components/OfferLetterTemplate";
import SummerOfferLetterTemplate, { SummerOfferLetterData } from "@/components/SummerOfferLetterTemplate";
import { Download, Loader2, Sun, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type TemplateType = "general" | "summer";

export default function OfferLettersPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("general");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [generalFormData, setGeneralFormData] = useState<OfferLetterData>({
    issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    candidateName: "",
    position: "Full Stack Developer Intern",
    startDate: "",
    endDate: "",
    reportingTo: "Mr. Shivam Jaiswal",
    probationPeriod: "45 days (Unpaid)",
    paidInternshipPeriod: "6 months (Performance-based stipend)",
    modeOfInternship: "Remote",
    workingHours: "36 hours per week",
  });

  const [summerFormData, setSummerFormData] = useState<SummerOfferLetterData>({
    issueDate: "16 June 2026",
    candidateName: "",
    position: "Full Stack Developer Summer Intern",
    department: "Technology & Development",
    modeOfInternship: "Remote",
    reportingTo: "Mr. Shivam Jaiswal",
    startDate: "20 June 2026",
    endDate: "25 July 2026",
    workingHours: "36 hours per week",
    stipend: "5,000",
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSummerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSummerFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsGeneratingPdf(true);

    // Create an off-screen container to avoid scroll/clipping issues
    const printContainer = document.createElement('div');
    printContainer.style.position = 'absolute';
    printContainer.style.top = '-9999px';
    printContainer.style.left = '-9999px';
    document.body.appendChild(printContainer);

    try {
      const clonedElement = element.cloneNode(true) as HTMLElement;
      printContainer.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        onclone: (_clonedDoc, clonedEl) => {
          const doc = clonedEl.ownerDocument;
          doc.querySelectorAll('link[rel="stylesheet"], style').forEach(el => el.remove());
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 1) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      const candidateName = activeTemplate === "general"
        ? generalFormData.candidateName
        : summerFormData.candidateName;
      const prefix = activeTemplate === "summer" ? "Summer_Offer_Letter" : "Offer_Letter";
      pdf.save(`${prefix}_${candidateName.replace(/\s+/g, '_') || 'Draft'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      document.body.removeChild(printContainer);
      setIsGeneratingPdf(false);
    }
  };

  const inputClass = "w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block mb-1 text-neutral-400";

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Template Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTemplate("general")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTemplate === "general"
                ? "bg-blue-600 text-white shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText size={15} />
            General Internship
          </button>
          <button
            onClick={() => setActiveTemplate("summer")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTemplate === "summer"
                ? "bg-cyan-600 text-white shadow"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sun size={15} />
            Summer Internship
          </button>
        </div>

        <button
          onClick={handlePrint}
          disabled={isGeneratingPdf}
          className={`flex items-center gap-2 ${
            activeTemplate === "summer"
              ? "bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800"
              : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800"
          } disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
        >
          {isGeneratingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">

        {/* Left: Form */}
        <div className="w-full lg:w-1/3 bg-neutral-900 border border-neutral-800 rounded-xl p-6 overflow-y-auto no-print">

          {activeTemplate === "general" ? (
            <>
              <h2 className="text-base font-bold text-neutral-200 mb-4">General Internship Details</h2>
              <form className="space-y-4 text-sm text-neutral-300">
                <div>
                  <label className={labelClass}>Issue Date</label>
                  <input type="text" name="issueDate" value={generalFormData.issueDate} onChange={handleGeneralChange} className={inputClass} placeholder="e.g. 16 Jun 2026" />
                </div>
                <div>
                  <label className={labelClass}>Candidate Name</label>
                  <input type="text" name="candidateName" value={generalFormData.candidateName} onChange={handleGeneralChange} className={inputClass} placeholder="e.g. Kuldeep Saini" />
                </div>
                <div>
                  <label className={labelClass}>Position / Role</label>
                  <input type="text" name="position" value={generalFormData.position} onChange={handleGeneralChange} className={inputClass} placeholder="e.g. Full Stack Developer Intern" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input type="text" name="startDate" value={generalFormData.startDate} onChange={handleGeneralChange} className={inputClass} placeholder="e.g. 19 Jan 2026" />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input type="text" name="endDate" value={generalFormData.endDate} onChange={handleGeneralChange} className={inputClass} placeholder="e.g. 03 Sep 2026" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Reporting To</label>
                  <input type="text" name="reportingTo" value={generalFormData.reportingTo} onChange={handleGeneralChange} className={inputClass} placeholder="e.g. Mr. Shivam Jaiswal" />
                </div>
                <div className="border-t border-neutral-800 pt-4 mt-2">
                  <h3 className="font-semibold text-neutral-200 mb-4">Internship Structure</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Probation/Training Period</label>
                      <input type="text" name="probationPeriod" value={generalFormData.probationPeriod} onChange={handleGeneralChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Paid Internship Period</label>
                      <input type="text" name="paidInternshipPeriod" value={generalFormData.paidInternshipPeriod} onChange={handleGeneralChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Mode of Internship</label>
                      <input type="text" name="modeOfInternship" value={generalFormData.modeOfInternship} onChange={handleGeneralChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Working Hours</label>
                      <input type="text" name="workingHours" value={generalFormData.workingHours} onChange={handleGeneralChange} className={inputClass} />
                    </div>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-base font-bold text-neutral-200 mb-4">Summer Internship Details</h2>
              <form className="space-y-4 text-sm text-neutral-300">
                <div>
                  <label className={labelClass}>Issue Date</label>
                  <input type="text" name="issueDate" value={summerFormData.issueDate} onChange={handleSummerChange} className={inputClass} placeholder="e.g. 16 June 2026" />
                </div>
                <div>
                  <label className={labelClass}>Candidate Name</label>
                  <input type="text" name="candidateName" value={summerFormData.candidateName} onChange={handleSummerChange} className={inputClass} placeholder="e.g. Arjun Maurya" />
                </div>
                <div>
                  <label className={labelClass}>Position / Role</label>
                  <input type="text" name="position" value={summerFormData.position} onChange={handleSummerChange} className={inputClass} placeholder="e.g. Full Stack Developer Summer Intern" />
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <input type="text" name="department" value={summerFormData.department} onChange={handleSummerChange} className={inputClass} placeholder="e.g. Technology & Development" />
                </div>
                <div>
                  <label className={labelClass}>Mode of Internship</label>
                  <input type="text" name="modeOfInternship" value={summerFormData.modeOfInternship} onChange={handleSummerChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Reporting To</label>
                  <input type="text" name="reportingTo" value={summerFormData.reportingTo} onChange={handleSummerChange} className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input type="text" name="startDate" value={summerFormData.startDate} onChange={handleSummerChange} className={inputClass} placeholder="e.g. 20 June 2026" />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input type="text" name="endDate" value={summerFormData.endDate} onChange={handleSummerChange} className={inputClass} placeholder="e.g. 25 July 2026" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Working Hours</label>
                  <input type="text" name="workingHours" value={summerFormData.workingHours} onChange={handleSummerChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Stipend Amount (₹)</label>
                  <input type="text" name="stipend" value={summerFormData.stipend} onChange={handleSummerChange} className={inputClass} placeholder="e.g. 5,000" />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right: Preview */}
        <div className="w-full lg:w-2/3 bg-neutral-800 rounded-xl overflow-auto flex justify-center items-start p-4 lg:p-8">
          <div className="transform scale-75 lg:scale-100 origin-top shadow-2xl">
            {activeTemplate === "general" ? (
              <OfferLetterTemplate ref={printRef} data={generalFormData} />
            ) : (
              <SummerOfferLetterTemplate ref={printRef} data={summerFormData} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
