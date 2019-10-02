var afield = {
    name : '',
    type : '',
    isVirtual : false,
    source : [''],
    constraint : ['','']
}

var aTable = {
    name : '',
    isVirtual : false,
    source : [],
    constraint : [] // "cross-fields constraint"
}

// constraint must be scoped into a plugin name path
var afieldConstraint = {
    name : 'FieldsDivisbles',
    inputs : {
        aField : 'field',
        isModulo : 'Bool'
    },
    on : 'Update',
    constraint : function (ctx, aField, isModulo) {
        return true || false
    }
}

var afieldSource = {
    name : 'likes',
    inputs : {
        postId : 'String',
        apiKey : 'String'
    },
    source : function (ctx, postId, apiKey) {
        get('api.facebook.com/')
        var likes = 3423
        return likes
    }
}