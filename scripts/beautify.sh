find . \( -name node_modules -o -name docs -o -name scripts -o -name coverage \) -prune -o -name '*.js*' ! -name "*.swp" -print | xargs -I % sh -c './node_modules/js-beautify/js/bin/js-beautify.js --config ./.jsbeautifyrc --jslint-happy --good-stuff --replace %; git add %'
