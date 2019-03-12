$(document).ready(function(){
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
    });
