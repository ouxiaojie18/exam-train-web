
function setAjax(url,type,data,callback) {
    $.ajax({
        url: url,
        type:type,
        data: data,
        dataType: "json",
        xhrFields: { withCredentials: true },
        success: function (result) {
            callback(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status == 200) {
                console.log(ajaxOptions);
            }
            else {
                console.log(xhr.status);
                console.log(thrownError);
            }
        }
    });
}
