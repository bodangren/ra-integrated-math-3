'use client';

import React, { useState, useCallback, useRef } from 'react';
import { evaluateFunction } from '@/lib/activities/graphing/canvas-utils';

export interface InterceptData {
  type: 'intercept' | 'no_intercepts';
  data: { x: number; y: number } | null;
  timestamp: number;
}

export interface InterceptIdentificationProps {
  functionExpression: string;
  onInterceptIdentified: (intercept: InterceptData) => void;
  readonly?: boolean;
}

interface IdentifiedIntercept {
  x: number;
  y: number;
}

export function InterceptIdentification({
  functionExpression,
  onInterceptIdentified,
  readonly = false,
}: InterceptIdentificationProps) {
  const [identifiedIntercepts, setIdentifiedIntercepts] = useState<IdentifiedIntercept[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const calculateXIntercepts = useCallback((expr: string): number[] => {
    const trimmedExpr = expr.trim();

    if (!trimmedExpr.includes('x')) {
      const c = parseFloat(trimmedExpr);
      if (Math.abs(c) < 0.0001) {
        return [];
      }
      return [];
    }

    const match = expr.match(/(-?\d*\.?\d*)?x\^2(?:\s*([+-]\s*\d*\.?\d*)?x)?(?:\s*([+-]\s*\d*\.?\d*)?)?/);
    if (match) {
      const a = match[1] ? parseFloat(match[1]) : 1;
      const b = match[2] ? parseFloat(match[2].replace(/\s/g, '')) : 0;
      const c = match[3] ? parseFloat(match[3].replace(/\s/g, '')) : 0;

      if (a !== 0) {
        const discriminant = b * b - 4 * a * c;
        if (discriminant > 0) {
          const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          return [x1, x2];
        } else if (Math.abs(discriminant) < 0.0001) {
          const x = -b / (2 * a);
          return [x];
        }
      } else if (b !== 0) {
        const x = -c / b;
        return [x];
      }
    }

    const linearMatch = expr.match(/^\s*([+-]?\s*\d*\.?\d*)?x(?:\s*([+-]\s*\d+\.?\d*)\s*)?$/);
    if (linearMatch) {
      const rawA = linearMatch[1]?.replace(/\s/g, '') ?? '';
      const a = rawA === '' || rawA === '+' ? 1 : rawA === '-' ? -1 : parseFloat(rawA);
      const b = linearMatch[2] ? parseFloat(linearMatch[2].replace(/\s/g, '')) : 0;
      if (a !== 0) return [-b / a];
    }

    return [];
  }, []);

  const hasRealIntercepts = useCallback(() => {
    if (!functionExpression.trim().includes('x')) {
      return true;
    }
    const intercepts = calculateXIntercepts(functionExpression);
    return intercepts.length > 0;
  }, [functionExpression, calculateXIntercepts]);

  const findNearestIntercept = useCallback((clickX: number, clickY: number): { x: number; y: number } | null => {
    const intercepts = calculateXIntercepts(functionExpression);
    if (intercepts.length === 0) return null;

    if (clickY > 340) return null;

    const actualIntercepts = intercepts.map((x) => ({
      x,
      y: evaluateFunction(functionExpression, x),
    })).sort((a, b) => a.x - b.x);

    if (actualIntercepts.length === 1) return actualIntercepts[0];
    return clickX < 300 ? actualIntercepts[0] : actualIntercepts[actualIntercepts.length - 1];
  }, [functionExpression, calculateXIntercepts]);

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (readonly) return;

      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const width = rect.width || 600;
      const height = rect.height || 400;
      const clickX = Math.max(0, Math.min(width, event.clientX - rect.left));
      const clickY = Math.max(0, Math.min(height, event.clientY - rect.top));

      const nearestIntercept = findNearestIntercept(clickX, clickY);

      if (nearestIntercept) {
        const isAlreadyIdentified = identifiedIntercepts.some(
          i => Math.abs(i.x - nearestIntercept!.x) < 0.1
        );

        if (!isAlreadyIdentified) {
          setIdentifiedIntercepts(prev => [...prev, nearestIntercept!]);
          setFeedback({ message: 'Correct!', type: 'success' });

          onInterceptIdentified({
            type: 'intercept',
            data: nearestIntercept,
            timestamp: Date.now(),
          });
        }
      } else {
        setFeedback({ message: 'Try again', type: 'error' });
      }

      setTimeout(() => setFeedback(null), 2000);
    },
    [readonly, identifiedIntercepts, findNearestIntercept, onInterceptIdentified]
  );

  const handleNoInterceptsClick = useCallback(() => {
    if (readonly || hasRealIntercepts()) return;

    onInterceptIdentified({
      type: 'no_intercepts',
      data: null,
      timestamp: Date.now(),
    });
  }, [readonly, hasRealIntercepts, onInterceptIdentified]);

  const transformDataToCanvas = (x: number, y: number) => {
    const domain = [-4, 2] as [number, number];
    const range = [-5, 5] as [number, number];
    const width = 600;
    const height = 400;

    const [xMin, xMax] = domain;
    const [yMin, yMax] = range;

    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    const canvasX = ((x - xMin) / xRange) * width;
    const canvasY = height - ((y - yMin) / yRange) * height;

    return { canvasX, canvasY };
  };

  const formatCoordinate = (value: number) => {
    return Math.abs(value - Math.round(value)) < 0.01 ? String(Math.round(value)) : value.toFixed(1);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Identify the X-Intercepts</h3>

      <div className="relative">
        <svg
          ref={svgRef}
          width="100%"
          height="400"
          viewBox="0 0 600 400"
          className="border border-border rounded-lg bg-background cursor-crosshair"
          onClick={handleCanvasClick}
          role="img"
          aria-label="Canvas for identifying x-intercepts"
        >
          <line x1="0" y1="200" x2="600" y2="200" stroke="#374151" strokeWidth={2} />
          <line x1="300" y1="0" x2="300" y2="400" stroke="#374151" strokeWidth={2} />

          {identifiedIntercepts.map((intercept, index) => {
            const { canvasX, canvasY } = transformDataToCanvas(intercept.x, intercept.y);
            return (
              <g key={index}>
                <circle
                  cx={canvasX}
                  cy={canvasY}
                  r={8}
                  className="intercept-marker fill-blue-500 bg-blue-500 stroke-white stroke-2"
                />
                <text
                  x={canvasX}
                  y={canvasY - 15}
                  textAnchor="middle"
                  className="text-xs fill-foreground font-medium"
                >
                  {`${formatCoordinate(intercept.x)}, 0`}
                </text>
              </g>
            );
          })}
        </svg>

        {feedback && (
          <div
            className={`absolute top-2 right-2 px-3 py-1 rounded-md text-sm font-medium ${
              feedback.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>

      <button
        onClick={handleNoInterceptsClick}
        disabled={readonly || hasRealIntercepts()}
        className="px-4 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        No Real Solutions
      </button>
    </div>
  );
}
