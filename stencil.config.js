exports.config = {
	namespace: 'stflippy',
	generateDistribution: true,
	generateWWW: false,
  bundles: [
    { components: ['st-flippy'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
