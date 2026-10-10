// Localhost and LAN addresses can't be located.
const PRIVATE_IP = /^(::1$|::ffff:127\.|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|fc|fd|fe80:)/i;

export async function GET(request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ip = PRIVATE_IP.test(forwarded) ? "" : forwarded;
  const key = process.env.IP2LOCATION_API_KEY;
  // With ip, ip2location locates the visitor. Without it (local dev), it
  // locates the caller's own public IP.
  const res = await fetch(
    `https://api.ip2location.io/?key=${key}${ip ? `&ip=${ip}` : ""}`,
  );
  const data = await res.json();
  // ip2location returns "-" for fields it can't resolve.
  const clean = (v) => (v && v !== "-" ? v : "");
  return Response.json({
    ip: clean(data.ip),
    city: clean(data.city_name),
    country: clean(data.country_name),
    zip_code: clean(data.zip_code),
  });
}
