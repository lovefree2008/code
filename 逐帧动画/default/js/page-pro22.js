;(function ($){

	var page = (function(){
		var wpw = function (opts) {
			var test = 1;
		}
		page.prototype = {

            alert(test);


        };
        return page;

	})();

	//注册到对象
    $.fn.page = function (opts) {
        return new page(this[0], opts);
    };


})(jQuery); 