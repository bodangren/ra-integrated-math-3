import { z } from 'zod';

export const graphingExplorerSchema = z
  .object({
    variant: z.enum(['plot_from_equation', 'compare_functions', 'find_intercepts', 'graph_system']).optional(),
    equation: z.string().min(1),
    domain: z.tuple([z.number(), z.number()]).optional(),
    range: z.tuple([z.number(), z.number()]).optional(),
    points: z.array(z.tuple([z.number(), z.number()])).optional(),
    comparisonEquation: z.string().optional(),
    comparisonQuestion: z.string().optional(),
    comparisonAnswer: z.enum(['first', 'second']).optional(),
    linearEquation: z.string().optional(),
  })
  .strict();

export type GraphingExplorerSchemaProps = z.infer<typeof graphingExplorerSchema>;
