Ext.define('WB.view.TreeMenu.Main',{
    extend: 'Ext.tree.Panel',
    requires: ['WB.view.TreeMenu.controller.TreeMenuController'],
    xtype: 'TreeMenu',
    id: 'TreeMenu',
    controller: 'TreeMenuController',
    rootVisible: false,
    header: false,
    store: Ext.create('Ext.data.TreeStore', {
           root: {
               expanded: true,
               children: [
                   { text: 'runner test', dir: 'chapter0', file: 'runner.html', leaf: true },
                   { text: 'План', dir: 'chapter0', file: 'plan.html', leaf: true },
                   { text: 'Трепанация кнопки', dir: 'examples', file: 'button/button.html', leaf: true },
                   { text: 'Глава 1', expanded: true,
                       children: [
                           { text: 'Введение в ExtJS', dir: 'chapter1', file: 'welcome.html', leaf: true },
                           { text: 'Как скачать и установить', dir: 'chapter1', file: 'download.html', leaf: true},
                           { text: 'Общий обзор фреймворка Ext JS ', dir: 'chapter1', file: 'review.html', leaf: true},
                           { text: 'Создание первого приложения ', dir: 'chapter1', file: 'first_app.html', leaf: true},
                           { text: 'Создание приложения через SenchaCmd', dir: 'chapter1', file: 'senchacmd/senchacmd.html', leaf: true},
                           { text: 'Отладка', dir: 'chapter1', file: 'debug.html', leaf: true},

                        ]
                   },
                   { text: 'Концепция компонентов', dir: 'components',  file: 'index.html', expanded: true,
                       children: [
                           { text: '1. Core Concepts', dir: 'chapter1', file: '.html', leaf: true },
                           { text: '', dir: 'chapter1', file: 'review.html', leaf: true},
                           { text: '', dir: 'chapter1', file: 'first_app.html', leaf: true},
                           { text: '', dir: 'chapter1', file: 'senchacmd.html', leaf: true},

                       ]
                   },
                   {
                       text: 'Система классов в Ext JS', expanded: false,//true,
                       //children: []
                   },
                   {
                       text: 'Красивые примеры', expanded: true,
                       children: [
                           {text: 'Меню', dir: 'examples', file: 'index.html', leaf: true },
                           {text: 'Приложение в приложении', dir: 'examples', file: 'index.html', leaf: true },
                           {text: 'Пустой grid', dir: 'examples', file: 'index.html', leaf: true },
                       ],
                   },
                   {
                       text: 'Разное', expanded: true,
                       children: [
                           {text: 'Селекторы', leaf: true},
                           {text: 'Store', leaf: true},
                       ],
                   }
               ]
           }
       }),
    width: 200,
    border: true,

});



