import QRCode from "qrcode";
import { NextResponse } from "next/server";
// Function to generate QR code and return URL
function getQrCode(
  data: string,
  lightParam: string,
  darkParam: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(
      data,
      { color: { dark: darkParam, light: lightParam } },
      (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      }
    );
  });
}

export async function GET(req: any, res: any) {
  try {
    // Create a URL object to easily access search parameters
    const urlObject = new URL(req.url);

    // Extract 'color' and 'data' parameters from the search parameters
    const lightParam = urlObject.searchParams.get("light")!;
    const dataParam = urlObject.searchParams.get("data")!;
    const darkParam = urlObject.searchParams.get("dark")!;

    // console.log(lightParam, dar)
    // const widthParam = Number(urlObject.searchParams.get('width'));
    // const marginParam = Number(urlObject.searchParams.get('mergin'));

    // Generate QR code URL
    const url = await getQrCode(dataParam, lightParam, darkParam);

    // Simulate delay if needed
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // console.log(url);

    // return res.json({
    //   pngFile: url,
    // });
    return NextResponse.json({
      pngFile: url,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: "Failed to generate QR code",
    });
  }
}
