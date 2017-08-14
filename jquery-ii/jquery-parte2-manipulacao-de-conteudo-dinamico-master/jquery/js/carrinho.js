var atualizaDados = function(){
	var carrinho = $(".carrinho");

	carrinho.each(function(){

		var items = $(this).find(".item-total:visible");
		//var quantidadeItem = $(".quantidade");
		var total = 0;
		/*var qtdItens = 0;
		var i = 0;*/
		$.each(items, function(){
			var item = $(this); //This eh um obj JS normal convertido para Jquery
			total += parseFloat(item.text());

			/*qtdItens += parseFloat($(quantidadeItem[i]).text());
			i++;*/
		});
		$(this).find(".valor-total").text(total);
		$(this).find(".quantidade-de-itens").text(items.length);

	});

};

var undo = function(){
	var carrinho = $(this).closest(".carrinho");

	carrinho.find("tr:visible").removeClass("recuperado");

	var trs = carrinho.find("tr:hidden");
	trs.addClass("recuperado");
	trs.show();
	atualizaDados();
};

var removeItem = function(event){
	event.preventDefault();
	//$(this).parent().parent().remove();
	$(this).closest("tr").hide(); //Melhor opção
	$(".quantidade-de-itens").text(parseInt($(".quantidade-de-itens").text()) - 1);

	//var valorParaRemover = parseFloat($(this).parent().prev().text()); //Exemplo de prev - eh ruim pq se a coluna mudar de posicao quebra o codigo
	//var valorParaRemover = parseFloat($(this).parent().siblings(".item-total").text()); //Exemplo de sibilings - Um pouco melhor
	/*var valorParaRemover = parseFloat($(this).closest("tr").find(".item-total").text()); //Ideal - O codigo fica o menos atrelado ao design possivel
	$("#valor-total").text(parseFloat($("#valor-total").text()) - valorParaRemover);
	*/
	atualizaDados();
};

var umaPropaganda = function(){
	var propagandas = ["O que acha de comprar uma motocicleta?",
		               "O que acha de comprar uma lancha?",
		               "O que acha de comprar uma bicicleta?",
		               "O que acha de comprar uma carro?"
		               ];

    var posicao = Math.floor(propagandas.length * Math.random());
    var texto = propagandas[posicao];
    var tr = $("<tr>").addClass("propaganda").append("<td>");
    tr.find("td").text(texto).attr("colspan",6);
    return tr;
}

var daDestaque = function(){
	/*$(this).css({"background":"#CCC"
				,"opacity"	 :"0.5"});*/

	$(this).addClass("hovering");
	$(this).find(".remove-item").fadeIn(1000);
}

var tiraDestaque = function(){
	$(this).removeClass("hovering");
	$(this).find(".remove-item").fadeOut(1000);
}

/*
var escondePropagandas = function(event){
	event.preventDefault();
	//$(".propaganda").hide();
	$(".propaganda").fadeOut(3000);
}

var mostraPropagandas = function(event){
	event.preventDefault();
	//$(".propaganda").show();
	$(".propaganda").fadeIn(3000);
}*/

var alternaPropagandas = function(event){
	event.preventDefault();
	//$(".propaganda").toggle();
	$(".propaganda").fadeToggle(2000);
	$(".alterna-propaganda").toggle();
}

var onLoadFunc = function(){
	atualizaDados();

	var carrinhos = $(".carrinho");
	carrinhos.each(function(){
		var carrinho = $(this);

		carrinho.find("tr:nth-child(3n),tr:last").each(function(){
			umaPropaganda().insertAfter($(this));

		});

	});

	$("tbody tr").hover(daDestaque,tiraDestaque); //Somente trs dentro de tbody (Se não dá destaque no cabecalho da tabela)

	$("#esconde-propagandas").click(alternaPropagandas);
	$("#mostra-propagandas").click(alternaPropagandas);
};

$(".remove-item").click(removeItem);

$(".undo").click(undo);

$(onLoadFunc);
