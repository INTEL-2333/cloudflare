document.getElementById("TimeShow").innerHTML = " 页面加载耗时" + (new Date().getTime() - t1) + "毫秒";
$(function() {

/*
    $.getJSON("count.php", function(data) {
        $("#outputdomain").empty();
        $.each(data, function(infoIndex, info) {})
        $("#outputdomain").html(strHtml);
    })
*/
    $.ajax({
        type: "get",
        dataType: "json",
        url: "../php/ip.php",
        success: function(result) {
            var ipData = "";
            ipData += result.status + "回源节点：" + result.cdnip;
            $("#jsonTip").append(ipData);
            
            /*
            var cdnip = result.cdnip;
            $.ajax({
                type: "get",
                dataType: "json",
                url: "https://ip.xx.com/ip-query-qqwry.php?ip=" + cdnip,
                success: function(result) {
                    var ipData = "";
                    ipData += "(" + result.country + result.city + result.area + ")";
                    $("#jsonTip").append(ipData);
                }
            });
            */
            
        }
    });
    $.get("/cdn-cgi/trace", function(data) {
        var sip = data.match(/(ip=?)(\S*)/)[2];
        var str = data.match(/(colo=?)(\S*)/)[2];
        var every = [['HKG', '香港'], ['TPE', '台北'], ['MFM', '澳门'], ['NRT', '东京'], ['KIX', '大阪'], ['ICN', '仁川'], ['BKK', '曼谷'], ['LHR', '伦敦'], ['SIN', '新加坡'], ['CDG', '巴黎'], ['FRA', '法兰克福'], ['KUL', '马来西亚'], ['LAX', '洛杉矶'], ['SJC', '圣何塞'], ['KBP', '乌克兰'], ['PRG', '布拉格']];
        for (var i = 0; i < every.length; i++) {
            if (str == every[i][0]) {
                $("#result").append("当前CDN节点:[" + str + "]" + every[i][1] + ",您的IP:" + sip);
            }
        }
        /*
        $.ajax({
            type: "get",
            dataType: "json",
            url: "https://ip.xx.com/ip-query-qqwry.php?ip=" + sip,
            success: function(result) {
                var ipData = "";
                ipData += "(" + result.country + result.city + result.area + ")";
                $("#result").append(ipData);
            }
        });
        */
        
    });
})