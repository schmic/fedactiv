import type { RequestHandler } from "$generated/routes/activity/__types/[id]";

export const get: RequestHandler = async ({ params, url }) => {
  const { id } = params;

  return {
    status: 200,
    body: { id }
  };
}
