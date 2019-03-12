$(document).ready(function(){
        $.ajax({
            method: 'get',
            url: '/social',
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
                $('#response').html(data[1].id);
            }

        })
    });
