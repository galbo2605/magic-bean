module.exports = {
  name: 'magic-bean',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/magic-bean',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
