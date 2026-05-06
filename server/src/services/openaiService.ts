import Tesseract from "tesseract.js";

export async function parseReceipt(imageBuffer: Buffer) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imageBuffer, "eng");

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const merchant = lines[0] || "Unknown";

    const items: {
      name: string;
      amount: number;
    }[] = [];

    let total = 0;

    for (const line of lines) {
      const match = line.match(
        /(.*)\s+(\d+\.\d{2}|\d+)/
      );

      if (match) {
        const name = match[1].trim();
        const amount = parseFloat(match[2]);

        if (
          name.toLowerCase().includes("total")
        ) {
          total = amount;
        } else {
          items.push({
            name,
            amount,
          });
        }
      }
    }

    return {
      merchant,
      date: "",
      items,
      total,
      warnings: [
        "OCR-based extraction may require manual correction",
      ],
      rawText: text,
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
}