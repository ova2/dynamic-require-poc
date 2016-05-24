document.addEventListener("DOMContentLoaded", function (event) {
    var btn = document.getElementById("btn");

    var click = function () {
        var dataOnclick = btn.getAttribute("data-onclick");
        if (dataOnclick) {
            var objDataOnclick = JSON.parse(dataOnclick);
            var module = objDataOnclick[0];
            var func = objDataOnclick[1];

            if (module && func) {
                window[module](function (file) {
                    file[func]();
                });
            }
        }
    };

    btn.addEventListener("click", click);
});
