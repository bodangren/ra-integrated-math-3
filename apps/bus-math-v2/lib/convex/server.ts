import { api, internal } from "@/convex/_generated/api";
import {
  fetchPublicQuery,
  fetchPublicMutation,
  fetchInternalQuery,
  fetchInternalMutation,
} from "@math-platform/core-convex";

export { api, internal };

export const fetchQuery = fetchPublicQuery;
export const fetchMutation = fetchPublicMutation;
export { fetchInternalQuery, fetchInternalMutation };
