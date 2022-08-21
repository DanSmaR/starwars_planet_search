const planetsName = [
  'Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'
];

export const filterValues = [
  {
    column: "population",
    comparison: "maior que",
    value: "200000",
  },
  {
    column: "orbital_period",
    comparison: "maior que",
    value: "364",
  },
  {
    column: "diameter",
    comparison: "menor que",
    value: "19720",
  },
  {
    column: "rotation_period",
    comparison: "menor que",
    value: "24",
  },
  {
    column: "surface_water",
    comparison: "igual a",
    value: "8",
  },
];

export default planetsName;
