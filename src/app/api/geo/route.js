import { lookupGeo } from "./lookup";

export async function GET(request) {
  return Response.json(await lookupGeo(request));
}
