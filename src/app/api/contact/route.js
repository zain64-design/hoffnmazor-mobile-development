import { lookupGeo } from "../geo/lookup";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();
    let ip = formData.get("ip")?.trim() || "";
    let city = formData.get("city")?.trim() || "";
    let country = formData.get("country")?.trim() || "";
    let zip_code = formData.get("zip_code")?.trim() || "";

    if (!name || !phone || !email || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Geo data from the browser can be missing (lookup not finished or failed).
    if (!ip || !country) {
      ({ ip, city, country, zip_code } = await lookupGeo(request));
    }

    const params = new URLSearchParams({
      name,
      phone,
      email,
      message,
      ip,
      city,
      country,
      zip_code,
      brand_name: "hoffnmazor.com",
      // lead_area: "https://hoffnmazor-mobile-development.vercel.app/",
      lead_area: "https://hoffnmazor-mobile-development.com/",
    });

    const controller = new AbortController();
    // The lead server can take longer than 8s to respond.
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const res = await fetch(
      `https://leads.infinityprojectmanager.com/brand/hoffnmazor/lead?${params.toString()}`,
      { method: "GET", redirect: "manual", signal: controller.signal },
    );

    clearTimeout(timeoutId);

    if (res.status >= 200 && res.status < 400) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false }, { status: res.status });
  } catch (err) {
    console.error("Lead submission error:", err);
    return Response.json({ success: false }, { status: 500 });
  }
}
