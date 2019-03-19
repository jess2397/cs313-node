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
            $.each(data, function(index,item) {
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
    var displayName = $("#displayName").val();
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
                '<article> <h2>' + displayName + '</h2> <p>' + data[0].content + '</p><div class="date">'+ data[0].date + ' </div>';

            $('#response').prepend(content);
            $("#newPost").val("");
        }
    });
}

function setLoginDialog()
{
    $("#login").click(function(){
        $(".loginDialog").toggle();
    });
}
