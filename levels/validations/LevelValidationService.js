"use strict";

function LevelValidationService(Restangular) {
  var validateOrganizationLevel = function (validation, orgLevel) {
    return Restangular.all("organization-level-validations").post({
      organization_level: orgLevel._id,
      passphrases: [validation.passphrase],
      explanation: validation.explanation
    });
  };

  var buyHintForLevel = function (hint, level) {
    console.log(hint);
  };

  var service = {};

  service.validateOrganizationLevel = validateOrganizationLevel;

  return service;
}

angular.module("portal.levels").factory("LevelValidationService", LevelValidationService);