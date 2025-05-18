export const fileStructureData = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'features',
        type: 'folder',
        children: [
          {
            name: 'buttons',
            type: 'folder',
            children: [
              {
                name: 'components',
                type: 'folder',
                children: [
                  { name: 'SubmitButton', type: 'folder', children: [
                    { name: 'SubmitButton.jsx', type: 'jsx' },
                    { name: 'animations.js', type: 'js' },
                    { name: 'index.js', type: 'js' }
                  ]},
                  { name: 'DeleteButton', type: 'folder', children: [
                    { name: 'DeleteButton.jsx', type: 'jsx' },
                    { name: 'animations.js', type: 'js' },
                    { name: 'index.js', type: 'js' }
                  ]},
                  { name: 'index.js', type: 'js' }
                ]
              },
              { name: 'index.jsx', type: 'jsx' }
            ]
          }
        ]
      }
    ]
  }
];