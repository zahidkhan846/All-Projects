import { createClient } from "contentful";

export function contentful() {
  const client = createClient({
    space: process.env.SPACE,
    accessToken: process.env.ACCESSTOKEN,
  });
  return client;
}
