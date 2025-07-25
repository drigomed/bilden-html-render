import {
	initialProperties,
	definition,
	support,
	controller,
	paint,
	resize,
} from "./methods"

import * as globals from "./methods/globals.js";

window.define(["qlik", "text!./static/style.css"], function(qlik, cssContent) {	

	globals.set_cssContent(cssContent);
	globals.set_qlikObject(qlik);

	return {
		initialProperties,
		definition,
		support,
		controller,
		paint,
		resize,
	}
})
