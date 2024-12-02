/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'WB.Application',

    name: 'WB',

    requires: [
        // This will automatically load all classes in the WB namespace
        // so that application classes do not need to require each other.
        'WB.*'
    ],

    // The name of the initial view to create.
    mainView: 'WB.view.main.Main'
});
