export default {

    /**
         * Loads JSON schema.
         *
         * @param {String} resource Resource to be loaded
         * @param {String} action create | update | get | filter
         
         */
    schema(resource, action) {
        // eslint-disable-next-line
        const base = abp.schemas.app[resource];
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
         * @param {String} resource Resource to be loaded
         * @param {String} action create | update | getAll | get | enumAction         
         * @param {Function} onSuccess onSuccess callback
         * @param {Function} onError onError callback
         */
    service(resource, action, data, successCallback, errorCallback, alwaysCallback) {
        // eslint-disable-next-line
        abp.services.app[resource][action](data).done(function (data) {
            if (successCallback) successCallback(data);
        }).fail(function (error) {
            if (errorCallback) errorCallback(error);
        }).always(function () {
            if (alwaysCallback) alwaysCallback();
        })
    },
    // Service returning a promise
    pService(resource, action, data) {
        return abp.services.app[resource][action](data);
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