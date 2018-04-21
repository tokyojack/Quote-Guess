var ajaxController = (function () {
    return {
        checkQuestion: function (id, author, successFunction) {
            $.ajax({
                type: "GET",
                url: "/questioncheck/" + id,
                data: { author: author },
                cache: false,
                success: successFunction
            });
        }
    };
})();

var UIController = (function () {

    var DOMstrings = {
        titleInput: '.title-input',
        submitButton: '#submitButton',
        homeButton: '#homeButton',
        authorName: '#authorName'
    };

    return {
        toast: function (text) {
            M.toast({html: text})
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

var controller = (function (ajaxCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        var submitButton = document.querySelector(DOM.submitButton)

        submitButton.addEventListener('click', function (event) {
            var id = window.location.pathname.split("/")[2]
            var author = $(UICtrl.getDOMstrings().authorName).val()
            ajaxController.checkQuestion(id, author, function(data){
                UICtrl.toast(data ? "You won!" : "Wrong author")
                
                if(data){
                    document.querySelector(DOM.homeButton).classList.remove("hidden")
                    submitButton.classList.add("hidden")
                }
            })
        });
    };

    return {
        init: function () {
            setupEventListeners();
        }
    };
})(ajaxController, UIController);

controller.init();
