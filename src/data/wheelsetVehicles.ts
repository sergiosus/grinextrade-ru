/**
 * WheelSet: локальный каталог марок/моделей и примеры подбора (шины/диски) по годам.
 * Без внешних API.
 *
 * Как расширять: см. комментарий внизу файла.
 */

export const WHEELSET_OTHER = 'Другое' as const;

function sortWithOtherLast(names: string[]): string[] {
  return names
    .filter((n) => n !== WHEELSET_OTHER)
    .sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));
}

export type BrandCatalog = { name: string; models: string[] };

/** Алфавит: марки и внутри каждой — модели (A–Я). «Другое» в UI из helpers, не дублировать здесь. */
export const WHEELSET_BRAND_CATALOG: BrandCatalog[] = [
  {
    name: 'Audi',
    models: ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q3', 'Q5', 'Q7', 'Q8'],
  },
  {
    name: 'BMW',
    models: ['1 Series', '3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X6', 'X7'],
  },
  {
    name: 'Chevrolet',
    models: ['Aveo', 'Captiva', 'Cruze', 'Tahoe', 'Trailblazer'],
  },
  {
    name: 'Ford',
    models: ['Explorer', 'Focus', 'Kuga', 'Mondeo', 'Transit'],
  },
  {
    name: 'Honda',
    models: ['Accord', 'Civic', 'CR-V', 'Pilot'],
  },
  {
    name: 'Hyundai',
    models: ['Creta', 'Elantra', 'Palisade', 'Santa Fe', 'Solaris', 'Sonata', 'Tucson'],
  },
  {
    name: 'Kia',
    models: ['Ceed', 'Cerato', 'K5', 'Mohave', 'Rio', 'Sorento', 'Sportage'],
  },
  {
    name: 'Lada',
    models: ['Granta', 'Largus', 'Niva', 'Vesta', 'Xray'],
  },
  {
    name: 'Lexus',
    models: ['ES', 'GX', 'IS', 'LX', 'NX', 'RX'],
  },
  {
    name: 'Mazda',
    models: ['CX-5', 'CX-7', 'CX-9', 'Mazda 3', 'Mazda 6'],
  },
  {
    name: 'Mercedes-Benz',
    models: ['A-Class', 'C-Class', 'E-Class', 'G-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'S-Class'],
  },
  {
    name: 'Mitsubishi',
    models: ['ASX', 'Lancer', 'Outlander', 'Pajero', 'Pajero Sport'],
  },
  {
    name: 'Nissan',
    models: ['Almera', 'Murano', 'Patrol', 'Qashqai', 'Teana', 'X-Trail'],
  },
  {
    name: 'Renault',
    models: ['Arkana', 'Duster', 'Koleos', 'Logan', 'Sandero'],
  },
  {
    name: 'Skoda',
    models: ['Karoq', 'Kodiaq', 'Octavia', 'Rapid', 'Superb'],
  },
  {
    name: 'Subaru',
    models: ['Forester', 'Impreza', 'Legacy', 'Outback', 'XV'],
  },
  {
    name: 'Toyota',
    models: ['Camry', 'Corolla', 'Fortuner', 'Highlander', 'Hilux', 'Land Cruiser', 'Prado', 'RAV4'],
  },
  {
    name: 'Volkswagen',
    models: ['Golf', 'Jetta', 'Passat', 'Polo', 'Teramont', 'Tiguan', 'Touareg'],
  },
  {
    name: 'Volvo',
    models: ['S60', 'S90', 'XC40', 'XC60', 'XC90'],
  },
];

export type WheelsetFitmentSample = {
  brand: string;
  model: string;
  yearRange: string;
  yearFrom: number;
  yearTo: number;
  tires: string[];
  wheels: [pcd: string, et: string, dia: string];
};

const Y = 2026;

/**
 * Примеры по бренд/модель/году. Несколько поколений — отдельные объекты.
 * Добавляй рядом с `findFitmentFor` и `modelHasFitmentSamples` для новых строк.
 */
export const WHEELSET_FITMENT_SAMPLES: WheelsetFitmentSample[] = [
  { brand: 'Audi', model: 'A4', yearRange: '2012–2015 (B8)', yearFrom: 2012, yearTo: 2015, tires: ['225/50 R17', '225/50 R18', '245/40 R18'], wheels: ['5x112', 'ET 29–47', 'DIA 66.5'] },
  { brand: 'Audi', model: 'A4', yearRange: '2016–2019 (B9)', yearFrom: 2016, yearTo: 2019, tires: ['225/50 R17', '245/40 R18', '255/30 R20'], wheels: ['5x112', 'ET 32–50', 'DIA 66.5'] },
  { brand: 'Audi', model: 'A4', yearRange: '2020–н.в. (B9 PA)', yearFrom: 2020, yearTo: Y, tires: ['225/50 R18', '245/40 R19', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.5'] },
  { brand: 'Audi', model: 'A6', yearRange: '2011–2018 (C7)', yearFrom: 2011, yearTo: 2018, tires: ['225/50 R18', '245/40 R19', '255/30 R20'], wheels: ['5x112', 'ET 28–50', 'DIA 66.5'] },
  { brand: 'Audi', model: 'A6', yearRange: '2018–н.в. (C8)', yearFrom: 2018, yearTo: Y, tires: ['225/50 R19', '245/45 R20', '255/35 R21'], wheels: ['5x112', 'ET 20–50', 'DIA 66.5'] },
  { brand: 'Audi', model: 'Q5', yearRange: '2011–2016 (8R)', yearFrom: 2011, yearTo: 2016, tires: ['235/60 R18', '255/50 R20', '265/45 R20'], wheels: ['5x112', 'ET 28–50', 'DIA 66.5'] },
  { brand: 'Audi', model: 'Q5', yearRange: '2017–н.в. (FY)', yearFrom: 2017, yearTo: Y, tires: ['225/50 R20', '255/40 R20', '235/50 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.5'] },
  { brand: 'Audi', model: 'Q7', yearRange: '2010–2015 (4L)', yearFrom: 2010, yearTo: 2015, tires: ['255/55 R18', '265/50 R20', '295/35 R21'], wheels: ['5x130', 'ET 35–65', 'DIA 78.1'] },
  { brand: 'Audi', model: 'Q7', yearRange: '2015–н.в. (4M)', yearFrom: 2015, yearTo: Y, tires: ['255/55 R19', '255/50 R20', '285/40 R22'], wheels: ['5x112', 'ET 20–40', 'DIA 66.5'] },
  { brand: 'BMW', model: '3 Series', yearRange: '2005–2012 (E90)', yearFrom: 2005, yearTo: 2012, tires: ['195/60 R16', '225/45 R17', '255/30 R20'], wheels: ['5x120', 'ET 20–50', 'DIA 72.6'] },
  { brand: 'BMW', model: '3 Series', yearRange: '2012–2018 (F30)', yearFrom: 2012, yearTo: 2018, tires: ['225/50 R17', '225/45 R18', '255/30 R20'], wheels: ['5x120', 'ET 34–50', 'DIA 72.6'] },
  { brand: 'BMW', model: '3 Series', yearRange: '2018–н.в. (G20)', yearFrom: 2018, yearTo: Y, tires: ['225/45 R18', '255/40 R19', '225/40 R20'], wheels: ['5x112', 'ET 25–40', 'DIA 66.6'] },
  { brand: 'BMW', model: '5 Series', yearRange: '2010–2016 (F10)', yearFrom: 2010, yearTo: 2016, tires: ['225/55 R17', '225/50 R18', '245/40 R19'], wheels: ['5x120', 'ET 20–50', 'DIA 72.6'] },
  { brand: 'BMW', model: '5 Series', yearRange: '2016–н.в. (G30)', yearFrom: 2016, yearTo: Y, tires: ['225/50 R19', '245/40 R20', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.6'] },
  { brand: 'BMW', model: 'X3', yearRange: '2010–2017 (F25)', yearFrom: 2010, yearTo: 2017, tires: ['225/55 R18', '245/50 R19', '275/30 R20'], wheels: ['5x120', 'ET 20–50', 'DIA 72.6'] },
  { brand: 'BMW', model: 'X3', yearRange: '2017–н.в. (G01)', yearFrom: 2017, yearTo: Y, tires: ['225/55 R19', '245/45 R20', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.6'] },
  { brand: 'BMW', model: 'X5', yearRange: '2010–2013 (E70)', yearFrom: 2010, yearTo: 2013, tires: ['255/55 R18', '265/50 R20', '285/30 R20'], wheels: ['5x120', 'ET 20–50', 'DIA 72.6'] },
  { brand: 'BMW', model: 'X5', yearRange: '2013–2018 (F15)', yearFrom: 2013, yearTo: 2018, tires: ['255/50 R19', '275/40 R20', '265/30 R22'], wheels: ['5x120', 'ET 35–45', 'DIA 72.6'] },
  { brand: 'BMW', model: 'X5', yearRange: '2018–н.в. (G05)', yearFrom: 2018, yearTo: Y, tires: ['255/50 R20', '275/40 R21', '245/30 R22'], wheels: ['5x112', 'ET 25–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'C-Class', yearRange: '2011–2014 (W204 FL)', yearFrom: 2011, yearTo: 2014, tires: ['205/60 R16', '225/45 R18', '225/50 R16'], wheels: ['5x112', 'ET 30–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'C-Class', yearRange: '2014–2021 (W205)', yearFrom: 2014, yearTo: 2021, tires: ['205/60 R16', '225/50 R17', '255/30 R20'], wheels: ['5x112', 'ET 30–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'C-Class', yearRange: '2021–н.в. (W206)', yearFrom: 2021, yearTo: Y, tires: ['225/50 R18', '225/45 R19', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'E-Class', yearRange: '2010–2015 (W212 FL)', yearFrom: 2010, yearTo: 2015, tires: ['225/55 R16', '245/40 R19', '225/50 R16'], wheels: ['5x112', 'ET 30–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'E-Class', yearRange: '2016–2020 (W213 pre-FL)', yearFrom: 2016, yearTo: 2020, tires: ['225/50 R18', '245/40 R19', '255/30 R20'], wheels: ['5x112', 'ET 30–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'E-Class', yearRange: '2020–н.в. (W213 FL)', yearFrom: 2020, yearTo: Y, tires: ['225/50 R18', '245/40 R20', '255/30 R20'], wheels: ['5x112', 'ET 35–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'GLC', yearRange: '2015–2019 (X253)', yearFrom: 2015, yearTo: 2019, tires: ['235/55 R19', '255/45 R20', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'GLC', yearRange: '2019–н.в. (X254)', yearFrom: 2019, yearTo: Y, tires: ['235/55 R20', '255/45 R21', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'GLE', yearRange: '2011–2018 (W166)', yearFrom: 2011, yearTo: 2018, tires: ['255/50 R19', '255/50 R20', '285/40 R22'], wheels: ['5x112', 'ET 40–50', 'DIA 66.6'] },
  { brand: 'Mercedes-Benz', model: 'GLE', yearRange: '2018–н.в. (W167)', yearFrom: 2018, yearTo: Y, tires: ['255/50 R20', '275/45 R21', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.6'] },
  { brand: 'Toyota', model: 'Camry', yearRange: '2002–2011 (XV30/XV40)', yearFrom: 2002, yearTo: 2011, tires: ['205/65 R15', '215/60 R16', '215/55 R17'], wheels: ['5x114.3', 'ET 35–50', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'Camry', yearRange: '2011–2017 (XV50)', yearFrom: 2011, yearTo: 2017, tires: ['215/60 R16', '215/55 R17', '225/45 R18'], wheels: ['5x114.3', 'ET 45', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'Camry', yearRange: '2018–н.в. (XV70)', yearFrom: 2018, yearTo: Y, tires: ['215/55 R17', '235/45 R18', '235/40 R19'], wheels: ['5x114.3', 'ET 40–50', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'Corolla', yearRange: '2000–2013 (E12–E150)', yearFrom: 2000, yearTo: 2013, tires: ['175/65 R14', '195/60 R15', '205/55 R16'], wheels: ['4x100 / 5x114.3', 'ET 40–50', 'DIA 54.1 / 60.1'] },
  { brand: 'Toyota', model: 'Corolla', yearRange: '2013–2018 (E160/E180)', yearFrom: 2013, yearTo: 2018, tires: ['195/65 R15', '205/55 R16', '225/40 R18'], wheels: ['5x114.3', 'ET 30–50', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'Corolla', yearRange: '2018–н.в. (E210)', yearFrom: 2018, yearTo: Y, tires: ['195/65 R15', '205/55 R16', '225/40 R18'], wheels: ['5x114.3', 'ET 30–50', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'RAV4', yearRange: '2012–2018 (XA40)', yearFrom: 2012, yearTo: 2018, tires: ['225/65 R17', '225/50 R20', '235/55 R19'], wheels: ['5x114.3', 'ET 30–50', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'RAV4', yearRange: '2018–н.в. (XA50)', yearFrom: 2018, yearTo: Y, tires: ['225/60 R18', '225/65 R17', '255/30 R20'], wheels: ['5x114.3', 'ET 25–50', 'DIA 60.1'] },
  { brand: 'Toyota', model: 'Land Cruiser', yearRange: '2005–2015 (J200)', yearFrom: 2005, yearTo: 2015, tires: ['245/60 R18', '265/50 R20', '285/45 R22'], wheels: ['5x150', 'ET 0–+50', 'DIA 110.1'] },
  { brand: 'Toyota', model: 'Land Cruiser', yearRange: '2015–н.в. (J200 / J300)', yearFrom: 2015, yearTo: Y, tires: ['255/60 R18', '265/50 R20', '285/50 R20'], wheels: ['5x150', 'ET 0–+50', 'DIA 110.1'] },
  { brand: 'Toyota', model: 'Prado', yearRange: '2002–2017 (J120/J150 FL)', yearFrom: 2002, yearTo: 2017, tires: ['245/60 R18', '265/55 R20', '275/30 R20'], wheels: ['6x139.7', 'ET 0–+25', 'DIA 106.1'] },
  { brand: 'Toyota', model: 'Prado', yearRange: '2017–н.в. (J150/J250)', yearFrom: 2017, yearTo: Y, tires: ['245/60 R18', '265/50 R20', '275/30 R20'], wheels: ['6x139.7', 'ET 0–+25', 'DIA 106.1'] },
  { brand: 'Lexus', model: 'ES', yearRange: '2011–2018 (XV60)', yearFrom: 2011, yearTo: 2018, tires: ['215/55 R17', '225/50 R18', '235/40 R18'], wheels: ['5x114.3', 'ET 32–50', 'DIA 60.1'] },
  { brand: 'Lexus', model: 'ES', yearRange: '2018–н.в. (ES300h)', yearFrom: 2018, yearTo: Y, tires: ['215/50 R20', '235/45 R18', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 60.1'] },
  { brand: 'Lexus', model: 'NX', yearRange: '2014–2020 (AGZ10/15)', yearFrom: 2014, yearTo: 2020, tires: ['225/55 R20', '225/60 R18', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 60.1'] },
  { brand: 'Lexus', model: 'NX', yearRange: '2021–н.в. (AAZH20)', yearFrom: 2021, yearTo: Y, tires: ['235/50 R20', '235/55 R19', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 60.1'] },
  { brand: 'Lexus', model: 'RX', yearRange: '2008–2015 (AL10)', yearFrom: 2008, yearTo: 2015, tires: ['235/55 R20', '235/60 R18', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 60.1'] },
  { brand: 'Lexus', model: 'RX', yearRange: '2015–н.в. (AL20+)', yearFrom: 2015, yearTo: Y, tires: ['235/55 R20', '235/65 R18', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 60.1'] },
  { brand: 'Lexus', model: 'GX', yearRange: '2010–2023 (J150)', yearFrom: 2010, yearTo: 2023, tires: ['265/60 R18', '255/30 R20', '275/30 R20'], wheels: ['5x150', 'ET 0–+30', 'DIA 110.1'] },
  { brand: 'Lexus', model: 'GX', yearRange: '2023–н.в. (J250)', yearFrom: 2023, yearTo: Y, tires: ['265/55 R20', '255/30 R20', '275/30 R20'], wheels: ['5x150', 'ET 0–+20', 'DIA 110.1'] },
  { brand: 'Lexus', model: 'LX', yearRange: '2015–н.в. (J200/J310)', yearFrom: 2015, yearTo: Y, tires: ['265/50 R20', '285/45 R22', '255/30 R20'], wheels: ['5x150', 'ET 0–+40', 'DIA 110.1'] },
  { brand: 'Volkswagen', model: 'Polo', yearRange: '2010–2020 (6R/6C)', yearFrom: 2010, yearTo: 2020, tires: ['175/70 R14', '195/50 R16', '215/30 R20'], wheels: ['5x100 / 4x100', 'ET 35–50', 'DIA 57.1 / 60.1'] },
  { brand: 'Volkswagen', model: 'Polo', yearRange: '2020–н.в.', yearFrom: 2020, yearTo: Y, tires: ['195/50 R20', '205/50 R20', '215/30 R20'], wheels: ['5x100', 'ET 40–47', 'DIA 57.1'] },
  { brand: 'Volkswagen', model: 'Passat', yearRange: '2010–2014 (B7)', yearFrom: 2010, yearTo: 2014, tires: ['215/55 R16', '205/30 R20', '235/45 R18'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Volkswagen', model: 'Passat', yearRange: '2014–2019 (B8)', yearFrom: 2014, yearTo: 2019, tires: ['215/55 R17', '235/30 R20', '235/40 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Volkswagen', model: 'Passat', yearRange: '2019–н.в.', yearFrom: 2019, yearTo: Y, tires: ['205/30 R20', '235/45 R18', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Volkswagen', model: 'Tiguan', yearRange: '2010–2015 (5N)', yearFrom: 2010, yearTo: 2015, tires: ['215/30 R20', '235/50 R20', '225/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Volkswagen', model: 'Tiguan', yearRange: '2016–н.в. (AD/II+)', yearFrom: 2016, yearTo: Y, tires: ['225/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x112', 'ET 35–50', 'DIA 57.1'] },
  { brand: 'Volkswagen', model: 'Touareg', yearRange: '2010–2018 (7P)', yearFrom: 2010, yearTo: 2018, tires: ['225/30 R20', '235/30 R20', '275/30 R20'], wheels: ['5x130 / 5x120', 'ET 20–50', 'DIA 71.6'] },
  { brand: 'Volkswagen', model: 'Touareg', yearRange: '2018–н.в. (CR)', yearFrom: 2018, yearTo: Y, tires: ['255/30 R20', '275/30 R20', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 66.5'] },
  { brand: 'Hyundai', model: 'Solaris', yearRange: '2010–2014 (RB)', yearFrom: 2010, yearTo: 2014, tires: ['175/70 R14', '185/55 R20', '175/30 R20'], wheels: ['4x100', 'ET 50–55', 'DIA 54.1'] },
  { brand: 'Hyundai', model: 'Solaris', yearRange: '2014–2017 (RB фейслифт)', yearFrom: 2014, yearTo: 2017, tires: ['185/65 R15', '195/30 R20', '175/30 R20'], wheels: ['4x100', 'ET 46', 'DIA 54.1'] },
  { brand: 'Hyundai', model: 'Solaris', yearRange: '2017–н.в. (HCR)', yearFrom: 2017, yearTo: Y, tires: ['185/65 R15', '195/30 R20', '205/30 R20'], wheels: ['4x100', 'ET 45–50', 'DIA 54.1'] },
  { brand: 'Hyundai', model: 'Creta', yearRange: '2016–2020 (GS)', yearFrom: 2016, yearTo: 2020, tires: ['205/30 R20', '215/60 R16', '225/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 67.1'] },
  { brand: 'Hyundai', model: 'Creta', yearRange: '2020–н.в. (GS II)', yearFrom: 2020, yearTo: Y, tires: ['195/30 R20', '215/55 R20', '225/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 67.1'] },
  { brand: 'Hyundai', model: 'Tucson', yearRange: '2010–2014 (LM)', yearFrom: 2010, yearTo: 2014, tires: ['215/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 67.1'] },
  { brand: 'Hyundai', model: 'Tucson', yearRange: '2015–н.в. (TL+)', yearFrom: 2015, yearTo: Y, tires: ['215/30 R20', '225/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Hyundai', model: 'Santa Fe', yearRange: '2010–2018 (DM/NC)', yearFrom: 2010, yearTo: 2018, tires: ['235/30 R20', '245/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 67.1'] },
  { brand: 'Hyundai', model: 'Santa Fe', yearRange: '2018–н.в. (TM)', yearFrom: 2018, yearTo: Y, tires: ['235/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'Rio', yearRange: '2010–2017 (UB/FB)', yearFrom: 2010, yearTo: 2017, tires: ['175/70 R14', '185/55 R20', '195/30 R20'], wheels: ['4x100', 'ET 45–52', 'DIA 54.1'] },
  { brand: 'Kia', model: 'Rio', yearRange: '2017–н.в. (Yb)', yearFrom: 2017, yearTo: Y, tires: ['185/65 R15', '195/30 R20', '205/30 R20'], wheels: ['4x100', 'ET 45–50', 'DIA 54.1'] },
  { brand: 'Kia', model: 'K5', yearRange: '2010–2015 (Optima)', yearFrom: 2010, yearTo: 2015, tires: ['205/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'K5', yearRange: '2015–2020', yearFrom: 2015, yearTo: 2020, tires: ['215/30 R20', '245/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'K5', yearRange: '2020–н.в.', yearFrom: 2020, yearTo: Y, tires: ['215/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'Sportage', yearRange: '2010–2015 (SL)', yearFrom: 2010, yearTo: 2015, tires: ['225/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'Sportage', yearRange: '2015–н.в. (QL+)', yearFrom: 2015, yearTo: Y, tires: ['215/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'Sorento', yearRange: '2010–2014 (XM)', yearFrom: 2010, yearTo: 2014, tires: ['225/30 R20', '245/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 67.1'] },
  { brand: 'Kia', model: 'Sorento', yearRange: '2014–н.в. (UM+)', yearFrom: 2014, yearTo: Y, tires: ['225/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Nissan', model: 'Qashqai', yearRange: '2010–2013 (J10)', yearFrom: 2010, yearTo: 2013, tires: ['215/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 40–50', 'DIA 66.1'] },
  { brand: 'Nissan', model: 'Qashqai', yearRange: '2013–н.в. (J11+)', yearFrom: 2013, yearTo: Y, tires: ['215/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 66.1'] },
  { brand: 'Nissan', model: 'X-Trail', yearRange: '2010–2014 (T31)', yearFrom: 2010, yearTo: 2014, tires: ['215/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 66.1'] },
  { brand: 'Nissan', model: 'X-Trail', yearRange: '2014–н.в. (T32+)', yearFrom: 2014, yearTo: Y, tires: ['225/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 66.1'] },
  { brand: 'Nissan', model: 'Teana', yearRange: '2010–2013 (J32)', yearFrom: 2010, yearTo: 2013, tires: ['205/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 35–50', 'DIA 66.1'] },
  { brand: 'Nissan', model: 'Teana', yearRange: '2013–н.в. (J33+)', yearFrom: 2013, yearTo: Y, tires: ['215/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 66.1'] },
  { brand: 'Mazda', model: 'Mazda 3', yearRange: '2001–2013 (BK/BL)', yearFrom: 2001, yearTo: 2013, tires: ['195/30 R20', '205/30 R20', '225/30 R20'], wheels: ['5x114.3', 'ET 45–55', 'DIA 67.1'] },
  { brand: 'Mazda', model: 'Mazda 3', yearRange: '2013–2019 (BM/BN)', yearFrom: 2013, yearTo: 2019, tires: ['195/30 R20', '215/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 67.1'] },
  { brand: 'Mazda', model: 'Mazda 3', yearRange: '2019–н.в. (BP)', yearFrom: 2019, yearTo: Y, tires: ['195/30 R20', '215/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Mazda', model: 'Mazda 6', yearRange: '2002–2012 (GG/GH)', yearFrom: 2002, yearTo: 2012, tires: ['195/30 R20', '215/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 67.1'] },
  { brand: 'Mazda', model: 'Mazda 6', yearRange: '2012–н.в. (GJ+)', yearFrom: 2012, yearTo: Y, tires: ['215/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Mazda', model: 'CX-5', yearRange: '2012–2016 (KE)', yearFrom: 2012, yearTo: 2016, tires: ['215/30 R20', '225/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 67.1'] },
  { brand: 'Mazda', model: 'CX-5', yearRange: '2016–н.в. (KF)', yearFrom: 2016, yearTo: Y, tires: ['225/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Mitsubishi', model: 'Outlander', yearRange: '2010–2012 (GF)', yearFrom: 2010, yearTo: 2012, tires: ['215/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 67.1'] },
  { brand: 'Mitsubishi', model: 'Outlander', yearRange: '2012–н.в. (III+)', yearFrom: 2012, yearTo: Y, tires: ['225/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 67.1'] },
  { brand: 'Mitsubishi', model: 'Pajero Sport', yearRange: '2008–2015', yearFrom: 2008, yearTo: 2015, tires: ['255/30 R20', '265/30 R20', '255/30 R20'], wheels: ['6x139.7', 'ET 0–+25', 'DIA 106.1'] },
  { brand: 'Mitsubishi', model: 'Pajero Sport', yearRange: '2015–н.в.', yearFrom: 2015, yearTo: Y, tires: ['255/30 R20', '275/30 R20', '255/30 R20'], wheels: ['6x139.7', 'ET 0–+20', 'DIA 106.1'] },
  { brand: 'Honda', model: 'Accord', yearRange: '2002–2012 (CL/CP)', yearFrom: 2002, yearTo: 2012, tires: ['195/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x114.3', 'ET 35–55', 'DIA 64.1'] },
  { brand: 'Honda', model: 'Accord', yearRange: '2012–н.в. (9 gen+)', yearFrom: 2012, yearTo: Y, tires: ['205/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 64.1'] },
  { brand: 'Honda', model: 'CR-V', yearRange: '2010–2014 (RE)', yearFrom: 2010, yearTo: 2014, tires: ['225/30 R20', '235/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 30–50', 'DIA 64.1'] },
  { brand: 'Honda', model: 'CR-V', yearRange: '2014–н.в. (RM+)', yearFrom: 2014, yearTo: Y, tires: ['235/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 64.1'] },
  { brand: 'Skoda', model: 'Octavia', yearRange: '2000–2012 (1Z)', yearFrom: 2000, yearTo: 2012, tires: ['195/30 R20', '205/30 R20', '255/30 R20'], wheels: ['5x112', 'ET 30–50', 'DIA 57.1'] },
  { brand: 'Skoda', model: 'Octavia', yearRange: '2012–2019 (5E)', yearFrom: 2012, yearTo: 2019, tires: ['195/30 R20', '225/30 R20', '255/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Skoda', model: 'Octavia', yearRange: '2019–н.в. (NX)', yearFrom: 2019, yearTo: Y, tires: ['205/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Skoda', model: 'Kodiaq', yearRange: '2016–н.в.', yearFrom: 2016, yearTo: Y, tires: ['215/30 R20', '255/30 R20', '275/30 R20'], wheels: ['5x112', 'ET 20–50', 'DIA 57.1'] },
  { brand: 'Renault', model: 'Logan', yearRange: '2010–2013', yearFrom: 2010, yearTo: 2013, tires: ['185/30 R20', '195/30 R20', '255/30 R20'], wheels: ['4x100', 'ET 30–50', 'DIA 60.1'] },
  { brand: 'Renault', model: 'Logan', yearRange: '2013–н.в.', yearFrom: 2013, yearTo: Y, tires: ['185/30 R20', '195/30 R20', '255/30 R20'], wheels: ['4x100', 'ET 30–50', 'DIA 60.1'] },
  { brand: 'Renault', model: 'Duster', yearRange: '2010–2021', yearFrom: 2010, yearTo: 2021, tires: ['205/30 R20', '215/30 R20', '255/30 R20'], wheels: ['5x114.3 / 4x100', 'ET 20–50', 'DIA 60.1 / 66.1'] },
  { brand: 'Renault', model: 'Duster', yearRange: '2021–н.в.', yearFrom: 2021, yearTo: Y, tires: ['205/30 R20', '215/30 R20', '255/30 R20'], wheels: ['5x114.3', 'ET 20–50', 'DIA 66.1'] },
  { brand: 'Lada', model: 'Vesta', yearRange: '2015–н.в.', yearFrom: 2015, yearTo: Y, tires: ['175/65 R15', '185/65 R15', '195/30 R20'], wheels: ['4x100', 'ET 40–45', 'DIA 60.1'] },
  { brand: 'Lada', model: 'Niva', yearRange: '2010–н.в. (Travel/Legend)', yearFrom: 2010, yearTo: Y, tires: ['205/30 R20', '225/30 R20', '235/30 R20'], wheels: ['5x139.7', 'ET 0–+25', 'DIA 98.5'] },
];

export function isOtherBrand(brandName: string): boolean {
  return brandName.trim().toLowerCase() === 'другое';
}

export function isOtherModel(modelName: string): boolean {
  return modelName.trim().toLowerCase() === 'другое';
}

export function getSortedBrandNames(): string[] {
  return [...sortWithOtherLast(WHEELSET_BRAND_CATALOG.map((b) => b.name)), WHEELSET_OTHER];
}

export function getSortedModels(brandName: string): string[] {
  if (isOtherBrand(brandName)) return [];
  const b = WHEELSET_BRAND_CATALOG.find((x) => x.name === brandName);
  if (!b) return [];
  return [...sortWithOtherLast(b.models), WHEELSET_OTHER];
}

/** true, если для марки+модели в каталоге вообще есть примеры (по годам). */
export function modelHasFitmentSamples(brand: string, model: string): boolean {
  return WHEELSET_FITMENT_SAMPLES.some((r) => r.brand === brand && r.model === model);
}

export function findFitmentFor(brand: string, model: string, year: number): WheelsetFitmentSample | null {
  for (const row of WHEELSET_FITMENT_SAMPLES) {
    if (row.brand === brand && row.model === model && year >= row.yearFrom && year <= row.yearTo) {
      return row;
    }
  }
  return null;
}

function yearDistanceToRange(year: number, r: WheelsetFitmentSample): number {
  if (year >= r.yearFrom && year <= r.yearTo) return 0;
  if (year < r.yearFrom) return r.yearFrom - year;
  return year - r.yearTo;
}

export function getAllFitmentSamplesForModel(brand: string, model: string): WheelsetFitmentSample[] {
  return WHEELSET_FITMENT_SAMPLES.filter((r) => r.brand === brand && r.model === model);
}

export type VehicleType = 'sedan' | 'crossover' | 'suv' | 'pickup';

export type GenericFitmentHint = {
  vehicleType: VehicleType;
  rimDiameters: string;
  tiresExamples: string[];
};

export type FitmentDisplayResult =
  | { kind: 'exact'; sample: WheelsetFitmentSample }
  | { kind: 'model'; sample: WheelsetFitmentSample }
  | { kind: 'generic'; hint: GenericFitmentHint }
  | { kind: 'none' };

function uniq<T>(arr: T[]): T[] {
  const out: T[] = [];
  for (const x of arr) if (!out.includes(x)) out.push(x);
  return out;
}

function joinOrDash(values: string[]): string {
  const cleaned = values.map((v) => v.trim()).filter(Boolean);
  if (cleaned.length === 0) return '—';
  return uniq(cleaned).join(' / ');
}

function buildModelLevelSample(brand: string, model: string): WheelsetFitmentSample | null {
  const rows = getAllFitmentSamplesForModel(brand, model);
  if (rows.length === 0) return null;

  const yearFrom = Math.min(...rows.map((r) => r.yearFrom));
  const yearTo = Math.max(...rows.map((r) => r.yearTo));

  const tires = uniq(rows.flatMap((r) => r.tires)).slice(0, 8);
  const pcd = joinOrDash(rows.map((r) => r.wheels[0]));
  const et = joinOrDash(rows.map((r) => r.wheels[1]));
  const dia = joinOrDash(rows.map((r) => r.wheels[2]));

  return {
    brand,
    model,
    yearRange: `${yearFrom}–${yearTo}`,
    yearFrom,
    yearTo,
    tires,
    wheels: [pcd, et, dia],
  };
}

function inferVehicleType(brand: string, model: string): VehicleType | null {
  const b = brand.trim().toLowerCase();
  const m = model.trim().toLowerCase();
  const key = `${b} ${m}`;

  // Пикапы (явные модели).
  if (/(^| )hilux($| )/.test(key) || /(^| )ranger($| )/.test(key) || /(^| )navara($| )/.test(key)) return 'pickup';

  // SUV (рамные/крупные).
  if (
    /(land cruiser|prado|patrol|tahoe|trailblazer|fortuner|gx|lx|g-class|gls|x7|q7|q8|xc90|pajero|pajero sport)/.test(key)
  ) {
    return 'suv';
  }

  // Кроссоверы (городские SUV).
  if (/(rav4|cr-v|cx-|outlander|x-trail|qashqai|tucson|sportage|sorento|kodiaq|karoq|tiguan|touareg|q3|q5|x1|x3|gla|glc|gle|xc40|xc60|asx|captiva|kuga|duster|arkana|koleos|nx|rx|highlander|pilot)/.test(key))
    return 'crossover';

  // Седаны/хэтчи/универсалы (по умолчанию для легковых).
  if (/(a3|a4|a5|a6|a7|a8|3 series|5 series|7 series|c-class|e-class|s-class|camry|corolla|accord|civic|elantra|sonata|k5|mondeo|passat|jetta|polo|golf|octavia|rapid|superb|logan|sandero|vesta|granta|rio|ceed|cerato|mazda 3|mazda 6|s60|s90)/.test(key))
    return 'sedan';

  return null;
}

function genericHintFor(type: VehicleType): GenericFitmentHint {
  switch (type) {
    case 'sedan':
      return { vehicleType: type, rimDiameters: 'R15–R19', tiresExamples: ['195/65 R15', '205/55 R16', '215/55 R17', '225/45 R18'] };
    case 'crossover':
      return { vehicleType: type, rimDiameters: 'R16–R20', tiresExamples: ['215/65 R16', '225/60 R17', '235/55 R18', '235/50 R19'] };
    case 'suv':
      return { vehicleType: type, rimDiameters: 'R17–R22', tiresExamples: ['245/65 R17', '265/60 R18', '275/55 R19', '285/45 R22'] };
    case 'pickup':
      return { vehicleType: type, rimDiameters: 'R16–R20', tiresExamples: ['245/70 R16', '265/65 R17', '265/60 R18', '275/55 R20'] };
  }
}

/**
 * exact — год попал в диапазон; fallback — для марка+модель есть данные, но не на этот год;
 * none — для пары в каталоге нет ни одной строки.
 */
export function resolveFitmentForDisplay(brand: string, model: string, year: number): FitmentDisplayResult {
  const exact = findFitmentFor(brand, model, year);
  if (exact) return { kind: 'exact', sample: exact };

  const modelLevel = buildModelLevelSample(brand, model);
  if (modelLevel) return { kind: 'model', sample: modelLevel };

  const inferred = inferVehicleType(brand, model);
  if (inferred) return { kind: 'generic', hint: genericHintFor(inferred) };

  return { kind: 'none' };
}

export function buildWheelParamLine(f: Pick<WheelsetFitmentSample, 'wheels'>): string {
  const [pcd, et, dia] = f.wheels;
  return `${pcd}, ${et}, ${dia}`;
}

const YEAR_MIN = 2000;
const YEAR_MAX = 2026;

export function getYearOptionsDescending(): number[] {
  const out: number[] = [];
  for (let y = YEAR_MAX; y >= YEAR_MIN; y -= 1) out.push(y);
  return out;
}

/*
 * Как расширять: добавьте строки в WHEELSET_BRAND_CATALOG; в WHEELSET_FITMENT_SAMPLES — brand/model/год.
 * `resolveFitmentForDisplay`: сначала точный год, иначе ближайшая по году запись той же модели, иначе none.
 */
