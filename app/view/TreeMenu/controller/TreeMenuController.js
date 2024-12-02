Ext.define('WB.view.TreeMenu.controller.TreeMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TreeMenuController',
    control: {
        '#TreeMenu': {
            cellclick: 'onTreeMenuClick',
        }
    },
    init: function() {
        console.log('init');
    },
    onTreeMenuClick: function(me, td, cellIndex, record, tr, rowIndex) {
        if(record.getData().file) {
            const docDir = record.getData().dir;
            const docFile = record.getData().file;
            const docUrl = '/data/' + docDir + '/' + docFile;

            Ext.Ajax.request({
                url: docUrl,
                success: function(response, opts) {
                    // Загружаем документ
                    const chapterText = response.responseText;
                    const parser = new DOMParser();
                    const chapterDoc = parser.parseFromString(chapterText, "text/html");

                    // Текст всей главы
                    Ext.ComponentQuery.query('MainDoc')[0].setHtml(chapterText);
                    //Ext.ComponentQuery.query('MainDoc')[0].render(chapterText);
                    //Ext.Loader.loadScript({url:'/data/' + docDir + '/' +'index.js'});
                    // Активируем редакторы
                    const editorsArr = Ext.query('.extEditorDiv');

                    var editableCodeMirror;
                    var codeMirrorMap = new Map();
                    console.log(editorsArr);
                    for(let i = 0; i < editorsArr.length; i++) {
                        const div = editorsArr[i] ;


                        const defaultCode = div.querySelector('.code').innerText;
                        const extEditor = div.querySelector('.codeMirrorDiv');
                        const codeMirrorId = extEditor.id;
                        const iframeId = 'iframe_' + extEditor.id;
                        const codeCss = div.querySelector('.css') && div.querySelector('.css').innerText;
                        let cssFilePath = div.querySelector('.cssFilePath') && div.querySelector('.cssFilePath').innerText;

                        Ext.create('Ext.container.Container', {
                            layout: {
                                type: 'hbox'
                            },
                            width: '90%',
                            //width: 1000,
                            renderTo: extEditor,//div.querySelector('.tabPanel'),
                            border: 1,
                            style: {borderColor: 'red', borderStyle: 'solid', borderWidth: '1px',},
                            defaults: {
                                xtype: 'panel',
                                border: true,
                                style: {
                                    padding: '1px',
                                    backgroundColor: 'green',
                                }
                            },
                            items: [
                                {
                                    title: false,
                                    flex: 1,
                                    //width: '60%',
                                    //stretch: true,
                                    tbar: [{
                                        xtype: 'button',
                                        text: 'RUN',
                                        handler:function() {
                                            const iframe = document.querySelector('#' + iframeId);
                                            //console.log(defaultCode);
                                            console.log(codeCss);
                                            //console.log(codeMirrorMap.get(i).getValue());
                                            let cssTag;
                                            if(cssFilePath) {
                                                //codeHeader = `<link rel='stylesheet' type='text/css' href='/data/ext/theme-classic/resources/theme-classic-all.css' />`;
                                                //codeHeader = `<link rel='stylesheet' type='text/css' href='/data/examples/button/myTheme/resources/myTheme-all.css' />`;
                                                cssTag = `<link rel='stylesheet' type='text/css' href='${cssFilePath}' />`;
                                            } else {
                                                cssTag = `<link rel='stylesheet' type='text/css' href='/data/ext/theme-classic/resources/theme-classic-all.css' />`;
                                            }
                                            console.log(cssTag);
                                            const extHeader =
                                                `<head>` +
                                                    `<meta http-equiv='Content-Type' content='text/html; charset=windows-1251'>` +
                                                cssTag +
                                                    `<script type='text/javascript' src='/data/ext/ext-all.js'></script>`+
                                                    `<style>${codeCss||''}</style>` +
                                                `</head>`;
                                            const body = `<script>${codeMirrorMap.get(i).getValue()}</script><body></body>`;
                                            // Вставляем сожержание в iframe
                                            iframe.srcdoc = extHeader + body;

                                        }
                                    }],
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            width: '90%',
                                            //id: 'textarea',
                                            //style: { overflow: 'auto'},
                                            listeners: {
                                                afterrender: function(el){
                                                    codeMirrorMap.set(i, CodeMirror.fromTextArea(el.getEl( ).query('textarea')[0], {
                                                        mode: "javascript",
                                                        lineNumbers: true,
                                                        //lineWrapping: true,
                                                        viewportMargin: 30,
                                                        })
                                                    );
                                                    /*codeMirrorArr[i] = CodeMirror.fromTextArea(el.getEl( ).query('textarea')[0], {
                                                        mode: "javascript",
                                                        lineNumbers: true,
                                                        //lineWrapping: true,
                                                        viewportMargin: 30,
                                                    });*/
                                                    console.log(defaultCode);
                                                    codeMirrorMap.get(i).getDoc().setValue(defaultCode);
                                                    //editableCodeMirror.setSize(400, 300);
                                                    codeMirrorMap.get(i).setSize(600, 300);

                                                    //console.log(editableCodeMirror);
                                                }
                                            }
                                        }
                                    ],
                                },
                                {
                                    title: '222',
                                    flex: 1,
                                    //width: '70%',
                                    height: '100%',
                                    //layout: 'fit',
                                    html: `<iframe id="${iframeId}" style="width:90%;height:90%"></iframe>`
                                }
                            ]
                        });

                        //Ext.tip.QuickTipManager.init();
                        /*Ext.create('Ext.tab.Panel', {
                            width: 200,
                            height: 200,
                            border:true,
                            id : 'ppp',
                            renderTo: div.querySelector('.tabPanel'),
                            //renderTo : div,
                            items: [
                                {
                                    xtype: 'textarea',
                                    listeners: {
                                        afterrender:function(textarea){
                                            var editableCodeMirror = CodeMirror.fromTextArea(textarea.getEl( ).query('textarea')[0], {
                                                mode: "javascript",
                                                lineNumbers: true
                                            });
                                            editableCodeMirror.getDoc().setValue("console.log('Hello CodeMirror')");
                                        }
                                    }
                                },
                                {
                                title: 'Code',
                                id: 'ccc',
                                html: 'ccccc'
                                //html: '<div style="width:100px;height:100px;" id="ccc2"></div>'
                            }, {
                                title: 'Run',
                                tabConfig: {
                                    title: 'Custom Title',
                                    tooltip: 'A button tooltip'
                                }
                            }],
                            listeners: {
                                afterrender: function(me) {
                                    console.log(me.getEl().dom);
                                    console.log(me.getEl().dom.querySelector('#ccc'));
                                    let r = me.getEl().dom.querySelector('#ccc');
                                    let r2 = me.getEl().dom.querySelector('#ppp');

                                    //const r = me.down('#ccc');

                                    var myCodeMirror = CodeMirror(r2, {
                                        lineNumbers: true,
                                        value: code,
                                        mode:  "javascript",
                                        width: 150
                                    });

                                }
                            }
                        });*/

                        //const extEditor = div.querySelector('.codeMirrorDiv');
                        //const extEditor = div.querySelector('#ccc');
                        //console.log(extEditor);


                        //const innerText = div.innerText;
                        //Ext.getCmp('ccc');
                        //console.log(code);
                        //const innerText = div.querySelector('.extEditor').innerText;
                        //console.log(innerText);


                        /*var myCodeMirror = CodeMirror(extEditor, {
                            lineNumbers: true,
                            value: code,
                            mode:  "javascript",
                            width: 150
                        });*/


                        /*Ext.create('Ext.Button', {
                            text: 'Click me',
                            renderTo: div.querySelector('.btn'),
                            handler: function() {
                                alert('You clicked the button!');
                            }
                        });*/

                    }


                /*    for(let i = 0; i < editorsArr.length; i++) {
                        const editorDiv = editorsArr[i];
                        const editorName = editorsArr[i].getAttribute('data-editor');
                        const editorUrl = '/data/' + docDir + '/' + editorName + '.json';

                        Ext.Ajax.request({
                            url: editorUrl,
                            success: function(response, opts) {
                                const obj = Ext.decode(response.responseText);

                                const frameDoc = '<iframe id="myIframe" style="width:90%;height:90%"></iframe>';

                                //editorDiv.setHTML(`<pre>${obj.code}</pre>`);
                            },
                            failure: function() { //TODO не раб
                                editorDiv.setHTML(`<pre>страница не найдена</pre>`);
                            }
                        });

                    }*/

                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });

          /*  Ext.defer(function(){
                                            let myTextarea = document.querySelector('#codeMirror0' );
                                            console.log(myTextarea);
                                            let editor = CodeMirror(myTextarea, {
                                                        lineNumbers: true,
                                                        value: "function myScript(){return 100;}\n",
                                                        mode:  "javascript"
                                                      });
            },2000);*/


        };
    }
});
