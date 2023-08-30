import assert from 'assert'; 
import {
  projectPieCategories,
  projectGraphCategories,
  projectLists
} from '../projectPieCat';

describe('Test Project Categories Functions', () => {
  it('should correctly retrieve projectPieCategories', () => {
    const expected = [
      { id: 1, name: "Project Categories Summary", value: "Projects" },
      { id: 2, name: "Orgaisation Categories Summary", value: "Organizations" },
    ];
    
    const result = projectPieCategories();
    assert.deepStrictEqual(result, expected);
  });

  it('should correctly retrieve projectGraphCategories', () => {
    const expected = [
      { id : 1, name : "Projects" , value: "Projects"},
      { id : 2, name : "Types" , value : "Types"},
    ];
    
    const result = projectGraphCategories();
    assert.deepStrictEqual(result, expected);
  });

  it('should correctly retrieve projectLists', () => {
    const expected = [
      { id : 1, name : "All Projects" , value: "All Projects"},
      { id : 2, name : "Active Projects" , value : "Active Projects"},
      { id : 3, name : "Disabled Projects" , value : "Disabled Projects"},
    ];
    
    const result = projectLists();
    assert.deepStrictEqual(result, expected);
  });
});
