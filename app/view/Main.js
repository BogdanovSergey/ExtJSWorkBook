Ext.define('WB.view.Main', {
 extend: 'Ext.container.Viewport',
 requires: [
    'WB.view.TreeMenu.Main',
    'WB.view.MainDoc.Main',
 ],
 xtype: 'MainViewport',
 layout: {
    type: 'vbox',
    align: 'stretch'
 },
 items: [
    {
     border: false,
     //margin: '0 0 5 0',
     height: 100,
     xtype: 'panel',
     header: false,
     html: 'ExtJs toolkit (скачать)',
     bodyStyle: {
        backgroundColor: '#025b80',
        color: 'white'
     }
    },
    {
     border: false,
     //margin: '0 0 5 0',
     xtype: 'panel',
     header: false,
     flex: 1,
     html: 'left panel',
     bodyStyle: {
        backgroundColor: 'grey',
        color: 'white'
     },
     layout: {
         type: 'hbox',
         align: 'stretch'
      },
     items: [
        {xtype: 'TreeMenu'},
        {
            xtype: 'MainDoc',
            //layout: 'fit'
        },
     ]
    }
  ]
});
