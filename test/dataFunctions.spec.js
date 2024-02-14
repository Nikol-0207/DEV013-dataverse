import { sortData,filterData,computeStats} from '../src/dataFunctions.js';
import { data as fakeData } from './data.js';

const dataInitial = [...fakeData];
describe('sortData', () => {
  it('sorts data alfabeticamente en orden ascendete', () => {
    const sortedData = sortData(fakeData, 'name', 'abc');
    const firstItem = sortedData[0];
    const lastItem = sortedData[sortedData.length - 1];
    expect(firstItem.name).toBe('Color TV Game');
    expect(lastItem.name).toBe('Wii U');
  });
  
  it('sorts data alfabeticamente en orden descendente', () => {
    const sortedData = sortData(fakeData, 'name', 'cba');
    const firstItem = sortedData[0];
    const lastItem = sortedData[sortedData.length - 1];
    expect(firstItem.name).toBe('Wii U');
    expect(lastItem.name).toBe('Color TV Game');
  });
});
describe('filterData', () => {
  it('filtrar por número de generación', () => {
    const filteredData = filterData(fakeData, 'select', '4');
    expect(filteredData.length).toBe(3);
    expect(filteredData[2].name).toBe('Game Boy');
  });
  
  it('filtrar por tipo de consola', () => {
    const filteredData = filterData(dataInitial, 'type-order', '11');
    expect(filteredData.length).toBe(11);
    expect(filteredData[0].name).toBe('Color TV Game');
  });
  
  it('filtrar por búsqueda de nombre', () => {
    const filteredData = filterData(dataInitial, 'searchName', 'Nintendo');
    expect(filteredData.length).toBe(13);
    expect(filteredData[0].name).toBe('Nintendo (NES)');
  });
});
describe('computeStats', () => {
  it('Calcular total de precios por generación', () => {
    const stats = computeStats(fakeData);
    expect(stats['primerageneración']).toBe(199);
    expect(stats['segundageneración']).toBe(40);
  });
});
