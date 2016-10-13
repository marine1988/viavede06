/* Portuguese initialisation for the jQuery UI date picker plugin. */
jQuery(function($){
	$.datepicker.regional['es-ES'] = {
		closeText: 'Cerca',
		prevText: '&#x3C;Anterior',
		nextText: 'Siguiente',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio​​','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
		dayNamesMin: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
		//dayNamesMin: ['D','S','T','Q','Q','S','S'],
		weekHeader: 'Sem',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
});
