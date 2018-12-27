/************************** data ****************************/

var data = [
    {
        userName: "jannesiera",
        emailAddress: "janne.siera@gmail.com",
        isActive: false,
        fullName: "Janne Siera",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    },
    {
        userName: "mickey",
        emailAddress: "mickey.mouse@cheesebox.com",
        isActive: true,
        fullName: "Mickey Garcia Mouse",
    }
];

const abp = abp || {};

abp.localization = {
    currentCulture: {
        name: 'fr'
    }
};

abp.setting = {
    getInt: (setting) =>  {
        if(setting === "App.Ui.DefaultPageSize")
            return 25;
        else
            return undefined;
    },
    values: {
        "App.Ui.PageSizeOptions": "10, 25, 50, 100, 500"
    }
}

var demoajax = function(data)  {
        this.lst = data;
        this.then = (callback) => {
            if (callback) callback(this.lst);
            return this;
        };
        this.catch = () => {
            
            return this;
        };

        this.always= (callback) => {
            if (callback) callback();
            return this;
        }
}

/*************************************** services****************/
abp.services = abp.services || {};
abp.services.app = abp.services.app || {};

// controller 'user'

abp.services.app.user = abp.services.app.user || {};

// action 'create'
// eslint-disable-next-line
abp.services.app.user.create = function (input, ajaxParams) {
    input.id = Math.random();
    data.push(input);
    return new demoajax(input);
    /* return abp.ajax($.extend(true, {
      url: abp.appPath + 'api/services/app/User/Create',
      type: 'POST',
      data: JSON.stringify(input)
    }, ajaxParams));; */
};

// action 'update'
// eslint-disable-next-line
abp.services.app.user.update = function (input, ajaxParams) {
    let lst = data.filter((val) => {
        return val.id == input.id;
    });
    if (lst.length == 1) {
        Object.assign(lst[0], input);
    }
    return new demoajax(input);

    /* return abp.ajax($.extend(true, {
      url: abp.appPath + 'api/services/app/User/Update',
      type: 'PUT',
      data: JSON.stringify(input)
    }, ajaxParams));; */
};

// action 'delete'
// eslint-disable-next-line
abp.services.app.user['delete'] = function (input, ajaxParams) {
    let lst = data.filter((val) => {
        return val.id == input.id;
    });
    if (lst.length == 1) {
        //Object.assign(lst[0], input);
    }
    /* return abp.ajax($.extend(true, {
      url: abp.appPath + 'api/services/app/User/Delete' + abp.utils.buildQueryString([{ name: 'id', value: input.id }]) + '',
      type: 'DELETE'
    }, ajaxParams));; */
};


// action 'get'
// eslint-disable-next-line
abp.services.app.user.get = function (input, ajaxParams) {
    const lst = data.filter((val) => {
        return val.id == input.id;
    });
    if (lst.length == 1) {
        return new demoajax(lst[0]);
    }
    return new demoajax({});
    /* return abp.ajax($.extend(true, {
      url: abp.appPath + 'api/services/app/User/Get' + abp.utils.buildQueryString([{ name: 'id', value: input.id }]) + '',
      type: 'GET'
    }, ajaxParams));; */
};

// action 'getAll'
// eslint-disable-next-line
abp.services.app.user.getAll = function (input, ajaxParams) {
    const filterStringData = (dto, dtoProp, itemProp) => item => dto[dtoProp] === undefined || item[itemProp].includes(dto[dtoProp]);
    const list = data
        .filter(filterStringData(input, 'userName', 'userName'))
        .filter(filterStringData(input, 'email', 'emailAddress'))
    var res = {
        items : list.slice(input.skipCount, input.skipCount + input.maxResultCount),
        totalCount : list.length
    }
    return new demoajax(res);
    /* return abp.ajax($.extend(true, {
      url: abp.appPath + 'api/services/app/User/GetAll' + abp.utils.buildQueryString([{ name: 'userName', value: input.userName }, { name: 'email', value: input.email }, { name: 'skipCount', value: input.skipCount }, { name: 'maxResultCount', value: input.maxResultCount }]) + '',
      type: 'GET'
    }, ajaxParams));; */
};

// action 'getRoles'
// eslint-disable-next-line
abp.services.app.user.getRoles = function(ajaxParams) {
    var res = {
        items : [{normalizedName:"admin", displayName:"admin"}],
        totalCount : data.length
    }
    return new demoajax(res);
    
    // return abp.ajax($.extend(true, {
    //   url: abp.appPath + 'api/services/app/User/GetRoles',
    //   type: 'GET'
    // }, ajaxParams));;
  };

