// jQuery test
$(document).ready(function() {
    console.log("jQuery is working!");
})
// -----------------------------------------------

// getting product information
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var products = JSON.parse(this.responseText);
        $("#productID_1").html(products[0]["product id"]);
        $("#productID_2").html(products[1]["product id"]);
        $("#productID_3").html(products[2]["product id"]);
        $("#productName_1").html(products[0]["product name"]);
        $("#productName_2").html(products[1]["product name"]);
        $("#productName_3").html(products[2]["product name"]);
        $("#productCategory_1").html(products[0]["product category"]);
        $("#productCategory_2").html(products[1]["product category"]);
        $("#productCategory_3").html(products[2]["product category"]);
        $("#productPrice_1").html(products[0]["product price"]);
        $("#productPrice_2").html(products[1]["product price"]);
        $("#productPrice_3").html(products[2]["product price"]);
    }
}
xhttp.open("GET", "../json/products.json", true);
xhttp.send();
// getting base currency
var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 & this.status == 200) {
        var currency = JSON.parse(this.responseText);
        $(".currency").html(currency["singapore dollar"]["singapore dollar"]["sign"]);
    }
}
xhttp2.open("GET", "../json/currency_converter.json", true);
xhttp2.send();

// updating currency information
$(document).ready(function() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var currency = JSON.parse(this.responseText);
            $("#currency").change(function() {
                if (this.value == "sgd") {
                    console.log("test 1 checked");
                    $(".currency").html(currency["singapore dollar"]["singapore dollar"]["sign"]);
                }
                if (this.value == "usd") {
                    console.log("test 1 checked");
                    $(".currency").html(currency["singapore dollar"]["united states dollar"]["sign"]);
                }
                if (this.value == "indianRupee") {
                    console.log("test 1 checked");
                    $(".currency").html(currency["singapore dollar"]["indian rupee"]["sign"]);
                }
                if (this.value == "yen") {
                    console.log("test 1 checked");
                    $(".currency").html(currency["singapore dollar"]["japanese yen"]["sign"]);
                }
                if (this.value == "peso") {
                    console.log("test 1 checked");
                    $(".currency").html(currency["singapore dollar"]["philipine peso"]["sign"]);
                }
            })
        }
    }
    xhttp.open("GET", "../json/currency_converter.json", true);
    xhttp.send();
})

$(document).ready(function() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var products = JSON.parse(this.responseText);
            // reset price back to singapore dollar each time 
            $("#currency").change(function() {
                if (this.value == "sgd") {
                    console.log("test 2 checked");
                    $("#productPrice_1").html(products[0]["product price"]);
                    $("#productPrice_2").html(products[1]["product price"]);
                    $("#productPrice_3").html(products[2]["product price"]);
                }
                if (this.value == "usd") {
                    console.log("test 2 checked");
                    $("#productPrice_1").html(products[0]["product price"]);
                    $("#productPrice_2").html(products[1]["product price"]);
                    $("#productPrice_3").html(products[2]["product price"]);
                }
                if (this.value == "indianRupee") {
                    console.log("test 2 checked");
                    $("#productPrice_1").html(products[0]["product price"]);
                    $("#productPrice_2").html(products[1]["product price"]);
                    $("#productPrice_3").html(products[2]["product price"]);
                }
                if (this.value == "yen") {
                    console.log("test 2 checked");
                    $("#productPrice_1").html(products[0]["product price"]);
                    $("#productPrice_2").html(products[1]["product price"]);
                    $("#productPrice_3").html(products[2]["product price"]);
                }
                if (this.value == "peso") {
                    console.log("test 2 checked");
                    $("#productPrice_1").html(products[0]["product price"]);
                    $("#productPrice_2").html(products[1]["product price"]);
                    $("#productPrice_3").html(products[2]["product price"]);
                }
                // convert to chosen currency
                xhttp2 = new XMLHttpRequest();
                xhttp2.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var currency = JSON.parse(this.responseText);
                        if ($("#currency").val() == "sgd") {
                            console.log("test 3 checked");
                            $("#productPrice_1").html($("#productPrice_1").html()*currency["singapore dollar"]["singapore dollar"]["rate"]);
                            $("#productPrice_2").html($("#productPrice_2").html()*currency["singapore dollar"]["singapore dollar"]["rate"]);
                            $("#productPrice_3").html($("#productPrice_3").html()*currency["singapore dollar"]["singapore dollar"]["rate"]);
                        }
                        if ($("#currency").val() == "usd") {
                            console.log("test 3 checked");
                            var productPrice = $("#productPrice_1").html();
                            $("#productPrice_1").html(($("#productPrice_1").html()*currency["singapore dollar"]["united states dollar"]["rate"]).toFixed(2));
                            $("#productPrice_2").html(($("#productPrice_2").html()*currency["singapore dollar"]["united states dollar"]["rate"]).toFixed(2));
                            $("#productPrice_3").html(($("#productPrice_3").html()*currency["singapore dollar"]["united states dollar"]["rate"]).toFixed(2));
                        }
                        if ($("#currency").val() == "indianRupee") {
                            console.log("test 3 checked");
                            var productPrice = $("#productPrice_1").html();
                            $("#productPrice_1").html(($("#productPrice_1").html()*currency["singapore dollar"]["indian rupee"]["rate"]).toFixed(2));
                            $("#productPrice_2").html(($("#productPrice_2").html()*currency["singapore dollar"]["indian rupee"]["rate"]).toFixed(2));
                            $("#productPrice_3").html(($("#productPrice_3").html()*currency["singapore dollar"]["indian rupee"]["rate"]).toFixed(2));
                        }
                        if ($("#currency").val() == "yen") {
                            console.log("test 3 checked");
                            var productPrice = $("#productPrice_1").html();
                            $("#productPrice_1").html(($("#productPrice_1").html()*currency["singapore dollar"]["japanese yen"]["rate"]).toFixed(2));
                            $("#productPrice_2").html(($("#productPrice_2").html()*currency["singapore dollar"]["japanese yen"]["rate"]).toFixed(2));
                            $("#productPrice_3").html(($("#productPrice_3").html()*currency["singapore dollar"]["japanese yen"]["rate"]).toFixed(2));
                        }
                        if ($("#currency").val() == "peso") {
                            console.log("test 3 checked");
                            var productPrice = $("#productPrice_1").html();
                            $("#productPrice_1").html(($("#productPrice_1").html()*currency["singapore dollar"]["philipine peso"]["rate"]).toFixed(2));
                            $("#productPrice_2").html(($("#productPrice_2").html()*currency["singapore dollar"]["philipine peso"]["rate"]).toFixed(2));
                            $("#productPrice_3").html(($("#productPrice_3").html()*currency["singapore dollar"]["philipine peso"]["rate"]).toFixed(2));
                        }
                    }
                }
                xhttp2.open("GET", "../json/currency_converter.json", true);
                xhttp2.send();
            })
        }
    }
    xhttp.open("GET", "../json/products.json", true);
    xhttp.send();
})
