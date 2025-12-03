# Mock Data Structure Documentation

## Overview

This directory contains mock data structure documentation for the Filosofi Yogya website, designed for **Directus CMS compatibility**. All data uses **flat structure** with localized field naming (e.g., `title_id`, `title_en`) to align with Directus best practices.

## 📁 Directory Structure

```
lib/data/
├── mock/                       # Mock data structure templates
│   ├── types/                  # TypeScript type definitions
│   │   ├── agenda-event.types.ts
│   │   ├── destinasi-wisata.types.ts
│   │   ├── spot-nongkrong.types.ts
│   │   ├── trending.types.ts
│   │   ├── encyclopedia.types.ts
│   │   ├── umkm-lokal.types.ts
│   │   └── index.ts           # Exports all types
│   ├── agenda-event.data.ts   # Event data (5 items)
│   ├── destinasi-wisata.data.ts # Destination data (5 items)
│   ├── helpers.ts             # Helper functions for locale handling
│   ├── index.ts               # Main export file
│   └── README.md              # This file
└── mapLocations.ts            # ✅ MAP LOCATIONS DATA (29 items) - ALREADY IMPLEMENTED
```

## ✅ Existing Data: Map Locations

### `lib/data/mapLocations.ts`

**Status:** ✅ **ALREADY IMPLEMENTED** and ready for Directus migration

This file contains **29 map locations** across Yogyakarta in the correct flat structure format:

```typescript
export interface SiteLocation {
  id: string;
  name_id: string;              // ✅ Flat structure
  name_en: string;              // ✅ Flat structure
  description_id: string;       // ✅ Flat structure
  description_en: string;       // ✅ Flat structure
  address_id: string;           // ✅ Flat structure
  address_en: string;           // ✅ Flat structure
  category: SiteCategory;
  coordinates: { lat: number; lng: number; };
  // ... other fields
}
```

**Categories Available (7):**
1. `heritage` - Warisan Budaya (5 items)
2. `monument` - Monumen/Tugu (3 items)
3. `religious` - Tempat Ibadah (2 items)
4. `tourism` - Tempat Wisata (4 items)
5. `umkm` - UMKM/Kerajinan (5 items)
6. `culinary` - Kuliner (7 items)
7. `market` - Pasar Tradisional (3 items)

**Total:** 29 locations

**For Directus Migration:**
- Collection name: `map_locations`
- All fields already use flat structure ✅
- No conversion needed - ready to import! ✅

---

## 🌍 Localization Strategy: Flat Structure

We use a **flat structure** for multi-language support, which is Directus's recommended approach:

### ✅ Flat Structure (Used)
```typescript
{
  id: 1,
  slug: 'event-jogja-1',
  title_id: 'Judul Indonesia',
  title_en: 'English Title',
  description_id: 'Deskripsi ID',
  description_en: 'Description EN',
  // ... other fields
}
```

### ❌ Nested Structure (NOT Used)
```typescript
// NOT USED - for reference only
{
  id: 1,
  slug: 'event-jogja-1',
  translations: {
    id: { title: 'Judul Indonesia', description: 'Deskripsi ID' },
    en: { title: 'English Title', description: 'Description EN' }
  }
}
```

---

## 📊 Data Collections Overview

### 1. **Map Locations** (✅ IMPLEMENTED - `lib/data/mapLocations.ts`)
**Collection Name for Directus:** `map_locations`

**Fields:**
- `id` (string, primary key)
- `name_id`, `name_en` (string)
- `description_id`, `description_en` (text)
- `address_id`, `address_en` (string)
- `category` (enum: 'heritage', 'monument', 'religious', 'tourism', 'umkm', 'culinary', 'market')
- `coordinates` (object: {lat, lng})
- `entryFee` (object: {local, foreign}, optional)
- `openingHours` (string, optional)
- `facilities` (JSON array, optional)
- `products` (JSON array, optional for UMKM)
- `priceRange` (string, optional)
- `contact` (object, optional)
- `socialMedia` (object, optional)
- `images` (JSON array, optional)
- `googleMapsUrl` (string, optional)

**Current Count:** 29 items ✅

---

### 2. **Agenda Event** (Template - `agenda-event.data.ts`)
**Collection Name for Directus:** `agenda_events`

**Fields:**
- `id` (integer, primary key)
- `slug` (string, unique)
- `title_id`, `title_en` (string)
- `category_id`, `category_en` (string)
- `date_id`, `date_en` (string)
- `time_id`, `time_en` (string)
- `location_id`, `location_en` (string)
- `price_id`, `price_en` (string)
- `age_id`, `age_en` (string)
- `image` (string - URL or asset ID)
- `gradient` (string - Tailwind gradient class)
- `bgColor` (string - Tailwind background class)
- `status` (enum: 'published', 'draft', 'archived')
- `created_at`, `updated_at` (timestamp)

**Template Count:** 5 items

---

### 3. **Destinasi Wisata** (Template - `destinasi-wisata.data.ts`)
**Collection Name for Directus:** `destinasi_wisata`

