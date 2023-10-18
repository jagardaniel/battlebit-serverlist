import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch("https://publicapi.battlebit.cloud/Servers/GetServerList");
  const servers = await res.json();

  return { servers };
};
