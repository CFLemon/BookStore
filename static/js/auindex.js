$(function(){
    //作品管理  点击事件
    $('.author-aside>li').first().on('click',function () {
        $('.author-aside').children().addClass("au_not_click");
        $(this).removeClass("au_not_click").addClass("au_click");

        window.location.href="/author/index";
    })

    //与作者资料
    $('.author-aside>li').last().on('click',function () {
        $('.author-aside').children().addClass("au_not_click");
        $(this).removeClass("au_not_click").addClass("au_click");

        window.location.href="/author/authorinfo";
    })

    //点击书查看内容
    $('.look').on('click','img',function(){
        let nid=$(this).parent().parent().children().first().html();
        let nname=$(this).next().html();
        
        $.ajax({
            url: '/author/look',
            type: 'POST',
            dataType: 'JSON',
            data: {nid:nid,nname:nname},
            success: function (result) {
                if(result.r == 'ok'){
                    window.location.href = '/author/look';
                }
            }
        });
    })

    //修改章节
    var form = layui.form;
    form.on('submit(see_section)', function(data){
        $.ajax({
            url: '/author/update_section',
            type: 'POST',
            dataType: 'JSON',
            data: $('#write_section').serialize(),
            success: function (result) {
                if(result.r == 'sname_is_empty'){
                    alert("章节名不能为空！");
                    return ;
                 }
                if(result.r == 'ok'){
                    alert("章节修改成功");
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

    //创建新章节 
    $('.look').on('click','.write_section',function(){
        let nid=$(this).parent().parent().children().first().html();
        let nname=$(this).parent().parent().children().eq(1).children().last().html();
        $.ajax({
            url: '/author/write_section',
            type: 'POST',
            dataType: 'JSON',
            data: {nid:nid,nname:nname},
            success: function (result) {
                if(result.r == 'ok'){
                    window.location.href = '/author/write_section';
                }
            }
        });
    })

    //完结书 
    $('.look').on('click','.overbook',function(){
        let nid=$(this).parent().parent().children().first().html();
        $.ajax({
            url: '/author/overbook',
            type: 'POST',
            dataType: 'JSON',
            data: {nid:nid,serial:1},
            success: function (result) {
                if(result.r == 'ok'){
                    window.location.href = '/author/index';
                }
            }
        });
    })

    //创建新书
    var form = layui.form;
    form.on('submit(write_novel)', function(data){
        $.ajax({
            url: '/author/write_novel',
            type: 'POST',
            dataType: 'JSON',
            data: $('#write_novel').serialize(),
            success: function (result) {
                if(result.r == 'nname_is_empty'){
                    alert("作品名不能为空！");
                    return ;
                 }
                if(result.r == 'ok'){
                    alert("作品创建成功");
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });

      //添加章节
      form.on('submit(write_section)', function(data){
        $.ajax({
            url: '/author/add_section',
            type: 'POST',
            dataType: 'JSON',
            data: $('#write_section').serialize(),
            success: function (result) {
                if(result.r == 'sname_is_empty'){
                    alert("章节名不能为空！");
                    return ;
                 }
                if(result.r == 'ok'){
                    alert("章节添加成功");
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });



    // //上传头像即其他信息
    // let img = document.querySelector('#images');
    // //当你选择文件的时候，value值会发生改变，触发change事件
    // img.onchange = function () {
    //     //获取选中的文件信息：文件内容
    //     console.log(this.files[0]);
    //     let _this = this;
    //     // 使用ajax发送图片到服务器
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('POST', '/author/upload');
    //     //创建一个表单数据对象
    //     let formdata = new FormData(); //创建一个表单数据对象 可以理解为创建一个  <form>  </form>  
    //     formdata.append("images", _this.files[0]); //往表单里面追加input  name="images"  value="文件"
    //     formdata.append("username", "徐小杨");
    //     formdata.append("age", "18");

    //     //不用设置请求头
    //     xhr.send(formdata);
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4 && xhr.status == 200) {
    //             let data = JSON.parse(xhr.responseText);
    //             console.log(data);
    //             document.querySelector('#img').src = data.path;
    //             document.querySelector('#imgval').value = data.path;
    //         }
    //     }
    // }

})