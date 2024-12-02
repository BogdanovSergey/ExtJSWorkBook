/*
 * This call registers your application to be launched when the browser is ready.
 */
Ext.application({
    name: 'WB',
    extend: 'WB.Application',
    appFolder: 'app',
    requires: [
        'WB.view.Main'
    ],
    controllers: ['Controller'],
    mainView: 'WB.view.Main',
    /*launch: function () {
        Ext.Msg.alert('Hello Ext JS', 'Hello! Welcome to Ext JS.');
    }*/
});
