import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ReportData {
  month: string;
  year: number;
  totalBookings: number;
  totalRevenue: number;
  mostBookedRoom: string;
  bookings: Array<{
    id: string;
    customerName: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    amount: number;
  }>;
}

export function generatePDFReport(data: ReportData): Uint8Array {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Title
  doc.setFontSize(20);
  doc.text('Vagamon Misty Heights Resort', pageWidth / 2, 20, {
    align: 'center',
  });

  doc.setFontSize(16);
  doc.text('Monthly Booking Report', pageWidth / 2, 30, {
    align: 'center',
  });

  doc.setFontSize(12);
  doc.text(`${data.month} ${data.year}`, pageWidth / 2, 38, {
    align: 'center',
  });

  // Summary
  let yPos = 50;
  doc.setFontSize(12);
  doc.text('Summary', 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.text(`Total Bookings: ${data.totalBookings}`, 20, yPos);
  yPos += 7;
  doc.text(`Total Revenue: ₹${data.totalRevenue.toLocaleString('en-IN')}`, 20, yPos);
  yPos += 7;
  doc.text(`Most Booked Room: ${data.mostBookedRoom}`, 20, yPos);
  yPos += 10;

  // Bookings Table
  autoTable(doc, {
    startY: yPos,
    head: [['Booking ID', 'Customer', 'Room', 'Check-in', 'Check-out', 'Amount']],
    body: data.bookings.map((booking) => [
      booking.id.slice(0, 8) + '...',
      booking.customerName,
      booking.roomName,
      booking.checkIn,
      booking.checkOut,
      `₹${booking.amount.toLocaleString('en-IN')}`,
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [142, 76, 36] },
  });

  return doc.output('arraybuffer') as unknown as Uint8Array;
}



