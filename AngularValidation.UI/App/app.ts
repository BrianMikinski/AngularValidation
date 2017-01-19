'use strict'

//Main app module
var app = angular.module('app', ['ui.mask', 'ui.bootstrap', 'ngMessages']);

//Main controller for the page
app.controller("demoController", function ($scope: ng.IScope, $uibModal: ng.ui.bootstrap.IModalService, $document: ng.IDocumentService, $http: ng.IHttpService) {

    var vm: any = this;

    //Data Capture Form Validation
    vm.FormFields = new Array<DataCaptureField>();
    vm.IsFormEnabled = false;
    vm.Message = "Forms and Validation";
    vm.HideAll = false;

    //Boolean Form Validation
    vm.IsSecondaryFormValid = false;

    //Drop Down Validation
    vm.ZipCodes = new Array<ZipCode>();
    vm.IsZipCodeRequired = true;
    vm.SelectedZipCode = null;

    //Simple Validation
    vm.simpleValidationDirectiveFormPassCode = "";

    //Custom Validation Rules

    vm.CustomValidationPassCode = "";
    vm.IsFirstSet = false;
    vm.RuleSetOne = [{ Value: "pass" }, { Value: "code" }];
    vm.RuleSetTwo = [{ Value: "code" }, { Value: "pass" }];
    vm.CustomValidationRules = vm.RuleSetOne;

    //Swap out rule sets
    vm.ToggleValidationRules = function (): void {

        if (vm.IsFirstSet === false) {
            vm.CustomValidationRules = vm.RuleSetTwo;

        } else {
            vm.CustomValidationRules = vm.RuleSetOne;
        }

        vm.IsFirstSet = !vm.IsFirstSet;
    }

    //Async Validation
    vm.AsyncValidationPassCode = "";

    //Modal
    vm.MessageFromDemoController = "Hello Modal Controller, this is Demo Controller - Are you there?"

    //Open a modal
    vm.open = function (size, parentSelector) {

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo')) : undefined;

        //Create 
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'App/modal.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                currentFormItems: function () {
                    return vm.FormFields;
                },
                message: function () {
                    return vm.MessageFromDemoController
                }
            }
        });

        //Return function from the closing of the controller
        modalInstance.result.then(function (messageFromModalController: string) {
            console.log(`Message from the modal controller: "${messageFromModalController}"`);
        }, function () {
            console.log(`Modal dismissed at: ${new Date()}`);
        });
    };

    /**
     * Create mock data capture questions
     */
    function GenerateDataCaptureSource() {

        $http.get("./values/RetrieveDataCaptureQuestions")
            .success(function (data: Array<any>) {

                for (let i = 0; i < data.length; i++) {
                    vm.FormFields.push(data[i]);
                }

            }).error(function (msg, code) {
                console.log(`msg: ${msg}`)
                console.log(`code: ${code}`)
            });

        let formFieldOne: DataCaptureField =
            {
                LabelText: "Spouse First Name",
                HelpText: "You must enter the first name of your spouse.",
                Value: "",
                IsEnabled: true,
                IsRequired: true,
                IsVisible: true,
                Mask: {
                    Regex: 'AAAAA',
                    AllowInvalidValue: false,
                    Name: "Alphabetic"
                }
            };

        let formFieldTwo: DataCaptureField = {
            LabelText: "Last Name",
            HelpText: "You must enter a last name.",
            Value: "",
            IsEnabled: true,
            IsRequired: true,
            IsVisible: true,
            Mask: {
                Regex: 'AAAAA',
                AllowInvalidValue: false,
                Name: "Alphabetic"
            }
        };

        vm.FormFields.push(formFieldTwo);
        vm.FormFields.push(formFieldOne);
    }

    /**
     * Create mock zip codes
     */
    function GenerateZipCodes() {

        let zipCodeOne: ZipCode = {
            City: "Houston",
            Country: "United States",
            County: "Harris",
            State: "Tx",
            ZipCode: 77007
        };

        let zipCodeTwo: ZipCode = {
            City: "Kansas City",
            Country: "United States",
            County: "Shawnee",
            State: "Ks",
            ZipCode: 66041
        };

        let zipCodeThree: ZipCode = {
            City: "Salina",
            Country: "United States",
            County: "Saline",
            State: "Ks",
            ZipCode: 67401
        };

        vm.ZipCodes.push(zipCodeOne);
        vm.ZipCodes.push(zipCodeTwo);
        vm.ZipCodes.push(zipCodeThree);
    }

    /**
     * Add a new field to the FormFields
     * @param newBondField
     */
    vm.AddNewItem = function (newDataCaptureField: DataCaptureField) {

        vm.FormFields.push(newDataCaptureField);

        //Create a new field for the data capture form
        newDataCaptureField = new DataCaptureField();
    }

    //Event parsing
    $scope.$on("addNewDataCaptureField", function (event: ng.IAngularEvent, newDataCaptureField: DataCaptureField) {

        let newField: DataCaptureField = new DataCaptureField();
        newField.HelpText = newDataCaptureField.HelpText;
        newField.IsVisible = newDataCaptureField.IsVisible;
        newField.IsEnabled = newDataCaptureField.IsEnabled;
        newField.IsRequired = newDataCaptureField.IsRequired;
        newField.LabelText = newDataCaptureField.LabelText;
        newField.Value = newDataCaptureField.Value;
        let mask: any = newDataCaptureField.Mask;
        newField.Mask = <IFieldMask>JSON.parse(mask);

        vm.FormFields.push(newField);
    });

    //Setup - Constructor if we were in a class 
    GenerateDataCaptureSource();
    GenerateZipCodes();
});

