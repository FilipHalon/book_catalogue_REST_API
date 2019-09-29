$(function () {

    function ajax(url, type, data) {
        return $.ajax({
            url: url,
            type: type,
            data: data,
            // contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).fail(
            function (xhr, status, error) {
                console.error(error);
            }
        )
    }

    const books = $("#books").children().first();

    index();

    function index() {
        ajax("http://127.0.0.1:8000/book/").done(function (resp) {
            resp.forEach(function (item) {
                let tr = $("<tr>");
                books.append(tr);
                let td = $("<td>");
                tr.append(td.text(item.title));
                tr.append($("<div>"));
                td.on("click", function () {
                    let $this = $(this);
                    ajax("http://127.0.0.1:8000/book/"+item.id).done(function (resp) {
                        $this.next().text("Autor: " + resp.author + ", ISBN: " + resp.isbn + " , wydawca: " + resp.publisher + " , gatunek: " + resp.genre);
                    });
                    $this.next().fadeIn("slow");
                });
                let button = $("<a href=''><button>Usuń</button></a>");
                tr.append(button);
                button.click(function (event) {
                    // event.preventDefault();
                    ajax("http://127.0.0.1:8000/book/"+item.id, "DELETE");
                    index();
                })
            });
        });
    }


    const newBook = $("#new_book");
    newBook.on("submit", function (event) {
        event.preventDefault();
        ajax("http://127.0.0.1:8000/book/", "POST", newBook.serialize());
        index();
    });
});