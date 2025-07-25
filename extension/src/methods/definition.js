import * as about from "../../../utils/about";

export default {
	type: "items",
	component: "accordion",
	items: {
		dimensions : {
			uses : "dimensions",
			min : 0
		},
		measures : {
			uses : "measures",
			min : 0
		},
		sorting : {
			uses : "sorting"
		},
		addons: { 
			uses: "addons", 	   
			items: {	   
				 dataHandling: { 	   
					  uses: "dataHandling" 	   
				 }	   
			}	   
	    },
		appearancePanel: {
			uses: "settings",
			items: {
				html: {
					type: 'items',
					label: 'HTML',
					items: { 
						preHtml: {
							ref: "PreHtml",
							expression: 'optional',
							type: "string",
							label: "Html Preliminar",
							defaultValue: ""
						},
						htmltemplate: {
							ref: "HtmlValue",
							expression: 'optional',
							type: "string",
							label: "Html Template",
							defaultValue: ""
						},
						posHtml: {
							ref: "PosHtml",
							expression: 'optional',
							type: "string",
							label: "Html Posterior",
							defaultValue: ""
						},
						cssCustom: {
							ref: "cssCustom",
							expression: 'optional',
							type: "string",
							label: "CSS",
							defaultValue: ""
						},
						autoSize: {
							ref: "autoSize",
							type: "boolean",
							label: "Tamanho Automatico?",
							defaultValue: true
						}
						// ,repaint: {
						// 	ref: "repaint",
						// 	type: "boolean",
						// 	label: "Atualizar HTML sempre?",
						// 	defaultValue: false
						// }
						// ,snapshot: {
						// 	ref: "snapshot",
						// 	type: "boolean",
						// 	label: "Habilitar Snapshot?",
						// 	defaultValue: false
						// },
						// export: {
						// 	ref: "export",
						// 	type: "boolean",
						// 	label: "Habilitar Export?",
						// 	defaultValue: false
						// }
					}								
				},
				carousel:{
					type: 'items',
					label: 'Carrossel',
					show: function(e) { return e.autoSize; },
					items: {
						exibir: {
							type: 'boolean',
							ref: 'carousel',
							label: 'Exibir como carrossel',
							defaultValue: true
						},
						animacao:{
							type: 'boolean',
							ref: 'animar',
							label: 'Animar carrossel',
							defaultValue: false
						},
						intervalo:{
							type: 'integer',
							ref: 'intervalo',
							label: 'Intervalo da animação (em ms)',
							defaultValue: "1000"
						},									
						velocidade:{
							type: 'integer',
							ref: 'velocidade',
							label: 'Velocidade da animação (em ms)',
							defaultValue: "200"
						}
					}								
				},							
			}
		},
		about: about.config
	}
}
