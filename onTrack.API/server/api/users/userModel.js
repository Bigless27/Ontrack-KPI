var mongoose = require('mongoose');
var Schema = mongoose.Schema
var bcrypt = require('bcrypt') 
var jwt = require('express-jwt');

var UserSchema = new Schema({
    email: { type: String, unique: true, required: true, index: true },
    teamId: [{type: Schema.Types.ObjectId, ref: 'team'}],
    password: { type: String},
    firstName: { type: String },
    lastName: { type: String },
    avatarUrl: { type: String },
    dateJoined: { type: Date, default: Date.now },
    state: { type: String },
    activity : [{type: Schema.Types.ObjectId, ref: 'activity'}],
    progress : [{type: Schema.Types.ObjectId, ref: 'progresssetting'}],
    facebook: {
        id: String,
        token: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    this.password = this.encryptPassword(this.password);
    next()
})

UserSchema.pre('remove', function(next) {
    // this require here is a patch!!! look to refactor in furture from circular dependency
    var Client = require('../team/teamModel'),
        SettingProgress = require('../settings/progress-settings/settingsModel'),
        Progress = require('./progress/progressModel'),
        Activity = require('../activity/activityModel')

    // delete all activity refs that this user is associated with
    // delete all settingProgress this user is associated with
    // delete all teams that this user is associated with
    delUser = this

    Activity.find({'users.userId' : delUser._id}, function(err, activity) {
        if (err) next(err)
        if (activity.length > 0) {
            activity.forEach(function(act) {
               var delIndex = act.users.map(x => x.userId).indexOf(delUser._id.toString())
               act.users.splice(delIndex, 1)
               act.save(function(err) {
                if (err) next(err)
               })
            })
        }
    })

    SettingProgress.find({'users.userId' : delUser._id}, function(err, setProg) {
        if (err) next(err)
        if (setProg.length > 0) {
            setProg.forEach(function(set) {
                var delIndex = set.users.map(x => x.userId).indexOf(delUser._id.toString())
                set.users.splice(delIndex, 1)
                set.save(function(err) {
                    if (err) next(err)
                })
            })
        }
    })

    Team.find({'usersTeam.email': delUser.email}, function(err, teams) {
        if (err) next(err)
        if (teams.length > 0) {
            teams.forEach(function(team) {
                var adminEmails = team.reduceEmailArray('admins', 'email')
                var userEmails = team.reduceEmailArray('usersTeam', 'email')
  
                var adminIndex = adminEmails.indexOf(delUser.email)

                var usersIndex = userEmails.indexOf(delUser.email)
                if (adminIndex >= 0) {
                    team.admins.splice(adminIndex, 1)
                }
                else if(usersIndex >= 0) {
                    team.usersTeam.splice(usersIndex, 1)
                }
                team.save(function(err, saved) {
                    if (err) next(err)
                })
            })
            
        }
        

    })

    next()
})

UserSchema.methods = {
    //check the passwords on sigin
    authenticate: function(plainTextPword, cb) {
        return bcrypt.compare(plainTextPword, this.password, function(err, isMatch){
            if(err) return cb(err)
            cb(err, isMatch)
        })
    },

    //hash the password
    encryptPassword: function(plainTextPword) {
        if (!plainTextPword) {
            return ''
        } else {
            var salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    }, 

    toJson: function() {
        var obj = this.toObject()
        delete obj.password;
        return obj;
    }

}

module.exports =  mongoose.model('user', UserSchema);