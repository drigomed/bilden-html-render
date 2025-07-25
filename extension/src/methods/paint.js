import * as globals from './globals.js';

function formatHTML(texto, valores) {
	var s = texto,
		i = valores.length;

	while (i--) {
		s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), valores[i]);
	}
	return s;
};

export default function($element, layout) {
	// ..paint code here
	var script = "function moveSlider(dir, vel, slideWidth) { $('#slider ul').animate({ left: dir * slideWidth }, vel, function () { if(dir > 0) { $('#slider ul li:last-child').prependTo('#slider ul'); } else { $('#slider ul li:first-child').appendTo('#slider ul'); } $('#slider ul').css('left', ''); }); };";

	
	// if(!layout.repaint) {
	// 	if(this.painted) return;			
	// 	this.painted = true;
	// }			
	
	$element.empty();
	$element.css('overflow','auto');
	clearInterval(globals.t);
	
	$('<style>').html(layout.cssCustom).appendTo('head');
	$('<script>').html(script).appendTo('head');
	
	if(this.backendApi.getRowCount() > 0) {
		if (!layout.autoSize) {
			$('<style>').html(globals.cssContent).appendTo( 'head' );

			var requestPage = [{
				qTop : 0,
				qLeft : 0,
				qWidth : 25,
				qHeight : 10000
			}];

			var bodyHtml = "";

			this.backendApi.getData(requestPage).then(function(dataPages) { 
				var partialHtml = layout.HtmlValue;
				
				$.each(dataPages[0].qMatrix, function(key, row) {
					bodyHtml += formatHTML(partialHtml, row.map(o=>o.qText));
				});

				$element.html(layout.PreHtml + bodyHtml + layout.PosHtml);
			});			
		}
		else 
		{
			$('<style>').html(globals.cssContent).appendTo( 'head' );
			var div = $('<div id="slider">');
	
			var largura = $element.width() - 10;
			var altura = $element.height() - 20;
	
			var ul = $('<ul>');
	
			var requestPage = [{
				qTop : 0,
				qLeft : 0,
				qWidth : 25,
				qHeight : 10000
			}];
			//this.backendApi.eachDataRow(function(rownum, row) {
	
			this.backendApi.getData(requestPage).then(function(dataPages) {
				var partialHtml = layout.HtmlValue;
				
				$.each(dataPages[0].qMatrix, function(key, row) {
					var li = $('<li>');
					li.css('width', largura + 'px');
					li.css('height', altura + 'px');
	
					li.html(formatHTML(partialHtml, row.map(o=>o.qText)));
	
					ul.append(li);
				});			
				
	
				div.append(ul);
				
				var divPre = $('<div>');
				divPre.html(layout.PreHtml);
				$element.append(divPre);
				
				$element.append(div);
				
				var divPos = $('<div>');
				divPos.html(layout.PosHtml);
				$element.append(divPos);
	
				if(layout.carousel)
				{
					globals.set_slideCount($('#slider ul li').length);
					globals.set_slideWidth($('#slider ul li').width());
					globals.set_slideHeight($('#slider ul li').height());
					globals.set_sliderUlWidth(globals.slideCount * globals.slideWidth);
	
					$('#slider').css({ width: globals.slideWidth, height: globals.slideHeight });
					$('#slider ul').css({ width: globals.sliderUlWidth, marginLeft: - globals.slideWidth });
					$('#slider ul li:last-child').prependTo('#slider ul');
	
					var spanMoveLeft = $('<span class="control_prev" onclick="moveSlider(1, ' + layout.velocidade + ',' + globals.slideWidth + ')">');
					spanMoveLeft.html('<');
					//spanMoveLeft.on('click', moveLeft(layout.velocidade, globals.slideWidth));
	
					div.append(spanMoveLeft);
	
					var spanMoveRight = $('<span class="control_next" onclick="moveSlider(-1, ' + layout.velocidade + ',' + globals.slideWidth + ')">');
					spanMoveRight.html('>');
					//spanMoveRight.on('click', moveRight(layout.velocidade, globals.slideWidth));
	
					div.append(spanMoveRight);
	
					if(layout.animar) {
						if(layout.intervalo < layout.velocidade)
							layout.intervalo = layout.velocidade;
	
						globals.set_t(setInterval(function() { moveSlider(-1, layout.velocidade, globals.slideWidth); }, layout.intervalo));
					} else {
						clearInterval(globals.t);
					}
				}	
			});	
		}			
	}
	else {
		$element.html(layout.PreHtml + layout.HtmlValue + layout.PosHtml);
	}
}