//Controller for the modal popover
angular.module('app').controller('ModalInstanceCtrl', function ($scope: ng.IScope, $rootScope: ng.IRootScopeService,
    $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, currentFormItems: Array<DataCaptureField>, message: string) {

    var $ctrl = this;
    $ctrl.currentFormItems = currentFormItems;
    $ctrl.message = message;
    $ctrl.submitted = false;

    $ctrl.Masks = GenerateMasks();

    //Data capture fields
    $ctrl.NewDataCaptureField = new DataCaptureField();
    $ctrl.NewDataCaptureField.IsEnabled = true;
    $ctrl.NewDataCaptureField.IsRequired = true;
    $ctrl.NewDataCaptureField.IsVisible = true;

    //Add a new field without closing the dialog box
    $ctrl.AddNewField = function (form, closeField: boolean) {

        if (form.$valid === true) {
            $rootScope.$broadcast('addNewDataCaptureField', $ctrl.NewDataCaptureField);
            $ctrl.NewDataCaptureField = new DataCaptureField();
            $ctrl.NewDataCaptureField.IsEnabled = true;
            $ctrl.NewDataCaptureField.IsRequired = true;
            $ctrl.NewDataCaptureField.IsVisible = true;
            $ctrl.submitted = false;
            form.$setPristine();
            form.$setUntouched();
        }
        else {
            $ctrl.submitted = true;
            form.$setDirty();
        }

        //Close modal and pass back a message
        if (closeField === true && form.$valid === true) {

            let messageFromModal: string = "Hello demo controller, this is modal controller! Do you read?";

            $uibModalInstance.close(messageFromModal);
        }
    }

    //Cancel the modal and do not pass back any item
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    /**
     * Generate a set of masks that can be used to add questions
     */
    function GenerateMasks(): Array<IFieldMask> {

        let masks = new Array<IFieldMask>();

        let mask1: IFieldMask = {
            AllowInvalidValue: false,
            Name: "Three Numbers",
            Regex: "9-9-9"
        };

        let mask2: IFieldMask = {
            AllowInvalidValue: false,
            Name: "North American Phone Number",
            Regex: "(999)-999-9999",
        };

        let mask3: IFieldMask = {
            AllowInvalidValue: false,
            Name: "Alpha Numeric",
            Regex: "[a-zA-Z0-9]"
        };

        let mask4: IFieldMask = {
            AllowInvalidValue: false,
            Name: "English Alphabet",
            Regex: "AAAAA"
        };

        masks.push(mask4);
        masks.push(mask3);
        masks.push(mask2);
        masks.push(mask1);

        return masks;
    }
});

//Simple Validator
app.directive("simpleValidation", function () {

    var scopeRules = ["Test"];

    return {
        restrict: "A",
        require: "ngModel",

        link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes, ngModel: any) {

            ngModel.$validators.customValidation = function (modelValue: string) {
                console.log("Simple Validation Directive");
                console.log(`Input Model Value: ${modelValue}`);
                return modelValue === 'codepass';
            };
        }
    };
});

// custom Validation rules
app.directive("customValidation", function ($q: ng.IQService, $timeout: ng.ITimeoutService) {

    let rules: Array<ValidationRule>;

    let IsModelValid = function (model: string): boolean {

        console.log("Custom Rules Validation Directive");
        console.log(`     Model: ${model}`);

        for (var i in rules) {
            console.log(`     Custom Validation Rule ${i} Value: ${rules[i].Value}`)
            if (model.indexOf(rules[i].Value) === -1) {
                return false;
            }
        }

        return true;
    };

    return {
        restrict: "A",
        scope: {
            rules: "="
        },
        require: "ngModel",
        link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: any, ngModel: any) {

            // save copy of the model
            let model = ngModel;

            // watch for changes to rules
            scope.$watch("rules", function (newRules: Array<ValidationRule>) {
                rules = newRules;
                model.$validate();
            });

            // custom validator to be called when rules change
            ngModel.$validators.customValidation = function (modelValue: string) {
                return IsModelValid(modelValue);
            }
        }
    };
});

// async Validation rules
app.directive("asyncValidation", function ($q: ng.IQService, $http: ng.IHttpService, $log: ng.ILogService) {

    let rules: Array<ValidationRule>;

    return {
        restrict: "A",
        scope: {
            rules: "="
        },
        require: "ngModel",
        link: function (scope: any, element: ng.IAugmentedJQuery, attributes, ngModel: any) {

            rules = scope.rules;
            ngModel.$asyncValidators.asyncCustomValidator = function (modelValue) {
                let defer = $q.defer();

                $http.get(`./values/ValidateAsyncInput?asyncPassCode=${modelValue}`)
                    .success(function (data) {

                        let isCorrectPasscode = <boolean>data;
                        if (isCorrectPasscode === true) {
                            defer.resolve();
                        } else {
                            defer.reject();
                        }
                    }).error(function (msg, code) {
                        defer.reject(msg);
                        $log.error(msg, code);
                    });

                return defer.promise;
            }
        }
    };
});

/**
 * View model for a data capture object
 */
class DataCaptureField {
    HelpText: string;
    IsVisible: boolean;
    IsEnabled: boolean;
    IsRequired: boolean;
    LabelText: string;
    Mask: IFieldMask;
    Value: string;
}

/**
 * Interface for a field mask
 */
interface IFieldMask {
    AllowInvalidValue: boolean;
    Name: string;
    Regex: string;
}

/**
 * Class to hold zip values
 */
class ZipCode {
    County: string;
    State: string;
    City: string;
    Country: string;
    ZipCode: number;
}

/**
 * Validation rules for individual capture fields
 */
class ValidationRule {
    Value: string;
}