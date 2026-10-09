export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();
    const ip = formData.get("ip")?.trim() || "";
    const city = formData.get("city")?.trim() || "";
    const country = formData.get("country")?.trim() || "";
    const zip_code = formData.get("zip_code")?.trim() || "";

    if (!name || !phone || !email || !message) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
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
      lead_area: "https://hoffnmazor-mobile-development.vercel.app/",
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

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
