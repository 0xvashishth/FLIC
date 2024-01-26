import { NextResponse, NextRequest } from "next/server";
import { QRCodeCanvas } from "@loskir/styled-qr-code-node";

export async function POST(req: any, res: any){
  // req = await req.json()
  try {
    req = await req.json()
    var qrCodeOptions = req.qrCodeOptions;

    const qrCode = new QRCodeCanvas(qrCodeOptions);

    // const file = await qrCode.toDataUrl("png");

    return NextResponse.json({
      pnfFile: qrCode,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}