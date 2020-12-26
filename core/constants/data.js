export const propertyFor = [
  { value: 'rent', text: 'Rent' },
  { value: 'sell', text: 'Sell' }
];

export const rentPropertyType = [
  { value: 'any', text: 'Any' },
  { value: 'room', text: 'Room' },
  { value: 'apartment', text: 'Apartment' },
  { value: 'condominium', text: 'Condominium' },
  { value: 'house', text: 'House' },
  { value: 'office', text: 'Office' },
  { value: 'villa', text: 'Villa' },
  { value: 'land', text: 'Land' },
  { value: 'floor', text: 'Floor' },
  { value: 'building', text: 'Building' },
  { value: 'cottage', text: 'Cottage' },
  { value: 'store', text: 'Store' },
  { value: 'farm', text: 'Farm' },
  { value: 'warehouse', text: 'Warehouse' }
  // { value: 'garage', text: 'Garage' }
];

export const sellPropertyType = [
  { value: 'any', text: 'Any' },
  { value: 'apartment', text: 'Apartment' },
  { value: 'condominium', text: 'Condominium' },
  { value: 'house', text: 'House' },
  { value: 'office', text: 'Office' },
  { value: 'villa', text: 'Villa' },
  { value: 'land', text: 'Land' },
  { value: 'building', text: 'Building' },
  { value: 'cottage', text: 'Cottage' },
  { value: 'store', text: 'Store' },
  { value: 'farm', text: 'Farm' },
  { value: 'warehouse', text: 'Warehouse' }
];

export const rentalTime = [
  { value: 'monthly', text: 'Monthly' },
  { value: 'annually', text: 'Annually' }
];

export const genderAllowed = [
  { value: 'male', text: 'Male only' },
  { value: 'female', text: 'Female only' },
  { value: 'all', text: 'All' }
];

export const requiredFieldForSell = [
  'adTitle',
  'address',
  'location',
  'propertyFor',
  'propertyType',
  'propertyPrice',
  'propertyDetails',
  'acceptTermAndPolicy'
];

export const requiredFieldForRent = [
  ...requiredFieldForSell,
  'rentalTime',
  'genderAllowed'
];