**Fields:**
- `id` (integer, primary key)
- `slug` (string, unique)
- `name_id`, `name_en` (string)
- `location_id`, `location_en` (string)
- `description_id`, `description_en` (text)
- `hours_id`, `hours_en` (string)
- `image` (string - URL or asset ID)
- `latitude`, `longitude` (decimal, optional)
- `status` (enum: 'published', 'draft', 'archived')
- `created_at`, `updated_at` (timestamp)

**Template Count:** 5 items

---

### 4-6. Other Collections (Types Defined)

Type definitions are available in `/types` folder for:
- **Spot Nongkrong** (`spot-nongkrong.types.ts`)
- **Trending Articles** (`trending.types.ts`)
- **Encyclopedia** (`encyclopedia.types.ts`)
- **UMKM Lokal** (`umkm-lokal.types.ts`)

---

## 🔧 Helper Functions

### `getLocaleField(item, fieldName, locale)`
Gets a localized field value from an object.

```typescript
import { getLocaleField } from '@/lib/data/mock';

const event = { title_id: 'Judul', title_en: 'Title' };
const title = getLocaleField(event, 'title', 'id'); // Returns 'Judul'
```

### `getLocaleArrayField(item, fieldName, locale)`
Gets an array of localized values.

```typescript
const badges = getLocaleArrayField(item, 'badges', 'en');
```

### `createLocalizedObject(item, fields, locale)`
Creates a localized object from flat structure.

```typescript
const localized = createLocalizedObject(item, ['title', 'category'], 'id');
```

---

## 🚀 Migration Guide for Backend Team

### Priority 1: Map Locations (READY TO MIGRATE)

#### Step 1: Create Collection in Directus
Create `map_locations` collection with all fields from `SiteLocation` interface.

#### Step 2: Import Data
The data in `lib/data/mapLocations.ts` is **production-ready** with 29 real locations.

```javascript
import { mapLocations } from './lib/data/mapLocations';

// Import to Directus
for (const location of mapLocations) {
  await directus.items('map_locations').createOne(location);
}
```

#### Step 3: Configure Relations
- Link to categories if using relational structure
- Set up proper access controls
- Configure search/filter fields

---

### Priority 2: Other Collections (Templates Available)

For Agenda Events, Destinasi Wisata, and other collections:

1. Use type definitions in `/types` folder
2. Create collections in Directus matching the interfaces
3. Import template data or create real data
4. Test API endpoints

---

## 📝 Frontend Usage Example

```typescript
// Import map locations (already implemented)
import { mapLocations, getLocaleField } from '@/lib/data/mock';

function LocationList({ locale }: { locale: 'id' | 'en' }) {
  return (
    <div>
      {mapLocations.map(location => (
        <div key={location.id}>
          <h2>{getLocaleField(location, 'name', locale)}</h2>
          <p>{getLocaleField(location, 'description', locale)}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 Benefits of This Structure

1. **Directus Compatible:** Flat structure works seamlessly with Directus
2. **Single Source of Truth:** Centralized data management
3. **Type Safe:** TypeScript interfaces ensure data consistency
4. **Easy Migration:** Direct mapping from mock to CMS
5. **Maintainable:** Clear separation of data, types, and helpers
6. **Scalable:** Easy to add new fields or locales

---

## ⚠️ Important Notes for Map Locations

### Current Implementation Status

The `mapLocations.ts` file contains **REAL DATA** for 29 locations in Yogyakarta, including:

- ✅ 5 Heritage sites (Keraton, Sonobudoyo Museum, Prambanan, Vredeburg, Makam Imogiri)
- ✅ 3 Monuments (Tugu, Panggung Krapyak, Monjali)
- ✅ 4 Tourism spots (Malioboro, Alun-alun Kidul, Parangtritis, Kaliurang)
- ✅ 5 UMKM locations (Batik, Silver craft, Wayang, Keris, Pottery)
- ✅ 7 Culinary spots (Gudeg Yu Djum, Bakpia, Cafes, Warungs)
- ✅ 2 Religious sites (Masjid Gedhe, Gereja Santo Fransiskus)
- ✅ 3 Traditional markets (Beringharjo, Kranggan, Ngasem)

### Data Quality
- ✅ Real coordinates (latitude/longitude)
- ✅ Real addresses
- ✅ Real opening hours
- ✅ Real entry fees
- ✅ Real contact information
- ✅ Google Maps URLs

### Migration Priority
**Map Locations should be migrated FIRST** because:
1. Data is complete and production-ready
2. Already used in interactive map components
3. Critical for main features (map page, location search)
4. No additional data preparation needed

---

## 📞 Next Steps

### For Backend Team:
1. ✅ Review `lib/data/mapLocations.ts` structure
2. ✅ Create `map_locations` collection in Directus
3. ✅ Import 29 locations
4. Configure API endpoints and permissions
5. Test frontend integration

### For Frontend Team:
1. Continue using `import { mapLocations } from '@/lib/data/mapLocations'`
2. When Directus API is ready, switch to API calls
3. Use same data structure (no frontend changes needed)

---

**Last Updated:** January 2025
**Data Status:** Map Locations (29 items) - ✅ PRODUCTION READY
