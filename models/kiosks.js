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
        // Configure decorators for sequelize
        displayName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'display_name'
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        zipCode: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'zip_code'
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        hotDishAvailability: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'hot_dish_availability'
        },
        simCardNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'sim_card_number'
        },
        fridgeModel: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'fridge_model'
        },
        fridgeSn: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'fridge_sn'
        },
        controllerUnitSn: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'controller_unit_sn'
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        hostName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'host_name'
        },
        hostContact: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'local_contact'
        },
        hostContactPhoneNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'local_contact_number'
        },
        rentAmount: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'rent_amount'
        },
        serviceFee: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'service_fee'
        },
        utilitiesAmount: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: 'utilities_amount'
        },
        accessNotes: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'access_notes'
        },
        hoursOfOperationsFull: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'hours_of_operations_full'
        },
        latitude: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(CONSTANTS.KIOSK_STATUSES),
            allowNull: false
        },
        temperature: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        isDoorOpened: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_door_opened'
        },
        isLocked: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'is_locked'
        },
        ip: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        teltonikaRemoteAccessId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'teltonika_remote_access_id'
        },
        teltonikaHost: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'teltonika_host'
        },
        useTeltonika: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'use_teltonika'
        },
        timeBasedDiscount: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'time_based_discount'
        },
        discountSchedulesFull: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'discount_schedules_full'
        },
        doorStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'door_status'
        },
        timeDiscountAmount: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            validate: {
                min: 1,
                max: 99,
            },
            field: 'time_discount_amount'
        },
        firstPurchaseDiscount: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'first_purchase_discount'
        },
        deliveryDiscount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'delivery_discount'
        },
        deliveryDiscountAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0,
            field: 'delivery_discount_amount'
        },
        firstPurchaseDiscountAmount: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            field: 'first_purchase_discount_amount'
        },
        connected: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        temperatureEmail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'temperature_email'
        },
        ivideonCameraId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'ivideon_camera_id'
        },
        kerpakUnitSn: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'kerpak_unit_sn'
        },
        controllerMac: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'controller_mac'
        },
        routerSn: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'router_sn'
        },
        routerMac: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'router_mac'
        },
        ivideonCameraSn: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'ivideon_camera_sn'
        },
        ivideonCameraMac: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'ivideon_camera_mac'
        },
        paymentTerminalSn: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'payment_terminal_sn'
        },
        paymentTerminalIp: {
          type: DataTypes.STRING(255),
          allowNull: true,
          field: 'payment_terminal_ip'
        },
        useSocket: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'use_socket'
        },
        useTrafficSaving: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'use_Traffic_Saving'
        },
        isTempSensorError: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_temp_sensor_error'
        },
        isPortError: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_port_error'
        },
        portError: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'port_error'
        },
        connectionEmail: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'connection_email'
        },
        kioskLoad: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            field: 'kiosk_load'
        },
        lastTransferDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_transfer_date'
        },
        isCoffeeMachine: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_coffeeMachine'
        },
        coffeeMachineID: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            field: 'coffeeMachine_id'
        },
        deliveryIsKioskAllow: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_is_kiosk_allow'
        },
        deliveryMinAllowedTime: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            allowNull: true,
            field: 'delivery_min_allowed_time'
        },
        deliveryTransferTimeFrom: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true,
            field: 'delivery_transfer_time_from'
        },
        deliveryTransferTimeTo: {
            type: DataTypes.DATE,
            defaultValue: null,
            allowNull: true,
            field: 'delivery_transfer_time_to'
        },
        deliveryMonday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_monday'
        },
        deliveryTuesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_tuesday'
        },
        deliveryWednesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_wednesday'
        },
        deliveryThursday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_thursday'
        },
        deliveryFriday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_friday'
        },
        deliverySaturday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_saturday'
        },
        deliverySunday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'delivery_sunday'
        },

        hoursOfOperationsMonday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_monday'
        },
        hoursOfOperationsMondayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_monday_from'
        },
        hoursOfOperationsMondayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_monday_to'
        },

        hoursOfOperationsTuesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_tuesday'
        },
        hoursOfOperationsTuesdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_tuesday_from'
        },
        hoursOfOperationsTuesdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_tuesday_to'
        },

        hoursOfOperationsWednesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_wednesday'
        },
        hoursOfOperationsWednesdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_wednesday_from'
        },
        hoursOfOperationsWednesdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_wednesday_to'
        },

        hoursOfOperationsThursday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_thursday'
        },
        hoursOfOperationsThursdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_thursday_from'
        },
        hoursOfOperationsThursdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_thursday_to'
        },

        hoursOfOperationsFriday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_friday'
        },
        hoursOfOperationsFridayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_friday_from'
        },
        hoursOfOperationsFridayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_friday_to'
        },

        hoursOfOperationsSaturday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_saturday'
        },
        hoursOfOperationsSaturdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_saturday_from'
        },
        hoursOfOperationsSaturdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_saturday_to'
        },

        hoursOfOperationsSunday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'hoursOfOperations_sunday'
        },
        hoursOfOperationsSundayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_sunday_from'
        },
        hoursOfOperationsSundayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'hoursOfOperations_sunday_to'
        },

        discountSchedulesMonday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_monday'
        },
        discountSchedulesMondayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_monday_from'
        },
        discountSchedulesMondayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_monday_to'
        },

        discountSchedulesTuesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_tuesday'
        },
        discountSchedulesTuesdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_tuesday_from'
        },
        discountSchedulesTuesdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_tuesday_to'
        },

        discountSchedulesWednesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_wednesday'
        },
        discountSchedulesWednesdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_wednesday_from'
        },
        discountSchedulesWednesdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_wednesday_to'
        },

        discountSchedulesThursday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_thursday'
        },
        discountSchedulesThursdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_thursday_from'
        },
        discountSchedulesThursdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_thursday_to'
        },

        discountSchedulesFriday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_friday'
        },
        discountSchedulesFridayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_friday_from'
        },
        discountSchedulesFridayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_friday_to'
        },

        discountSchedulesSaturday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_saturday'
        },
        discountSchedulesSaturdayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_saturday_from'
        },
        discountSchedulesSaturdayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_saturday_to'
        },

        discountSchedulesSunday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            field: 'discountSchedules_sunday'
        },
        discountSchedulesSundayFrom: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_sunday_from'
        },
        discountSchedulesSundayTo: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'discountSchedules_sunday_to'
        },
        lastActivity: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'last_activity'
        },
        launchDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            field: 'launch_date'
        }
    };

    const definition = {
        tableName: 'kiosks'
    };

    const kiosks = sequelize.define('kiosks', fields, definition);
    kiosks.associate = (db) => {
        kiosks.belongsTo(db.serviceProviders, {
            foreignKey: {
                name: 'serviceProviderId',
                field: 'service_provider_id',
                allowNull: true
            }
        });
        kiosks.belongsTo(db.menus, {
            foreignKey: {
                name: 'menuId',
                field: 'menu_id',
                allowNull: true
            },
            onDelete: 'CASCADE'
        });
        kiosks.hasMany(db.discountSchedules, {
            as: 'discountSchedules',
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        kiosks.hasMany(db.hoursOfOperations, {
            as: 'hoursOfOperations',
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        kiosks.hasMany(db.productItems, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        kiosks.hasMany(db.orders, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        kiosks.hasMany(db.connectionLogs, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        kiosks.hasMany(db.reviews, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        kiosks.hasOne(db.kiosksTemperatureStatus, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id',
            },
        });
        kiosks.hasOne(db.kiosksUnstableConnectionStatus, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id',
            },
        });
        kiosks.hasMany(db.preOrders, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
        kiosks.hasMany(db.kioskSessions, {
            foreignKey: {
                name: 'kioskId',
                field: 'kiosk_id'
            }
        });
    };
    return kiosks;
};