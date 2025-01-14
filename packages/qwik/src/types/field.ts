import type {
  NoSerialize,
  PropFunction,
  QRL,
  QwikChangeEvent,
  QwikFocusEvent,
} from '@builder.io/qwik';
import type { FieldPath, FieldPathValue } from './path';
import type { Maybe, MaybePromise, MaybeValue } from './utils';

/**
 * Value type of a field.
 */
export type FieldValue = MaybeValue<
  | string
  | string[]
  | number
  | boolean
  | NoSerialize<Blob>
  | NoSerialize<Blob[]>
  | NoSerialize<File>
  | NoSerialize<File[]>
  | Date
>;

/**
 * Value type of the form fields.
 */
export type FieldValues = {
  [name: string]: FieldValue | FieldValues | (FieldValue | FieldValues)[];
};

/**
 * Value type of the field type.
 */
export type FieldType<T> = T extends MaybeValue<string>
  ? 'string'
  : T extends MaybeValue<string[]>
  ? 'string[]'
  : T extends MaybeValue<number>
  ? 'number'
  : T extends MaybeValue<boolean>
  ? 'boolean'
  : T extends MaybeValue<NoSerialize<Blob> | NoSerialize<File>>
  ? 'File'
  : T extends MaybeValue<NoSerialize<Blob[]> | NoSerialize<File[]>>
  ? 'File[]'
  : T extends MaybeValue<Date>
  ? 'Date'
  : never;

/**
 * HTML element type of a field.
 */
export type FieldElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

/**
 * Function type to validate a field.
 */
export type ValidateField<TFieldValue> = (
  value: TFieldValue | undefined
) => MaybePromise<string>;

/**
 * Value type ot the field store.
 *
 * Notice: The initial value is used for resetting and may only be changed
 * during this process. It does not move when a field is moved. The start
 * value, on the other hand, is used to determine whether the field is dirty
 * and moves with it.
 */
export type FieldStore<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> = {
  internal: {
    initialValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    startValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
    validate: QRL<ValidateField<FieldPathValue<TFieldValues, TFieldName>>>[];
    elements: FieldElement[];
    consumers: number[];
  };
  name: TFieldName;
  value: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
  error: string;
  active: boolean;
  touched: boolean;
  dirty: boolean;
};

/**
 * Value type of the field element props.
 */
export type FieldElementProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> = {
  name: TFieldName;
  autoFocus: boolean;
  ref: PropFunction<(element: Element) => void>;
  onInput$: PropFunction<(event: Event, element: FieldElement) => void>;
  onChange$: PropFunction<
    (event: QwikChangeEvent<FieldElement>, element: FieldElement) => void
  >;
  onBlur$: PropFunction<
    (event: QwikFocusEvent<FieldElement>, element: FieldElement) => void
  >;
};

/**
 * Value type of the internal raw field state.
 */
export type RawFieldState<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>
> = {
  startValue: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
  value: Maybe<FieldPathValue<TFieldValues, TFieldName>>;
  error: string;
  active: boolean;
  touched: boolean;
  dirty: boolean;
};
