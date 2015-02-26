function LevelValidationService(Restangular) {
  var service = {};

  service.validateOrganizationLevel = validateOrganizationLevel;

  return service;

  function validateOrganizationLevel(validation, orgLevel) {
    return Restangular.all('organization-level-validations')
      .post({
        organization_level: orgLevel._id,
        passphrases: [validation.passphrase],
        explanation: validation.explanation
      });
  }

  function buyHintForLevel(hint, level) {
    console.log(hint);
  }
}

angular
  .module('portal.levels')
  .factory('LevelValidationService', LevelValidationService);