/****************************** schema *******************************/

abp.schemas = abp.schemas || {};

abp.schemas.app = abp.schemas.app || {};

// controller 'user'
abp.schemas.app.user = abp.schemas.app.user || {};
// action 'create'
abp.schemas.app.user.create = abp.schemas.app.user.create || {};
abp.schemas.app.user.create.returnValue = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "UserDto",
    "type": "object",
    "required": [
        "userName",
        "name",
        "surname",
        "emailAddress"
    ],
    "properties": {
        "userName": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0
        },
        "name": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0,
            "x-ui-grid": false
        },
        "surname": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0,
            "x-ui-grid": false
        },
        "emailAddress": {
            "type": "string",
            "format": "email",
            "maxLength": 256,
            "minLength": 0
        },
        "isActive": {
            "type": "boolean"
        },
        "fullName": {
            "type": "string",
            "readonly": true
        },
        "lastLoginTime": {
            "type": "string",
            "readonly": true,
            "format": "date-time",
            "x-ui-grid": false
        },
        "creationTime": {
            "type": "string",
            "readonly": true,
            "format": "date-time",
            "x-ui-grid": false
        },
        "roleNames": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "x-ui-grid": false
        },
        "canDelete": {
            "type": "boolean",
            "x-ui-grid": false
        },
        "id": {
            "type": "integer",
            "format": "int64"
        }
    }
}
abp.schemas.app.user.create.parameters = {
    input: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "CreateUserDto",
        "type": "object",
        "required": [
            "userName",
            "name",
            "surname",
            "emailAddress",
            "password"
        ],
        "properties": {
            "userName": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "name": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "surname": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "emailAddress": {
                "type": "string",
                "format": "email",
                "maxLength": 256,
                "minLength": 0
            },
            "isActive": {
                "type": "boolean"
            },
            "roleNames": {
                "title": "Roles",
                "type": "array",
                "items": {
                    "type": "string"
                },
                "x-enum-action": "getRoles",
                "x-enum-valuefield": "normalizedName",
                "x-enum-textfield": "displayName"
            },
            "password": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "times": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": [
                    "dayOfWeek",
                    "startTime",
                    "endTime"
                  ],
                  "properties": {
                    "dayOfWeek": {
                      "type": "integer",
                      "minLength": 1,
                      "default":1,
                      "x-enumNames": [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                      ],
                      "enum": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                      ]
                    },
                    "startTime": {
                      "type": "string",
                      "minLength": 1
                    },
                    "endTime": {
                      "type": "string",
                      "minLength": 1
                    },
                    "id": {
                      "type": "integer",
                      "format": "int32"
                    }
                  }
                }
            }
        }
    },
};
// action 'update'
abp.schemas.app.user.update = abp.schemas.app.user.update || {};
abp.schemas.app.user.update.returnValue = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "UserDto",
    "type": "object",
    "required": [
        "userName",
        "name",
        "surname",
        "emailAddress"
    ],
    "properties": {
        "userName": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0
        },
        "name": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0,
            "x-ui-grid": false
        },
        "surname": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0,
            "x-ui-grid": false
        },
        "emailAddress": {
            "type": "string",
            "format": "email",
            "maxLength": 256,
            "minLength": 0
        },
        "isActive": {
            "type": "boolean"
        },
        "fullName": {
            "type": "string",
            "readonly": true
        },
        "lastLoginTime": {
            "type": "string",
            "readonly": true,
            "format": "date-time",
            "x-ui-grid": false
        },
        "creationTime": {
            "type": "string",
            "readonly": true,
            "format": "date-time",
            "x-ui-grid": false
        },
        "roleNames": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "x-ui-grid": false
        },
        "canDelete": {
            "type": "boolean",
            "x-ui-grid": false
        },
        "id": {
            "type": "integer",
            "format": "int64"
        }
    }
}
abp.schemas.app.user.update.parameters = {
    input: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "UpdateUserDto",
        "type": "object",
        "required": [
            "userName",
            "name",
            "surname",
            "emailAddress"
        ],
        "properties": {
            "userName": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "name": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "surname": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "emailAddress": {
                "type": "string",
                "format": "email",
                "maxLength": 256,
                "minLength": 0
            },
            "isActive": {
                "type": "boolean"
            },
            "roleNames": {
                "title": "Roles",
                "type": "array",
                "items": {
                    "type": "string"
                },
                //"x-enum-action": "getRoles",
                "x-enum-valuefield": "normalizedName",
                "x-enum-textfield": "displayName"
            },
            "password": {
                "type": "string",
                "maxLength": 32,
                "minLength": 0
            },
            "id": {
                "type": "integer",
                "format": "int64"
            }
        }
    },
};
// action 'delete'
abp.schemas.app.user.delete = abp.schemas.app.user.delete || {};
abp.schemas.app.user.delete.parameters = {
    input: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "EntityDtoOfInt64",
        "type": "object",
        "properties": {
            "id": {
                "type": "integer",
                "format": "int64"
            }
        }
    },
};

