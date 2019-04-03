$(document).ready(function(){
        setPosts();
        setLoginDialog();
    });

function setPosts(){
    $.ajax({
        method: 'get',
        url: '/social',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            var content;
            $.each(data.posts, function(index,item) {
                content =
                    '<article> <h2>' + item.display_name + '</h2> <p>' + item.content + '</p><div class="date">'+ item.date + ' </div>';

                $('#response').append(content);

            });
        }

    })
}

function createPost(){
    var content = $("#newPost").val();
    var userId = $("#userId").val();
    var date = new Date();
    var displayName = $("#userDisplayName").html();
    var data = {
        content: content,
        userId: userId,
        date: date
    };
    $.post("/createPost",{
        content: content,
        userId: userId,
        date: date
    },function(data, status){
        console.log(data);
        console.log(status);
        if(status == "success"){
            var content =
                '<article> <h2>' + displayName + '</h2> <p>' + data.post[0].content + '</p><div class="date">'+ data.post[0].date + ' </div>';

            $('#response').prepend(content);
            $("#newPost").val("");
        }
    });
}

function createUser(event){

    var username = $("#createUsername").val();
    var password = $("#createPassword").val();
    var displayName = $("#createDisplay").val();

    $.post("/createUser",{
        username: username,
        password: password,
        displayName: displayName
    },function(data, status){
        if(status == "success"){
            $(".createUser").toggle();
            $(".login").toggle();
        }
    });
}

function login(event){
    var username = $("#loginUsername").val();
    var password = $("#loginPassword").val();

    $.post("/login",{
        username: username,
        password: password
    },function(data, status){
        if(status == "success"){
            console.log(data);
            var user = data.user[0];
           console.log(user); $("#userDisplayName").html(user.display_name);
            $("#userId").val(user.id);
            $(".displayName").html(user.display_name);

            $("#displayEdit").val(user.display_name);
            $("#descEdit").val(user.description);
            $("#imgEdit").val(user.pic_file);
            
            $("#profileImg").attr("src", user.pic_file);
            $(".desc").html(user.description);


            $(".createPost").toggle();
            $(".login").toggle();
            $(".profile").toggle();
            $("#logout").toggle();
            $("#login").toggle();
            $("#userDisplayName").toggle();

        }
        else{

        }
    });
}

function logout(){
console.log("got here");
    $.post("/logout",{
    },function(data, status){
        if(status == "success"){
            $(".createPost").toggle();
            $(".profile").toggle();
            $("#logout").toggle();
            $("#login").toggle();
            $("#userDisplayName").toggle();
        }
    });
}

function updateUser(){
    var displayName = $("#displayEdit").val();
    var desc = $("#descEdit").val();
    var image = $("#imgEdit").val();
    var userId = $("#userId").val();

    $.post("/updateUser",{
        displayName: displayName,
        desc: desc,
        img: image,
        userId: userId
    },function(data, status){
        if(status == "success"){
            
         $("#profileImg").attr("src", image);
            $(".desc").html(desc);
            
            $(".profile").toggle();
        $(".profileEdit").toggle();
        }
    });
}


function setLoginDialog()
{
    $("#login").click(function(){
        $(".login").toggle();
    });
    $("#logout").click(function(){
        logout();
    });
    $("#createUser").click(function(){

        $(".login").toggle();
        $(".createUser").toggle();
    });
    
    $("#profileEdit").click(function(){

        $(".profile").toggle();
        $(".profileEdit").toggle();
    });
    $("#profileSave").click(function(){

        updateUser();
    });
}
