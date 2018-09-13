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
         * Loads JSON data.
         *
         * @param {String} appService RApp service to be loaded
         * @param {String} action create | update | getAll | get | enumAction | [non-crud action]       
         * @param {Function} onSuccess onSuccess callback
         * @param {Function} onError onError callback
         */
    service(appService, action, data, successCallback, errorCallback, alwaysCallback) {
        // eslint-disable-next-line
        abp.services.app[appService][action](data).done(function (data) {
            if (successCallback) successCallback(data);
        }).fail(function (error) {
            if (errorCallback) errorCallback(error);
        }).always(function () {
            if (alwaysCallback) alwaysCallback();
        })
    },
    // Service returning a promise
    pService(appService, action, data) {
        // eslint-disable-next-line
        return abp.services.app[appService][action](data);
    },
    messages(module) {
        // eslint-disable-next-line
        let data = abp.localization.values[module];
        return data;
    },
    componentsPath() {
        // eslint-disable-next-line
        return abp.appPath + 'lib/vueforms/';
    }

}