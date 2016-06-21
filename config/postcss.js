module.exports = function postcss() {
  return [
    cssModules({
      scopeBehaviour: 'local',
    }),
  ];
}
