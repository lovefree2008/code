// $(document).ready(function(){

	function page(sl,ids,curs,shows,pages){
		//每页显示的数目
		var show_per_page = sl; 
		//获取content对象里面，数据的数量
		var number_of_items = $(ids).children().size();
		//计算页面显示的数量
		var number_of_pages = Math.ceil(number_of_items/show_per_page);
		//隐藏域默认值
		$(curs).val(0);
		$(shows).val(show_per_page);
		// var curs = $(ids).prev('#show_per_page').prev('#current_page');
		// var shows = $(ids).prev('#show_per_page');
		// curs.val(0);
		// shows.val(show_per_page);

		var navigation_html = '<a class="previous_link pre"></a>';
		var current_link = 0;

		while(number_of_pages > current_link){
			navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +',&quot;'+  ids +' &quot;,&quot;'+  curs +' &quot;,&quot;'+  shows +' &quot;,&quot;'+  pages +' &quot;)" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
			// navigation_html += '<a class="page_link" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
			current_link++;
		}



		navigation_html += '<a class="next_link next"></a>';

		$(pages).html(navigation_html);

		// $(pages).find(".page_link").bind('click',function(){
		// 	go_to_page(current_link,ids)
		// })
		//默认选中第一页
		$(pages).find(".page_link:first").addClass('oncur');

		//隐藏该对象下面的所有子元素
		$(ids).children().css('display', 'none');

		//显示第n（show_per_page）元素
		$(ids).children().slice(0, show_per_page).css('display', 'block');
		// $('#content').children().slice(0, show_per_page).fadeIn('fast');
		// 
		
		$(pages).find(".previous_link").bind('click',function(e){
			// e.preventDefault();
			previous(ids,curs,shows,pages);
		})
		$(pages).find(".next_link").bind('click',function(e){
			// e.preventDefault();
			nexts(ids,curs,shows,pages);
		})

}

	//上一页
	function previous(ids,curs,shows,pages){
		new_page = parseInt($(curs).val()) - 1;
		//if there is an item before the current active link run the function
		if($(pages+' .oncur').prev('.page_link').length==true){
			go_to_page(new_page,ids,curs,shows,pages);
		}
	}

	//下一页
	function nexts(ids,curs,shows,pages){
		new_page = parseInt($(curs).val()) + 1;
		//if there is an item after the current active link run the function
		if($(pages+' .oncur').next('.page_link').length==true){
			go_to_page(new_page,ids,curs,shows,pages);
		}

	}

	//跳转某一页
	function go_to_page(page_num,ms,cu,sh,pa){

		//获得每页显示的数目数
		var show_per_page = parseInt($(sh).val());
		//slice 开始位置
		start_from = page_num * show_per_page;
		//slice 结束位置
		end_on = start_from + show_per_page;

		//显示第n-m（start_from, end_on）元素
		// $('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
		$(ms).children().hide().slice(start_from, end_on).fadeIn('100');

		/* 跳转当前页面添加选中样式 */
		$(pa).find('.page_link[longdesc=' + page_num +']').addClass('oncur').siblings('.oncur').removeClass('oncur');

		//填充当前value
		$(cu).val(page_num);
	}

	

// });




