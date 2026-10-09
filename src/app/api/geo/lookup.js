const PRIVATE_IP = /^(::1$|::ffff:127\.|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|fc|fd|fe80:)/i;

const clean = (v) => (v && v !== "-" ? String(v) : "");

export async function lookupGeo(request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ip = forwarded && !PRIVATE_IP.test(forwarded) ? forwarded : "";

  const params = new URLSearchParams({ key: process.env.IP2LOCATION_API_KEY ?? "" });

  try {
    const res = await fetch(`https://api.ip2location.io/?${params.toString()}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    const data = await res.json();
    // ip2location answers a missing/bad key or no credit with {"error": {...}}.
    if (data.error) {
      console.error("Geo lookup error:", data.error.error_message);
    }
    return {
      ip: clean(data.ip) || ip,
      city: clean(data.city_name),
      country: clean(data.country_name),
      zip_code: clean(data.zip_code),
    };
  } catch (err) {
    console.error("Geo lookup error:", err);
    return { ip, city: "", country: "", zip_code: "" };
  }
}
