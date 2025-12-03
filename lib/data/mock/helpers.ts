/**
 * Helper functions for handling localized mock data
 */

export type Locale = 'id' | 'en';

/**
 * Get localized field value from an object
 * @param item - The data object containing localized fields
 * @param fieldName - The base field name (without _id or _en suffix)
 * @param locale - The locale to retrieve ('id' or 'en')
 * @returns The localized value
 *
 * @example
 * const event = { title_id: 'Judul', title_en: 'Title' };
 * getLocaleField(event, 'title', 'id'); // Returns 'Judul'
 * getLocaleField(event, 'title', 'en'); // Returns 'Title'
 */
export function getLocaleField<T extends Record<string, any>>(
  item: T,
  fieldName: string,
  locale: Locale
): string {
  const localizedFieldName = `${fieldName}_${locale}` as keyof T;
  const value = item[localizedFieldName];

  if (typeof value === 'string') {
    return value;
  }

  // Fallback to Indonesian if English not available
  if (locale === 'en') {
    const fallbackFieldName = `${fieldName}_id` as keyof T;
    const fallbackValue = item[fallbackFieldName];
    if (typeof fallbackValue === 'string') {
      return fallbackValue;
    }
  }

  console.warn(`Missing localized field: ${String(localizedFieldName)} for item:`, item);
  return '';
}

/**
 * Get array of localized field values
 * @param item - The data object
 * @param fieldName - The base field name for array (e.g., 'badges')
 * @param locale - The locale to retrieve
 * @returns Array of localized values
 */
export function getLocaleArrayField<T extends Record<string, any>>(
  item: T,
  fieldName: string,
  locale: Locale
): string[] {
  const localizedFieldName = `${fieldName}_${locale}` as keyof T;
  const value = item[localizedFieldName];

  if (Array.isArray(value)) {
    return value;
  }

  // Fallback to Indonesian if English not available
  if (locale === 'en') {
    const fallbackFieldName = `${fieldName}_id` as keyof T;
    const fallbackValue = item[fallbackFieldName];
    if (Array.isArray(fallbackValue)) {
      return fallbackValue;
    }
  }

  return [];
}

/**
 * Create a localized object from flat structure
 * Useful for components that expect nested translations
 */
export function createLocalizedObject<T extends Record<string, any>>(
  item: T,
  fields: string[],
  locale: Locale
): Record<string, any> {
  const result: Record<string, any> = {};

  fields.forEach(field => {
    result[field] = getLocaleField(item, field, locale);
  });

  return result;
}
