// PDF Technical Specification Sheet generator service for Ariselux Backend
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SPEC_SHEETS_DIR = path.resolve(__dirname, '../../data/spec-sheets');

export function getSpecSheetFilePath(productId) {
  if (!productId) return null;
  const clean = String(productId).toLowerCase().trim();
  const variations = [
    clean,
    clean.replace(/-/g, ''),
    clean.replace(/b(\d+)/, 'b-$1'),
    clean.replace(/b-(\d)$/, 'b-0$1'),
    clean.replace(/-0(\d)/, '-$1'),
    clean.replace(/lt/g, 'it'),
    clean.replace(/it/g, 'lt')
  ];
  for (const v of variations) {
    const fileName = `${v}-spec-sheet.pdf`;
    const filePath = path.join(SPEC_SHEETS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

export function generateProductSpecPdfBuffer(product) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Colors
  const primaryNavy = [11, 27, 61];      // #0B1B3D
  const accentBlue = [13, 91, 255];      // #0D5BFF
  const darkSlate = [30, 41, 59];        // #1E293B
  const textMuted = [100, 116, 139];     // #64748B
  const cardBg = [248, 250, 252];        // #F8FAFC
  const borderLight = [226, 232, 240];   // #E2E8F0

  // ── HEADER ──
  doc.setFillColor(...primaryNavy);
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Ariselux Brand Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.text('ARISELUX', margin, 12);

  // Subtitle & Compliance
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('HEAVY-DUTY MOBILE LIGHTING TOWERS & ENGINEERING EQUIPMENT', margin, 18.5);
  doc.text('MANUFACTURING COMPLIANCE: ISO 9001:2015 | CE CONFORMITY | CPCB / BIS APPROVED', margin, 23);

  // Document Type Banner (Right Side)
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('TECHNICAL SPECIFICATION SHEET', pageWidth - margin, 12, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(190, 210, 240);
  const docRef = product.specSheetData?.docRef || `ALX-TSS-${product.id.toUpperCase()}`;
  doc.text(`DOC REF: ${docRef} | REV: 2026.1 | DATE: OCT 2026`, pageWidth - margin, 18, { align: 'right' });
  doc.text('CLASSIFICATION: OFFICIAL FACTORY DATA SHEET', pageWidth - margin, 23, { align: 'right' });

  // ── MODEL TITLE & CATEGORY BAR ──
  let curY = 34;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...primaryNavy);
  doc.text(product.title, margin, curY);

  // Category Badge (Right Side)
  const catText = (product.categoryName || 'LIGHT TOWER').toUpperCase();
  doc.setFontSize(8.5);
  const badgeWidth = doc.getTextWidth(catText) + 8;
  doc.setFillColor(...accentBlue);
  doc.roundedRect(pageWidth - margin - badgeWidth, curY - 5.5, badgeWidth, 7, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(catText, pageWidth - margin - (badgeWidth / 2), curY - 1, { align: 'center' });

  // Tagline
  curY += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...textMuted);
  const tagline = product.tagline || (product.description ? product.description.slice(0, 110) + '...' : '');
  doc.text(tagline, margin, curY);

  // ── 4 QUICK METRICS BOXES ──
  curY += 5;
  const numCards = 4;
  const gap = 3.5;
  const cardWidth = (contentWidth - gap * (numCards - 1)) / numCards;
  const cardHeight = 15;

  const quickItems = [
    { label: 'MAST HEIGHT', val: product.quickSpecs?.mastHeight?.value || product.height || 'N/A' },
    { label: 'LIGHT / LUMENS', val: product.quickSpecs?.light?.value || product.lumens || 'N/A' },
    { label: 'POWER / RUNTIME', val: product.quickSpecs?.runtime?.value || product.runtime || 'N/A' },
    { label: 'COVERAGE AREA', val: product.quickSpecs?.coverage?.value || product.coverage || 'N/A' }
  ];

  quickItems.forEach((item, idx) => {
    const x = margin + idx * (cardWidth + gap);
    doc.setFillColor(...cardBg);
    doc.setDrawColor(...borderLight);
    doc.roundedRect(x, curY, cardWidth, cardHeight, 1.5, 1.5, 'FD');

    // Label
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...textMuted);
    doc.text(item.label, x + cardWidth / 2, curY + 4.5, { align: 'center' });

    // Value
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...primaryNavy);
    const shortVal = item.val.length > 28 ? item.val.slice(0, 26) + '...' : item.val;
    doc.text(shortVal, x + cardWidth / 2, curY + 10.5, { align: 'center' });
  });

  curY += cardHeight + 4;

  // ── STRUCTURED SPECIFICATION TABLES ──
  let sections = product.specSheetData?.sections;
  if (!sections || sections.length === 0) {
    const tableItem = product.tableSpecs?.[0] || {};
    sections = [
      {
        category: 'Power & Drive System',
        items: [
          { name: 'Engine / Power Source', value: tableItem.engine || product.engine || 'Standard Industrial Unit' },
          { name: 'Alternator / Generator', value: tableItem.generator || 'Heavy Duty Industrial' },
          { name: 'Fuel / Energy Storage', value: tableItem.tankSize || product.battery || 'Optimized Capacity' }
        ]
      },
      {
        category: 'Lighting System & Optics',
        items: [
          { name: 'Lamp Array & Lumens', value: product.quickSpecs?.light?.value || product.lumens || 'High Efficiency LED' },
          { name: 'Area Illumination Coverage', value: product.quickSpecs?.coverage?.value || product.coverage || 'Industrial Footprint' }
        ]
      },
      {
        category: 'Mast & Tower Specifications',
        items: [
          { name: 'Maximum Mast Height', value: product.quickSpecs?.mastHeight?.value || product.height || 'Heavy Duty Telescopic' },
          { name: 'Mast Rotation', value: '359° Manual Rotation with Safety Lock' }
        ]
      },
      {
        category: 'Dimensions & Logistics',
        items: [
          { name: 'Operational & Travel Dimensions', value: tableItem.dimensions || 'Standard Road Towable' },
          { name: 'Total Gross Weight', value: tableItem.weight || product.weight || 'Engineered Lightweight' }
        ]
      }
    ];
  }

  sections.forEach((sec) => {
    const tableRows = sec.items.map(item => [item.name, item.value]);

    autoTable(doc, {
      startY: curY,
      margin: { left: margin, right: margin },
      head: [[sec.category.toUpperCase(), 'TECHNICAL SPECIFICATION DETAILS']],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: primaryNavy,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 7.5,
        cellPadding: 1.8
      },
      bodyStyles: {
        fontSize: 7,
        cellPadding: 1.6,
        lineColor: borderLight,
        textColor: darkSlate
      },
      columnStyles: {
        0: { cellWidth: 54, fontStyle: 'bold', textColor: [15, 23, 42] },
        1: { cellWidth: contentWidth - 54 }
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      pageBreak: 'auto',
      didDrawPage: () => {
        drawFooter(doc, pageWidth, pageHeight, margin);
      }
    });

    curY = doc.lastAutoTable.finalY + 3.5;
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(doc, pageWidth, pageHeight, margin, i, totalPages);
  }

  return Buffer.from(doc.output('arraybuffer'));
}

function drawFooter(doc, pageWidth, pageHeight, margin, pageNum = 1, totalPages = 1) {
  const footerY = pageHeight - 11;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);

  // Left
  doc.text('ARISELUX EQUIPMENTS | Factory Support & Technical Inquiries: info@ariselux.com | Web: www.ariselux.com', margin, footerY + 1.5);
  doc.text('© 2026 Ariselux Equipments. Technical specifications subject to continuous engineering innovation without notice.', margin, footerY + 5);

  // Right
  if (totalPages > 1) {
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerY + 1.5, { align: 'right' });
  } else {
    doc.text('Official Technical Specification', pageWidth - margin, footerY + 1.5, { align: 'right' });
  }
}
