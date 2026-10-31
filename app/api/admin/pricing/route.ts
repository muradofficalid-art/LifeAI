export const runtime = "nodejs";
let pricingStore: any = null;

export async function POST(req: Request) {
  const data = await req.json();
  pricingStore = data;
  return Response.json({ success: true, data });
}
export async function GET() {
  return Response.json(pricingStore || {
    free: { limit: 5 },
    standard: { price: 8000, long: 60, short: 60 },
    premium: { price: 15000, long: 120, short: 120 },
    unlimited: true
  });
}
