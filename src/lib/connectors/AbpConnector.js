export default {

    /**
         * Loads JSON schema.
         *
         * @param {String} appService App service to be loaded
         * @param {String} action create | update | get | filter | [non-crud action]
         
         */
    schema(appService, action) {
        // eslint-disable-next-line
        const base = abp.schemas.app[appService];
        let data = null;
        if (action == 'create')
            data = base.create.parameters.input;
        else if (action == 'update')
            data = base.update.parameters.input;
        else if (action == 'get')
            data = base.get.returnValue;
        else if (action == 'filter')
            data = base.getAll.parameters.input;

        return data;
    },
    /**
         * @deprecated Use pService instead.
         * 
         * Loads JSON data.
         *
         * @param {String} appService RApp service to be loaded
         * @param {String} action create | update | getAll | get | enumAction | [non-crud action]       
         * @param {Function} onSuccess onSuccess callback
         * @param {Function} onError onError callback
         * @return {Object} JSON data
         */
    service(appService, action, data, successCallback, errorCallback, alwaysCallback) {
        //action = this.transformAction(action);
        //data = this.transformData(action, data);
        this.checkService(appService, action);
        /*
        var res = null;
        if (action == 'update')
            // eslint-disable-next-line
            res = abp.services.app[appService][action](data.id, data);
        else
        */
        // eslint-disable-next-line
        var res = abp.services.app[appService][action](data);

        res
            .then(function (data) {
                if (successCallback) successCallback(data);
            })
            .fail(function (error) {
                if (errorCallback) errorCallback(error);
            })
            .always(function () {
                if (alwaysCallback) alwaysCallback();
            })
    },
    /**
     * 
     * Loads JSON data.
     *
     * @param {String} appService RApp service to be loaded
     * @param {String} action create | update | getAll | get | enumAction | [non-crud action]       
     * @return {Promise<any>} A promise (ES6 standard) of the JSON data. (cfr. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises, )
     */
    pService(appService, action, data) {
        //action = this.transformAction(action);
        //data = this.transformData(action, data);
        this.checkService(appService, action);
        /*
        // eslint-disable-next-line        
        if (action == "update")
            // eslint-disable-next-line        
            return abp.services.app[appService][action](data.id, data);
        else
        */
        // eslint-disable-next-line        
        return abp.services.app[appService][action](data);
        // Abp returns a JQuery promise, but they adhere to the ES6 standard Promise interface (using .then and .catch) as a sort of 'downcast'
    },
    messages(module) {
        // eslint-disable-next-line
        let data = abp.localization.values[module];
        return data;
    },
    componentsPath() {
        // eslint-disable-next-line
        return abp.appPath + 'dist/';
    },
    locale() { // Should be moment locale (e.g. 'fr', 'en', 'nl', ...)
        // eslint-disable-next-line
        return abp.localization.currentCulture.name;
    },
    languages() {
        // eslint-disable-next-line        
        return abp.localization.languages.filter(l => {
            return !l.isDisabled;
        });
        //return abp.localization.languages;
    },
    canActivate() {
        // eslint-disable-next-line
        return !abp.auth.policies.CanActivate || abp.auth.grantedPolicies.CanActivate;
    },
    settings() {
        return {
            // eslint-disable-next-line
            defaultPageSize: abp.setting.getInt("App.Ui.DefaultPageSize"),
            // eslint-disable-next-line
            pageSizeOptions: abp.setting.values["App.Ui.PageSizeOptions"]
                // eslint-disable-next-line
                ? abp.setting.values["App.Ui.PageSizeOptions"]
                    .replace(/\s/g, "") // remove all whitespace
                    .split(",") // expect comma separated value, parse to array
                    .map(value => parseInt(value)) // parse to number, use lambda to prevent triggering wrong parseInt overload
                    .filter(value => isNaN(value) === false)
                : null // default to null
        };
    },
    checkService(appService, action) {
        // eslint-disable-next-line        
        if (abp.services.app == undefined) {
            // eslint-disable-next-line        
            console.log('abp.services.app not exist');
            return;
        }
        // eslint-disable-next-line        
        if (abp.services.app[appService] == undefined) {
            // eslint-disable-next-line        
            console.log('application service ' + appService + ' not exist');
            return;
        }
        // eslint-disable-next-line        
        if (abp.services.app[appService][action] == undefined) {
            // eslint-disable-next-line        
            console.log('method ' + action + ' on application service ' + appService + ' not exist');
            return;
        }
    },
    transformAction(action) {
        if (action == "getAll")
            return "getList";
        else
            return action;
    },
    transformData(action, data) {
        if (action == "get" || action == "delete")
            return data.id;
        else
            return data;
    }
}