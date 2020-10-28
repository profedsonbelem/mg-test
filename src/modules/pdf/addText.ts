import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

export async function addText(
  existingPdfBytes: Buffer,
  text: string,
  selfont: string,
  size: number,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number
) {
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  let ftype;

  switch (selfont.toLowerCase()) {
    case "sans":
      ftype = StandardFonts.Helvetica;
      break;
    case "serif":
      ftype = StandardFonts.TimesRoman;
      break;
    case "serif-bold":
      ftype = StandardFonts.TimesRomanBold;
      break;
    default:
      ftype = StandardFonts.TimesRoman;
      break;
  }

  const font = await pdfDoc.embedFont(ftype);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();
  if (x < 1) {
    x = width * x;
  }
  if (y < 1) {
    y = height * y;
  }

  firstPage.drawText(text, {
    x,
    y,
    size,
    font,
    color: rgb(r, g, b),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
