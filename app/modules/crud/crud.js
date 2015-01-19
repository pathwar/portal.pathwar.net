var crud = angular.module('portal.crud', [
  'ui.router',
  'templates',
  'ngAnimate',
  'restangular',
  'formly',
  'formly.render']);

crud.config(function($stateProvider, formlyConfigProvider) {

  $stateProvider.state('crud', {
    url: '/crud/models',
    abstract: true,
    templateUrl: 'modules/crud/views/main.tpl.html'
  })
  .state('crud.list', {
    url: '',
    controller: 'CrudListCtrl',
    templateUrl: 'modules/crud/views/models.list.tpl.html',
  });

  $stateProvider.state('crud.model', {
    url: '/:model?page',
    abstract: true,
    controller: function($scope, $stateParams) {
      $scope.model = $stateParams.model;
    },
    template: '<ui-view/>'
  })
  .state('crud.model.list', {
    url: '',
    controller: 'CrudModelsListCtrl',
    templateUrl: 'modules/crud/views/list.tpl.html',
  })
  .state('crud.model.add', {
    url: '/add',
    controller: 'CrudModelsAddCtrl',
    templateUrl: 'modules/crud/views/form.tpl.html',
  })
  .state('crud.model.view', {
    url: '/:id',
    controller: 'CrudModelsViewCtrl',
    templateUrl: 'modules/crud/views/view.tpl.html',
  })
  .state('crud.model.edit', {
    url: '/:id/edit',
    controller: 'CrudModelsEditCtrl',
    templateUrl: 'modules/crud/views/form.tpl.html',
  })

  formlyConfigProvider.setTemplateUrl('text', 'modules/crud/form-templates/formly-field-text.tpl.html');

});

var Schema = {
  achievements:  {
    title: 'name'
  },
  coupons:  {
    title: 'hash'
  },
  items:  {
    title: 'name'
  },
  level_hints:  {
    title: 'name'
  },
  level_instances:  {
    title: 'hash'
  },
  levels:  {
    title: 'name'
  },
  organization_achievements:  {
    title: '_id'
  },
  organization_coupons:  {
    title: '_id'
  },
  organization_items:  {
    title: '_id'
  },
  organization_level_validations:  {
    title: '_id'
  },
  organization_levels:  {
    title: '_id'
  },
  organization_users:  {
    title: '_id'
  },
  organizations: {
    title: 'name'
  },
  scorings:  {
    title: 'organization'
  },
  servers:  {
    title: 'name'
  },
  sessions:  {
    title: 'name'
  },
  user_activities:  {
    title: '_id'
  },
  user_organization_invites:  {
    title: '_id'
  },
  user_notifications:  {
    title: 'title'
  },
  user_sessions:  {
    title: 'token'
  },
  user_tokens:  {
    title: 'token'
  },
  users: {
    title: 'login'
  }
};

crud.factory('CrudSchema', function($http) {

  var promise = $http.get('/assets/json/spec.json');

  return {
    getSchema: function(model) {
      return promise.then(function(response) {
        return response.data.domains[model]['/'+model].POST.params;
      });
    }
  };

});

crud.controller('CrudListCtrl', function($scope, Restangular) {

   Restangular.all('/').getList().then(function(response) {
     $scope.models = response;
   });

});

crud.controller('CrudModelsListCtrl', function($scope, $stateParams, $location, Restangular) {

  var Models = Restangular.all($stateParams.model);

  $scope.pager = {
    currentPage: +$stateParams.page
  };

  Models.getList({page: $stateParams.page}).then(function(models) {
    _.each(models, (model) => { model.title = model[Schema[$stateParams.model.replace('-', '_', 'g')].title]; });
    $scope.pager.totalItems = models.meta.total;
    $scope.pager.maxPage = _.range(1, Math.ceil(models.meta.total / models.meta.max_results) + 1);
    $scope.models = models;
  });

  $scope.$watch('pager.currentPage', function(page) {
    $location.search({page: page});
  });


});

crud.controller('CrudModelsViewCtrl', function($scope, $stateParams, Restangular, CrudSchema) {

  var Models = Restangular.service($stateParams.model);
  var Model = Models.one($stateParams.id);

  Model.get().then(function(response) {
    var model = response.data;
    model.title = model[Schema[$stateParams.model.replace('-', '_', 'g')].title];
    $scope.model = model;
  });

  $scope.formFields = [];

  CrudSchema.getSchema($stateParams.model).then(function(fields) {

    fields = _.chain(fields).sortBy('required').reverse().value();

    _.each(fields, function(field) {
      if (field.name == '_id') return;
      $scope.formFields.push({
        key: field.name,
        type: 'text',
        label: field.name,
        required: field.required
      });
    });
  });

});

crud.controller('CrudModelsAddCtrl', function($scope, $state, $stateParams, Restangular, CrudSchema) {

  var Models = Restangular.service($stateParams.model);

  $scope.model = {};
  $scope.formFields = [];

  CrudSchema.getSchema($stateParams.model).then(function(fields) {

    fields = _.chain(fields).sortBy('required').reverse().value();

    _.each(fields, function(field) {
      if (field.name == '_id') return;
      $scope.formFields.push({
        key: field.name,
        type: 'text',
        label: field.name,
        required: field.required
      });
    });
  });

  $scope.save = function() {
    Models.post($scope.model).then(function(response) {
      $state.transitionTo('crud.model.list', {model: $stateParams.model});
    });
  };

});

crud.controller('CrudModelsEditCtrl', function($scope, $state, $stateParams, Restangular, CrudSchema) {

  var Models = Restangular.service($stateParams.model);
  var Model = Models.one($stateParams.id);

  Model.get().then(function(response) {
    $scope.model = response.data;
  });

  $scope.formFields = [];

  CrudSchema.getSchema($stateParams.model).then(function(fields) {

    fields = _.chain(fields).sortBy('required').reverse().value();

    _.each(fields, function(field) {
      if (field.name == '_id') return;
      $scope.formFields.push({
        key: field.name,
        type: 'text',
        label: field.name,
        required: field.required
      });
    });
  });

  $scope.save = function() {
    var toSend = _.pick($scope.model, function(value, key) {
      return key.charAt(0) != '_' || key == '_etag';
    });

    Model.patch(toSend).then(function(response) {
      $state.transitionTo('crud.model.list', {model: $stateParams.model});
    });
  };

});
