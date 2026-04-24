export type VehicleBrand =
  | 'Audi'
  | 'BMW'
  | 'Mercedes-Benz'
  | 'Lexus'
  | 'Land Rover'
  | 'Porsche'
  | 'Tesla'
  | 'Toyota'
  | 'Volkswagen'
  | 'Volvo'
  | 'Cadillac'
  | 'Infiniti'
  | 'Jaguar'
  | 'Genesis'
  | 'Hyundai'
  | 'Kia'
  | 'Nissan'
  | 'Chevrolet';

export const PB_BRANDS: VehicleBrand[] = [
  'Audi',
  'BMW',
  'Mercedes-Benz',
  'Lexus',
  'Land Rover',
  'Porsche',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
  'Cadillac',
  'Infiniti',
  'Jaguar',
  'Genesis',
  'Hyundai',
  'Kia',
  'Nissan',
  'Chevrolet',
];

export const PB_MODELS: Record<VehicleBrand, string[]> = {
  Audi: ['A4', 'A6', 'A7', 'A8', 'Q5', 'Q7', 'Q8', 'e-tron'],
  BMW: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X6', 'X7', 'iX'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'G-Class', 'Maybach S-Class'],
  Lexus: ['ES', 'GS', 'LS', 'NX', 'RX', 'GX', 'LX'],
  'Land Rover': ['Range Rover', 'Range Rover Sport', 'Velar', 'Discovery', 'Defender'],
  Porsche: ['Cayenne', 'Macan', 'Panamera', '911', 'Taycan'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Land Cruiser 200', 'Land Cruiser 300', 'Prado'],
  Volkswagen: ['Polo', 'Golf', 'Passat', 'Tiguan', 'Touareg', 'Teramont'],
  Volvo: ['S60', 'S90', 'XC40', 'XC60', 'XC90'],
  Cadillac: ['Escalade', 'XT5', 'XT6', 'CT5', 'CT6'],
  Infiniti: ['Q50', 'Q60', 'QX50', 'QX60', 'QX80'],
  Jaguar: ['XE', 'XF', 'F-Pace', 'E-Pace', 'I-Pace'],
  Genesis: ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  Hyundai: ['Solaris', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade'],
  Kia: ['Rio', 'Cerato', 'K5', 'Sportage', 'Sorento', 'Carnival', 'Mohave'],
  Nissan: ['Qashqai', 'X-Trail', 'Patrol', 'Pathfinder', 'Murano', 'Teana'],
  Chevrolet: ['Tahoe', 'Suburban', 'Captiva', 'Trailblazer', 'Camaro', 'Corvette'],
};

export const PB_YEAR_MIN = 2005;
export const PB_YEAR_MAX = 2026;
export const PB_YEARS: number[] = Array.from({ length: PB_YEAR_MAX - PB_YEAR_MIN + 1 }, (_, i) => PB_YEAR_MAX - i);

export type EngineKey =
  | '1.4_gas'
  | '1.6_gas'
  | '2.0_gas'
  | '2.0_diesel'
  | '2.5_gas'
  | '3.0_diesel'
  | '3.0_gas'
  | '3.5_gas'
  | '4.0_gas'
  | '4.4_gas'
  | '5.0_gas'
  | 'hybrid'
  | 'electric';

export const PB_ENGINE_ORDER: EngineKey[] = [
  '1.4_gas',
  '1.6_gas',
  '2.0_gas',
  '2.0_diesel',
  '2.5_gas',
  '3.0_gas',
  '3.0_diesel',
  '3.5_gas',
  '4.0_gas',
  '4.4_gas',
  '5.0_gas',
  'hybrid',
  'electric',
];

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function isBigSuv(brand: string, model: string): boolean {
  const key = `${brand} ${model}`.toLowerCase();
  return /(q7|q8|x6|x7|gls|g-class|maybach|gx|lx|range rover|defender|discovery|cayenne|highlander|land cruiser|prado|touareg|teramont|patrol|pathfinder|murano|tahoe|suburban|trailblazer|escalade|qx80|gv80|palisade|santa fe|sorento|mohave)/.test(
    key
  );
}

function isSmallCar(brand: string, model: string): boolean {
  const key = `${brand} ${model}`.toLowerCase();
  return /(polo|golf|corolla|rio|solaris|elantra|cerato|qashqai)/.test(key);
}

export function getEngineKeysForSelection(brand?: string, model?: string): EngineKey[] {
  if (!brand) return PB_ENGINE_ORDER;
  const b = brand.trim();
  const m = (model ?? '').trim();

  // Tesla is electric-only.
  if (b === 'Tesla') return ['electric'];
  // Porsche Taycan is electric-only.
  if (b === 'Porsche' && m === 'Taycan') return ['electric'];

  const base = isSmallCar(b, m)
    ? (['1.4_gas', '1.6_gas', '2.0_gas', 'hybrid', 'electric'] as EngineKey[])
    : isBigSuv(b, m)
      ? (['2.0_gas', '2.0_diesel', '2.5_gas', '3.0_gas', '3.0_diesel', '3.5_gas', '4.0_gas', '4.4_gas', '5.0_gas', 'hybrid', 'electric'] as EngineKey[])
      : (['1.6_gas', '2.0_gas', '2.0_diesel', '2.5_gas', '3.0_gas', '3.0_diesel', 'hybrid', 'electric'] as EngineKey[]);

  return uniq(base);
}

