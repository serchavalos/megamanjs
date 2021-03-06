'use strict';

const fs = require('fs');
const scripts = require('../src/script-manifest.json');

let template = fs.readFileSync(__dirname + '/dev.template.html', 'utf8');
let tags = [];

const pattern = new RegExp('^(.*)<!-- INJECT -->', 'm');
const match = pattern.exec(template);

scripts.forEach((src) => {
  tags.push(match[1] + '<script type="text/javascript" src="' + src + '"></script>');
});

let html = template.replace(pattern, tags.join('\n'));

fs.writeFileSync(__dirname + '/../src/dev.html', html);
