import Equipment from "../resources/Equipment";
// Filtering Function to reduce the size of the equipment array being passed down
export function queryEquipment(
  equipment: Equipment[],
  searchString: string
): Equipment[] {
  let queriedEquipment: Equipment[] = [];
  if (searchString !== "") {
    const queries = searchString.split(/\W+/);
    queriedEquipment = equipment.filter(function (equipment) {
      return queries.every(function (query) {
        return (
          equipment.description
            .toLowerCase()
            .includes(query.toLowerCase().trim()) ||
          equipment.category
            .toLowerCase()
            .includes(query.toLowerCase().trim()) ||
          equipment.tags.some(function (tag) {
            return tag.name.toLowerCase().includes(query.toLowerCase().trim());
          })
        );
      });
    });
  } else {
    queriedEquipment = equipment;
  }
  return queriedEquipment;
}

// Filtering Function to reduce the size of the equipment array being passed down
export function filterEquipment(
  equipment: Equipment[],
  filters: { [k: string]: boolean }
): Equipment[] | undefined {
  const activeFilters = Object.keys(filters).filter(function (key: string) {
    return filters[key];
  });
  return equipment.filter(function (item) {
    return activeFilters.every(function (filter) {
      return item.tags.some(function (tag) {
        return tag.name.toLowerCase().includes(filter.toLowerCase().trim());
      });
    });
  });
}

// Function to convert equipment Array to Quantized equipment Array
export function quantizeEquipment(equipment: Equipment[]): Equipment[] {
  const tempArray: Equipment[] = [];
  equipment.forEach((item) => {
    item.quantity = equipment.filter(
      (element) => element.description === item.description
    ).length;
    const index = tempArray.findIndex(
      (element) => element.description === item.description
    );
    if (index === -1) {
      tempArray.push(item);
    }
  });
  return tempArray;
}

// Function to convert equipment Array to Quantized equipment Array
export function buildDictionaries(
  equipment: Equipment[]
): [
  { [k: string]: boolean },
  { [k: string]: Set<string> },
  { [k: string]: number }
] {
  // Build quantities dictionary for Formik
  // Build Categories Dictionary
  // Build Filters Dictionary
  const filters: { [k: string]: boolean } = {};
  const categories: { [k: string]: Set<string> } = {};
  const quantities: { [k: string]: number } = {};
  equipment.forEach((item) => {
    quantities[item.description] = 0;
    item.tags.forEach((tag) => {
      if (!categories[item.category]) {
        categories[item.category] = new Set();
      }
      categories[item.category].add(tag.name);
      filters[tag.name] = false;
    });
  });
  return [filters, categories, quantities];
}
