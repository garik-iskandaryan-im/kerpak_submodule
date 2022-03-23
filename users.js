const { Op } = require('sequelize');
const crypt = require('app/helpers/crypt');

const exception = require('app/helpers/exception');
const messages = require('app/helpers/messages');
const CONSTANTS = require('app/constants');

module.exports = (sequelize, DataTypes) => {
    const fields = {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'last_name'
        },
        isKerpakOperator: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_kerpak_operator'
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'phone'
        },
        email: {
            type: DataTypes.STRING(500),
            allowNull: false,
            // Why not use 'unique: true' instead of isUnique() function
            validate: {
                notEmpty: true,
                isEmail: {
                    args: true,
                    msg: messages.validations.email.isInvalid()
                },
                isUnique(value, next) {
                    const self = this;
                    return sequelize.models.users.scope({ method: ['email', value] })
                        .findOne({ where: { id: { [Op.ne]: self.id } } })
                        .then((user) => {
                            if (user) {
                                return next(messages.validations.email.isNotUnique(self.email));
                            }
                            return next();
                        });
                }
            },
            set: function (val) {
                this.setDataValue('email', val.toString().toLowerCase());
            },
            field: 'email'
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            field: 'password_hash'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'is_active'
        },
        isChangingPassword: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'is_changing_password'
        },
        lastLoginDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_login_date'
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: DataTypes.NULL,
            field: 'reset_password_token'
        },
        passwordExpireDate: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: new Date(Date.now() + CONSTANTS.PASSWORD_EXPIRE_DAYS * 24 * 60 * 60 * 1000),
            field: 'password_expire_date'
        },
        resetPasswordExpairationDate: {
            type: 'TIMESTAMP',
            allowNull: true,
            field: 'reset_password_expairation_date'
        },
        owner: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'owner'
        },
        //VIRTUAL
        password: {
            type: DataTypes.VIRTUAL,
            validate: {
                notEmpty: true
            }
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    };

    const definition = {
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ],
        defaultScope: {
            where: { archived: false },
            attributes: { exclude: ['passwordHash', 'password'] },
        },
        scopes: {
            active: () => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: { isActive: true }
                };
            },
            inactive: () => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: { isActive: false }
                };
            },
            authenticate: () => {
                return {
                    attributes: { include: ['passwordHash'] },
                };
            },
            email: (value) => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: { email: value }
                };
            },
            emailIncludingSP: (value) => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: { email: value },
                    include: [
                        {
                            model: sequelize.models.serviceProviders,
                            attributes: ['id', 'regionId'],
                            required: false,
                        }
                    ]
                };
            },
            withPasswords: (id) => {
                return {
                    attributes: { include: ['passwordHash'] },
                    where: { id: id }
                };
            },
            passwordNotifications: () => {
                const expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 7);
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: {
                        passwordExpireDate: {
                            [Op.lte]: expireDate
                        },
                        microsoftSSOEnabled: false
                    },
                    include: [
                        {
                            model: sequelize.models.passwordNotifications
                        }
                    ]
                };
            },
            users: () => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] }
                };
            },
            user: (id) => {
                return {
                    attributes: { exclude: ['passwordHash', 'password'] },
                    where: {
                        id: id
                    }
                };
            }
        },
        hooks: {
            beforeUpdate: hashPasswordHook
        }
    };

    const users = sequelize.define('users', fields, definition);

    users.associate = (db) => {
        users.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: true
            },
            onDelete: 'CASCADE'
        });
        users.hasMany(db.ordersRefund, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });
        users.hasMany(db.usersPasswordHistory, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    };

    users.prototype.authenticate = (password, user) => {
        return new Promise((resolve, reject) => {
            crypt.compare(password, user.passwordHash)
                .then((result) => {
                    if (result === false) {
                        return reject(exception.invalidUserPasswordException(user.email));
                    } else if (user.isActive === false) {
                        return reject(exception.inactiveUserException(user.email));
                    }
                    return true;
                })
                .then(() => {
                    return user.updateLastLogin(user);
                })
                .then((user) => {
                    return resolve(user);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    };

    users.prototype.updateLastLogin = (user) => {
        return new Promise((resolve, reject) => {
            user.update(
                {
                    lastLoginDate: Date.now()
                })
                .then((user) => {
                    return resolve(user);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    };
    return users;
};

const hashPasswordHook = (instance, options) => {
    if (!instance.changed('password')) {
        return;
    } else {
        return crypt.hash(instance.get('password'))
            .then((hash) => {
                // Set password expire date
                const expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + CONSTANTS.PASSWORD_EXPIRE_DAYS);
                instance.set('passwordExpireDate', expireDate);
                // Remember to set the data value, otherwise it won't be validated
                return instance.set('passwordHash', hash);
            });
    }
};