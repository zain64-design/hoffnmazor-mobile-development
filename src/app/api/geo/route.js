export async function GET(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "";
  const key = process.env.IP2LOCATION_API_KEY;
  // Without ip, ip2location returns the server's location, not the visitor's.
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