// action 'get'
abp.schemas.app.user.get = abp.schemas.app.user.get || {};
abp.schemas.app.user.get.returnValue = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "UserDto",
    "type": "object",
    "required": [
        "userName",
        "name",
        "surname",
        "emailAddress"
    ],
    "properties": {
        "userName": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0
        },
        "name": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0,
            "x-ui-grid": false
        },
        "surname": {
            "type": "string",
            "maxLength": 32,
            "minLength": 0,
            "x-ui-grid": false
        },
        "emailAddress": {
            "type": "string",
            "format": "email",
            "maxLength": 256,
            "minLength": 0
        },
        "isActive": {
            "type": "boolean"
        },
        "fullName": {
            "type": "string",
            "readonly": true
        },
        "lastLoginTime": {
            "type": "string",
            "readonly": true,
            "format": "date-time",
            "x-ui-grid": false
        },
        "creationTime": {
            "type": "string",
            "readonly": true,
            "format": "date-time",
            "x-ui-grid": false
        },
        "roleNames": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "x-ui-grid": false
        },
        "canDelete": {
            "type": "boolean",
            "x-ui-grid": false
        },
        "id": {
            "type": "integer",
            "format": "int64"
        }
    }
}
abp.schemas.app.user.get.parameters = {
    input: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "EntityDtoOfInt64",
        "type": "object",
        "properties": {
            "id": {
                "type": "integer",
                "format": "int64"
            }
        }
    },
};
// action 'getAll'
abp.schemas.app.user.getAll = abp.schemas.app.user.getAll || {};
abp.schemas.app.user.getAll.returnValue = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "PagedResultDtoOfUserDto",
    "type": "object",
    "properties": {
        "totalCount": {
            "type": "integer",
            "format": "int32"
        },
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "userName",
                    "name",
                    "surname",
                    "emailAddress"
                ],
                "properties": {
                    "userName": {
                        "type": "string",
                        "maxLength": 32,
                        "minLength": 0
                    },
                    "name": {
                        "type": "string",
                        "maxLength": 32,
                        "minLength": 0,
                        "x-ui-grid": false
                    },
                    "surname": {
                        "type": "string",
                        "maxLength": 32,
                        "minLength": 0,
                        "x-ui-grid": false
                    },
                    "emailAddress": {
                        "type": "string",
                        "format": "email",
                        "maxLength": 256,
                        "minLength": 0
                    },
                    "isActive": {
                        "type": "boolean"
                    },
                    "fullName": {
                        "type": "string",
                        "readonly": true
                    },
                    "lastLoginTime": {
                        "type": "string",
                        "readonly": true,
                        "format": "date-time",
                        "x-ui-grid": false
                    },
                    "creationTime": {
                        "type": "string",
                        "readonly": true,
                        "format": "date-time",
                        "x-ui-grid": false
                    },
                    "roleNames": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "x-ui-grid": false
                    },
                    "canDelete": {
                        "type": "boolean",
                        "x-ui-grid": false
                    },
                    "id": {
                        "type": "integer",
                        "format": "int64"
                    }
                }
            }
        }
    }
}
abp.schemas.app.user.getAll.parameters = {
    input: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "UsersResultRequestDto",
        "type": "object",
        "properties": {
            "userName": {
                "type": "string",
                "maxLength": 55,
                "x-ui-filter-eager": true
            },
            "email": {
                "type": "string"
            },
            "skipCount": {
                "type": "integer",
                "format": "int32",
                "maximum": 2147483647.0,
                "minimum": 0.0
            },
            "maxResultCount": {
                "type": "integer",
                "format": "int32",
                "maximum": 2147483647.0,
                "minimum": 1.0
            }
        }
    },
};


/******************************** messages **********************************/
abp.localization = abp.localization || {};
abp.localization.values = {}
abp.localization.values['app'] = {

    Surname:"prénom",
    UserName:"Nom d'utilisateur",
    Yes: "Jae",
    No: "Neej"
};

abp.setting = abp.setting || {};
abp.setting.getInt = function(){
    return 10;
}

window.abp = abp;

export default {
    abp
};



