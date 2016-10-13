// VALIDATORS
function PageValidate(validation_group, class_add, message_hide) {
	//Valida todos os validators da página, filtra o grupo de validação passado
	var result = Page_ClientValidate(validation_group);

	//criação de um array para manipular cada validador
	var validatorAlreadyValidated = new Array();

	//Para cada validator validado em Page_ClientValidate, percorrer cada um
	//e aplicar o estilo "erro" ou "sucesso" consuante o estado da validação.
	for (var i = 0; i < Page_Validators.length; i++) {
		//criar uma variavel para o objecto validador
		var validator = Page_Validators[i].controltovalidate;
		//Verificar se o validador já foi validado, ou seja se ja se encontra no TempArray criado acima.
		if ($.inArray(validator, validatorAlreadyValidated) == -1) {
			//Se o validador ainda não existe no Temp Array, quer dizer que ainda não foi validade.
			//Neste caso, é preciso aplicar-lhe um estilo e coloca-lo no Temp Array.
			ChangeValidatorStyle(validator, Page_Validators[i].isvalid, class_add, message_hide);

			if (!Page_Validators[i].isvalid) {
				validatorAlreadyValidated.push(validator);
			}
		}
	}
	
	if (!result && $(".tooltip-error").length > 0) {
	    if ($('.login-modal').length === 0) {
	        $('html, body').animate({ scrollTop: $(".tooltip-error").first().offset().top - 120 }, 1000);
	    }
	}	
	
	return result;
}

function SingleValidator(single_validator, validation_group, class_add, message_hide) {
    var validator = null;
	for (var i = 0; i < Page_Validators.length; i++) {
	    
	    if (Page_Validators[i].controltovalidate == single_validator)
	    {
	        ValidatorValidate(Page_Validators[i]);
	        ChangeValidatorStyle($(Page_Validators[i]).attr("id"), Page_Validators[i].isvalid, class_add, message_hide);
	        if (!Page_Validators[i].isvalid) {
	            break;
	        }
	    };
	}
}

function ChangeValidatorStyle(id, isvalid, class_add, message_hide) {
	if (!isvalid) {
	    //$('#' + id).parent().addClass(class_add);
	    $('#' + id).closest(".custom-tooltip").addClass(class_add);
		if (message_hide != null) {
			$('.' + message_hide).css("display", "block");
		}
	}
	else {
		$('#' + id).closest(".custom-tooltip").removeClass(class_add);
	}
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode != 46 && charCode > 31 && !(!evt.shiftKey && !evt.altKey && ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105)))) {
		evt.preventDefault();
		return false;
	}
	return true;
}
