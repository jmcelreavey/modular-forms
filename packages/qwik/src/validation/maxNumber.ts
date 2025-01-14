import { $, type QRL } from '@builder.io/qwik';
import type { MaybeValue } from '../types';

type Value = MaybeValue<number>;

/**
 * Creates a validation functions that validates a number.
 *
 * @deprecated Please use `maxRange` instead.
 *
 * @param requirement The maximum number.
 * @param error The error message.
 *
 * @returns A validation function.
 */
export function maxNumber(
  requirement: number,
  error: string
): QRL<(value: Value) => string> {
  return $((value: Value) =>
    (value || value === 0) && value > requirement ? error : ''
  );
}
