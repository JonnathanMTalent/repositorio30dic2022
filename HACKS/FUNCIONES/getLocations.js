function getLocations(urlDesc) {
    let loc = [];
    $.ajax({
        url: urlDesc,
        headers: {
            "content-type": "application/json"
        },
        type: 'GET',
        dataType: "json",
        async : false,
        success: function(result) {
            loc = result.jobPostingInfo.additionalLocations;
            loc.push(result.jobPostingInfo.location);
        },
        error: function(error) {
            msg(error);
        }
    });
    return loc;
}