import handleProjectValidation,{validateDomain,
    validateDomainName,
    validateName,
    validateProjectDescription,
    validateOrganizationName,
    validateProjectName,
    validateProjectType
} from "./validation.js"
var assert = require('assert')

describe('checks valiidation', () => {
    it(' domain name errors ', () => {
            assert.equal(validateDomain(''), "Please provide domain name");
            assert.equal(validateDomain('2john@'), "Domain name should start with a letter");
            assert.equal(validateDomain('johnr.com'),undefined);
    });    
    it('validate domain name', () => {
        assert.equal(validateDomainName(''), false);
        assert.equal(validateDomainName('2john@'), false);
        assert.equal(validateDomainName('johnr.com'),true);
   });
   it('validate names', () => {
    assert.equal(validateName(''), false);
    assert.equal(validateName('2john@'), false);
    assert.equal(validateName('john'),true);
    assert.equal(validateName('joh@n'),"false_convention");
  });
  it('validate descriptions', () => {
    assert.equal(validateProjectDescription(''), "Add Project Description");
    assert.equal(validateProjectDescription('High low'),undefined);
  });
  it('validate organisation name', () => {
    assert.equal(validateOrganizationName(''),
     "Project organisation must start with a letter and may only contain letters and a hypen -");
    assert.equal(validateOrganizationName('Highlow'),undefined);
    assert.equal(validateOrganizationName('fh d'), 
    "Project organisation must start with a letter and may only contain letters and a hypen -");
  });
  it('validate descriptions', () => {
    assert.equal(validateProjectDescription(''), "Add Project Description");
    assert.equal(validateProjectDescription('High low'),undefined);
  });
  it('validating project name function', () => {
    assert.equal(validateProjectName(''), "Project Name cannot be empty");
    assert.equal(validateProjectName('2na'), "Project name should start with a letter");
    assert.equal(validateProjectName('High low'),"Project name may only contain letters and a hypen -");
    assert.equal(validateProjectName('Highndsjjdjnbhjvbhfdvbadjvbfdhvbbfvbvhfdbvhfdhdvjhsdjjdjds'),
    "Project name may not exceed 30 characters");
  });
  it('validating project types errors', () => {
    assert.equal(validateProjectType('2najd'), "Project Type should start with a letter");
    assert.equal(validateProjectType(''), "Project Type cannot be empty");
    assert.equal(validateProjectType('Hig'),"Project Type must be at least 4 characters");
    assert.equal(validateProjectType('Hig k0'),"Project Type may only contain letters and a hypen -");
  });
  it('validate project handler', () => {
    assert.equal(handleProjectValidation('projectName','projectDescription',
    'organisationType','organisation','clusterID'
    ), undefined);
    assert.equal(handleProjectValidation('projectName','projectDescription',
    'organisationType','organisation',''),"All fields are required");
  });
  assert.equal(handleProjectValidation('','',
  '','',''),"All fields are required");
  assert.equal(handleProjectValidation('letters','letters',
  '2','letters','letters'),'Project Type must be at least 4 characters');
  assert.equal(handleProjectValidation('l@etters','letters',
  'letters','letters','letters'),'Project name may only contain letters and a hypen -');
  assert.equal(handleProjectValidation('letters','letters',
  'letters','2letters','letters'),'Project organisation must start with a letter and may only contain letters and a hypen -');
  assert.equal(handleProjectValidation('letters','letters',
  'letters','letters','hfdld zx'),undefined);
});


   
